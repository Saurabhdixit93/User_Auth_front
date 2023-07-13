import axios from "axios";
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaEnvelopeOpenText } from "react-icons/fa";
import Cookies from "js-cookie";
import {
  showNotificationForLoginError,
  showNotificationForLoginSuccess,
} from "../../Notification/Notify";
import { useNavigate } from "react-router-dom";
// const LoginUrl = process.env.REACT_APP_LOGIN_API;

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
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

  axios.defaults.withCredentials = true;
  const HandleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post("/user/api/login", formData)
      .then((result) => {
        if (result.data.status === true) {
          showNotificationForLoginSuccess(result.data.message);
          const token = result.data.token;
          Cookies.set("token", token, { expires: 7 }); // set token as a cookie
          // localStorage.setItem("token", result.data.token);
          navigate("/");
          window.location.reload();
          return;
        } else {
          showNotificationForLoginError(result.data.message);
          return;
        }
      })
      .catch((error) => {
        console.log("error in login", error);
        showNotificationForLoginError(error.message);
        return;
      });
  };

  return (
    <>
      <div id="SignUp-Page">
        <div className="signup-form">
          <h2>Login to your Account</h2>
          <form onSubmit={HandleLogin}>
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
              <label htmlFor="userPassword">
                <FaLock /> Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="userPassword"
                  name="userPassword"
                  value={formData.userPassword}
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
