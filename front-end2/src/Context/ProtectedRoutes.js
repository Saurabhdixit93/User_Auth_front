import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          token ? <Component {...props} /> : navigate("/login")
        }
      />
    </Routes>
  );
};

export default ProtectedRoute;
