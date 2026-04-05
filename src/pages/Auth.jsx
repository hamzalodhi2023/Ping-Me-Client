import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "../validation/auth-validation";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-[#101828] w-full h-screen flex items-center justify-center text-white">
      <div className="form-div bg-gray-800 rounded-2xl shadow-xl w-md">
        {/* Toggle */}
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

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
          {/* Name only in register */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...formRegister("name")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...formRegister("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                {...formRegister("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2"
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
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password only in register */}
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...formRegister("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-gray-700 text-white rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            {isLogin ? "Sign In" : "Create Account"}
            <FaArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
