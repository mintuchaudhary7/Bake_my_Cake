import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Login_Image from "../assets/login_image.jpg";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage
      console.log(response);
      toast.success("Login successful! 🎉"); // Show success toast
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400">
      <ToastContainer position="top-center" autoClose={3000} /> {/* Toast Container */}
      <div className="flex w-4/5 max-w-4xl bg-white shadow-lg shadow-blue-300 rounded-lg">
        {/* Left Section - Image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src={Login_Image}
            loading="lazy" // Lazy loading the image
            alt="Login"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full md:w-1/2 flex-col p-6">
          <h1 className="mb-6 text-3xl font-bold text-gray-700">
            Welcome Back!
          </h1>
          <p className="mb-4 text-gray-500">
            Please login to your account to continue.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input with Eye Icon */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Eye Icon Button */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <LuEyeOff className="h-5 w-5" /> // Eye-Off Icon
                ) : (
                  <LuEye className="h-5 w-5" /> // Eye Icon
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-blue-500 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
