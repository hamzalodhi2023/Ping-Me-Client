import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = isLogin ? validateLogin() : validateRegister();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Simulate API call
    console.log(isLogin ? "Logging in..." : "Registering...", formData);
    alert(
      isLogin
        ? `Login attempt with ${formData.email}`
        : `Registered successfully as ${formData.name}`,
    );
    // Reset form after demo
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header with toggle */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-center font-semibold transition duration-200 ${
                isLogin
                  ? "text-white border-b-2 border-blue-500 bg-gray-800/50"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-center font-semibold transition duration-200 ${
                !isLogin
                  ? "text-white border-b-2 border-blue-500 bg-gray-800/50"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Name field - only for register */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "focus:ring-red-500 border-red-500"
                          : "focus:ring-blue-500"
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500"
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password field */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm password - only for register */}
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? "focus:ring-red-500 border-red-500"
                          : "focus:ring-blue-500"
                      }`}
                      placeholder="Confirm password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Forgot password link (only login) */}
              {isLogin && (
                <div className="text-right mb-4">
                  <a
                    href="#"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <FaArrowRight size={14} />
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-600"></div>
                <span className="px-3 text-gray-400 text-sm">OR</span>
                <div className="flex-1 border-t border-gray-600"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-200 flex items-center justify-center gap-3"
                >
                  <FaGoogle />
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-200 flex items-center justify-center gap-3"
                >
                  <FaGithub />
                  {isLogin ? "Sign in with GitHub" : "Sign up with GitHub"}
                </button>
              </div>
            </form>

            {/* Toggle link for mobile (alternative to header tabs) */}
            <p className="text-center text-gray-400 text-sm mt-6 md:hidden">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
