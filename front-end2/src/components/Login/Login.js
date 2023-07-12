import axios from "axios";
import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaEnvelopeOpenText } from "react-icons/fa";
import {
  showNotificationForRegisterError,
  showNotificationForRegisterSuccess,
} from "../../Notification/Notify";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
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
  const HandleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://5000-myproject9305-myproject-4b55vxxrgvx.ws-us101.gitpod.io/user/api/login",
        formData
      )
      .then((result) => {
        if (result.data.status === true) {
          showNotificationForRegisterSuccess(result.data.message);
          const { token } = result.data;
          Cookies.set("token", token, { expires: 7 });
          setToken(token);
          return navigate("/");
        } else {
          showNotificationForRegisterError(result.data.message);
          return navigate("/login");
        }
      })
      .catch((error) => {
        console.log("error in login", error);
        showNotificationForRegisterError(error.message);
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
