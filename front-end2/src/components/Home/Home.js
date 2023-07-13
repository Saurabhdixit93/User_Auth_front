import React from "react";
import { useNavigate } from "react-router-dom";
import { getTokenCookie } from "../../Context/CookieGet";
import {
  showNotificationForLoginError,
  showNotificationForLogoutSuccess,
} from "../../Notification/Notify";
import Cookies from "js-cookie";
const HomePage = () => {
  // const user = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = getTokenCookie();
  let userName = ""; // Initialize with an empty string
  let userEmail = "";

  if (user) {
    const tokenPayload = JSON.parse(atob(user.split(".")[1]));
    userName = tokenPayload.userName; // Assign the value to userName
    userEmail = tokenPayload.userEmail;
    console.log(userName, "usernamne");
  }

  const handleLogout = async (e) => {
    try {
      if (user) {
        Cookies.remove("token");
        showNotificationForLogoutSuccess("Logout Successfull");
        navigate("/");
        window.location.reload();
        return;
      }
    } catch (error) {
      showNotificationForLoginError(error.message);
      return;
    }
  };
  return (
    <>
      <div className="home-page">
        <h1>Welcome to the Homepage</h1>
        {user && (
          <div className="user-details">
            <p className="welcome-message">Welcome {userName},</p>
            <p className="email">Email: {userEmail}</p>
            <button className="button logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
