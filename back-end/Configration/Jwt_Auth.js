const secretKey = process.env.SECRETE_KEY;
const jwt = require("jsonwebtoken");

// verify JWT TOKEN function
module.exports.VERIFYJWT = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.send({
        status: false,
        message: "Please Add Authorization Token",
      });
    }
    // Extract token from Authorization header and verify it
    const token = req.headers.authorization.split(" ")[1];
    const paylod = await jwt.verify(token, secretKey);

    // Attach token payload to request object for further use
    req.paylod = paylod;
    // Call next middleware function in chain
    next();
  } catch (err) {
    console.log(err, "error jwt");
    // Handle different types of errors that may occur during verification
    if (err.name === "TokenExpiredError") {
      return res.send({
        status: false,
        message: "Sorrry Token Has Expired",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.send({
        status: false,
        message: "Authorization token is Required",
      });
    }
    return res.send({
      status: false,
      message: "Errror In JWT TOKEN VERIFICATION",
    });
  }
};
