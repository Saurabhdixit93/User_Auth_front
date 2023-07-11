import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

  return (
    <>
      <div id="SignUp-Page">
        <div className="signup-form">
          <h2>Create an Account</h2>
          <form>
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
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className={`password-toggle ${showPassword ? "show" : ""}`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
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
