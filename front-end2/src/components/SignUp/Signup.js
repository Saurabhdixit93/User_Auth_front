import React, { useState } from "react";
import {
  FaUser,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelopeOpenText,
} from "react-icons/fa";
import axios from "axios";
import {
  showNotificationForRegisterError,
  showNotificationForRegisterSuccess,
} from "../../Notification/Notify";
// const SignupUrl = process.env.REACT_APP_SIGNUP_API;
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const HandleRegister = async (e) => {
    e.preventDefault();
    await axios
      .post("/user/signup", formData)
      .then((result) => {
        if (result.data.status === true) {
          showNotificationForRegisterSuccess(result.data.message);
        } else {
          showNotificationForRegisterError(result.data.message);
        }
      })
      .catch((error) => {
        console.log("Error", error);
        showNotificationForRegisterError(error.message);
      });
  };
  return (
    <>
      <div id="SignUp-Page">
        <div className="signup-form">
          <h2>Create an Account</h2>
          <form onSubmit={HandleRegister}>
            <div className="form-group">
              <label htmlFor="username">
                <FaUser /> Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="userEmail">
                <FaEnvelopeOpenText /> Email
              </label>
              <input
                type="text"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <div className="password-input">
                <input
                  type={"password"}
                  id="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <FaLock /> Re-Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className={`password-toggle ${showPassword ? "show" : ""}`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
