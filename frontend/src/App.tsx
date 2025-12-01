// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      {/* Thanh điều hướng đơn giản */}
      <nav className="bg-gray-800 p-4 text-white flex gap-4 justify-center">
        <Link to="/" className="hover:text-blue-300">
          Home
        </Link>
        <Link to="/login" className="hover:text-blue-300">
          Login
        </Link>
        <Link to="/register" className="hover:text-blue-300">
          Register
        </Link>
      </nav>
      {/* Khu vực hiển thị nội dung thay đổi theo URL */}
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
