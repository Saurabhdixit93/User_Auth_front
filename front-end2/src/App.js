import HomePage from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenCookie } from "./Context/CookieGet";
import SignupPage from "./components/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/Login/Login";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.defaults.withCredentials = true;
function App() {
  // const user = localStorage.getItem("token");
  const user = getTokenCookie();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route
              index
              path="/"
              element={user ? <HomePage /> : <LoginPage />}
            />
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <HomePage />}
            />
            <Route
              path="/register"
              element={!user ? <SignupPage /> : <HomePage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
