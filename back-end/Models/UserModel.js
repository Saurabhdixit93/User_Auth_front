const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    userEmail: {
      type: String,
      require: true,
      unique: true,
    },
    userPassword: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("UserModel", UserSchema);
