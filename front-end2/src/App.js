import HomePage from "./components/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupPage from "./components/SignUp/Signup";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./components/Login/Login";
import ProtectedRoute from "./Context/ProtectedRoutes";
function App() {
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
            <Route path="/login" element={<Login />} />
            <Route index path="/" element={<HomePage />} />
            <Route path="/register" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
