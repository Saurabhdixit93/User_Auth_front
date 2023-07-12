const bcryptjs = require("bcryptjs");
const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRETE_KEY;

module.exports.CreteAccount = async (req, res) => {
  const { userName, userEmail, userPassword, confirmPassword } = req.body;
  // Regular expression for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!emailRegex.test(userEmail)) {
    return res.send({
      status: false,
      message: "Enter Valid Email Please.",
    });
  }
  if (!usernameRegex.test(userName)) {
    return res.send({
      status: false,
      message: "Enter Valid UserName Please.",
    });
  }
  if (!passwordRegex.test(userPassword)) {
    return res.send({
      status: false,
      message: "Enter Valid Password with special charector and min 6 digit",
    });
  }
  if (userPassword !== confirmPassword) {
    return res.send({
      status: false,
      message: "Password And Confirm Password Did not match",
    });
  }
  const email = userEmail.toLowerCase();
  try {
    var user = await UserModel.findOne({ userEmail: email });
    if (user) {
      return res.send({
        status: false,
        message: "User Already exists with this email",
      });
    }
    const hashedPassword = await bcryptjs.hash(userPassword, 15);
    user = await new UserModel({
      userEmail: email,
      userPassword: hashedPassword,
      userName: userName,
    });
    await user.save();
    return res.send({
      status: true,
      message: "Account Created Successfully",
    });
  } catch (error) {
    return res.send({ status: false, messaage: "Internal Server Error" });
  }
};

module.exports.UserLoginJWT = async (req, res) => {
  // Extract email and password from request body
  const { userEmail, userPassword } = req.body;
  // Convert email to lowercase for case-insensitive comparison
  const validEmail = userEmail.toLowerCase();

  try {
    // Check if the user exists
    const userExists = await UserModel.findOne({ userEmail: validEmail });
    if (!userExists) {
      return res.send({
        status: false,
        message:
          "User Email Not Found or User Does Not Exist,Please Create New Account",
      });
    }
    // Verify the password
    const passwordMatch = await bcryptjs.compare(
      userPassword,
      userExists.userPassword
    );
    if (!passwordMatch) {
      return res.send({
        status: false,
        message: "Incorrect Password Try Again !",
      });
    }

    // Create a token for authentication with expires Time
    const token = jwt.sign({ id: userExists._id }, secretKey, {
      expiresIn: "1d",
    });
    return res.send({
      status: true,
      message: "Login Successful",
      token
    });
  } catch (error) {
    // Return a 500 status (Internal Server Error) if an error occurs
    return res.send({
      status: false,
      message: `Error In Login User Account: ${error.message}`,
    });
  }
};

module.exports.UserLogout = async (req, res) => {};
