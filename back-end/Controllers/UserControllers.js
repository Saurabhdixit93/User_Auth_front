const bcryptjs = require("bcryptjs");
const UserModel = require("../Models/UserModel");

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
      messaage: "Enter Valid Email Please.",
    });
  }
  if (!usernameRegex.test(userName)) {
    return res.send({
      status: false,
      messaage: "Enter Valid UserName Please.",
    });
  }
  if (!passwordRegex.test(userPassword)) {
    return res.send({
      status: false,
      messaage: "Enter Valid Password with special charector and min 6 digit",
    });
  }
  if (userPassword !== confirmPassword) {
    return res.send({
      status: false,
      messaage: "Password And Confirm Password Did not match",
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
      user: user,
    });
  } catch (error) {
    return res.send({ status: false, messaage: "Internal Server Error" });
  }
};
