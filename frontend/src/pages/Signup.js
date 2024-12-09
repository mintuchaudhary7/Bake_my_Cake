import React, { useState } from "react";
import axios from "axios";
import signup_image from "../assets/signup_image.jpg";
import { ToastContainer, toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Password and confirm Password should same");
    } else {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          name,
          email,
          password,
        });

        const token = response.data.token;
        localStorage.setItem("token", token); // Store token in localStorage
        console.log(response);
        toast.success("Login successful! 🎉"); // Show success toast
        setEmail("");
        setPassword("");
        setName("");
        setConfirmPassword("");
        
      } catch (error) {
        console.error(error);
        toast.error("Login failed. Please check your credentials."); // Show error toast
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400">
      <ToastContainer position="top-center" autoClose={3000} />{" "}
      {/* Toast Container */}
      <div className="flex w-4/5 max-w-4xl my-4 bg-white shadow-lg shadow-blue-300 rounded-lg">
        {/* Left Section - Image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src={signup_image}
            loading="lazy"
            alt="Signup"
            className="h-full w-full rounded-l-lg object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex w-full md:w-1/2 flex-col p-6">
          <h1 className="mb-3 text-3xl font-bold text-gray-700">
            Create Account
          </h1>
          <p className="mb-4 text-gray-500">Create your account to continue.</p>

          <form onSubmit={handleFormSubmit} className="space-y-2">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <LuEyeOff className="h-5 w-5" />
                ) : (
                  <LuEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <LuEyeOff className="h-5 w-5" />
                ) : (
                  <LuEye className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded bg-blue-500 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-500 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
