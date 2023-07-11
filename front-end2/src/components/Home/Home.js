import React from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const user = {
    // Example user details, replace with actual user data
    username: "JohnDoe",
    email: "johndoe@example.com",
  };

  return (
    <>
      <div className="home-page">
        <h1>Welcome to the Homepage</h1>

        {!user ? (
          <div className="buttons-container">
            <Link to="/signup" className="button signup-button">
              Signup
            </Link>
            <Link to="/login" className="button login-button">
              Login
            </Link>
          </div>
        ) : (
          <div className="user-details">
            <p className="welcome-message">Welcome, {user.username}!</p>
            <p className="email">Email: {user.email}</p>
            <Link to="/logout" className="button logout-button">
              Logout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
