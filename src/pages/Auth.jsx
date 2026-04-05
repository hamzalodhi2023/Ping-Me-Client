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
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const inputClassName =
    "w-full rounded-2xl border border-white/10 bg-white/8 py-3 pl-11 pr-4 text-sm text-white shadow-inner shadow-black/10 outline-none backdrop-blur-md transition duration-200 placeholder:text-slate-400 focus:border-sky-400/70 focus:bg-white/12 focus:ring-4 focus:ring-sky-400/10";

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07111f] px-4 py-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-5%] h-56 w-56 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%)]" />
      </div>

      <div className="form-div relative w-full max-w-md overflow-hidden rounded-4xl border border-white/15 bg-white/10 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <div className="border-b border-white/10 bg-linear-to-br from-sky-400/22 via-blue-500/10 to-white/5 px-6 pb-6 pt-8 md:px-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20  p-3 shadow-lg shadow-sky-950/30">
            <img
              src="/logo.png"
              alt="Tk Chat logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-blue-100/80">
              PING ME
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-200/80">
              {isLogin
                ? "Sign in to continue your conversations with a cleaner, modern workspace."
                : "Join the platform and start chatting with a fresh new experience."}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="mx-6 mt-6 flex rounded-2xl border border-white/10 bg-black/10 p-1 backdrop-blur-md md:mx-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition duration-200 ${
              isLogin
                ? "bg-white/16 text-white shadow-lg shadow-sky-950/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition duration-200 ${
              !isLogin
                ? "bg-white/16 text-white shadow-lg shadow-sky-950/20"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 p-6 md:p-8"
        >
          {/* Name only in register */}
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...formRegister("name")}
                  type="text"
                  placeholder="John Doe"
                  className={inputClassName}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-rose-300">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                {...formRegister("email")}
                type="email"
                placeholder="you@example.com"
                className={inputClassName}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-rose-300">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                {...formRegister("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={inputClassName}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-rose-300">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password only in register */}
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  {...formRegister("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={inputClassName}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-rose-300">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold shadow-lg shadow-sky-950/30 transition duration-200 
                  ${
                    isValid
                      ? "bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400 hover:scale-[1.01] text-white hover:from-sky-400 hover:via-blue-500 hover:to-cyan-300"
                      : "bg-gray-600 cursor-not-allowed text-gray-300"
                  }`}
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
