import { useState, useRef, useEffect } from "react";
import {
  FaArrowLeft,
  FaKey,
  FaClock,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../validation/otp-validation";

function Otp() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const otp = Object.values(data).join(""); // merge all digits
    console.log("OTP entered:", otp);
  };

  const handleResendCode = () => {};
  return (
    <div className="bg-[#101828] w-full h-screen flex items-center justify-center">
      <div className="max-w-md bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
        {/* Icon and Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
            <FaKey className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Verification Code
          </h2>
          <p className="text-gray-400 text-sm">
            We've sent a 6-digit code to{" "}
            <span className="text-blue-400">example@mail.com</span>
          </p>
        </div>

        {/* OTP Input Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                {...register(`otp${i + 1}`)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="h-14 w-14 rounded-xl border border-slate-600 bg-slate-900 text-center text-xl font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                placeholder="•"
                onInput={(e) => {
                  const next = e.target.nextSibling;
                  if (e.target.value && next) next.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    if (!e.target.value) {
                      const prev = e.target.previousSibling;
                      if (prev) {
                        prev.focus();
                        prev.value = ""; // clear previous input
                      }
                    } else {
                      e.target.value = ""; // clear current input
                    }
                  }
                }}
              />
            ))}
          </div>

          <div className="min-h-5 w-full">
            {Object.keys(errors).length > 0 && (
              <p className="text-center text-sm text-red-400">
                All OTP fields must be numbers
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full rounded-xl py-3 font-semibold text-white transition ${
              isValid
                ? "bg-blue-500 shadow-lg shadow-blue-500/20 hover:bg-blue-600"
                : "cursor-not-allowed bg-gray-700 text-gray-300"
            }`}
          >
            Verify OTP
          </button>
        </form>
        {/* Resend Section */}
        <div className="mt-6 text-center">
          {canResend ? (
            <button
              onClick={handleResendCode}
              className="text-blue-400 hover:text-blue-300 transition flex items-center justify-center gap-2 mx-auto"
            >
              <FaSyncAlt size={14} />
              Resend Code
            </button>
          ) : (
            <div className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <FaClock size={14} />
              Resend code in {timeLeft}s
            </div>
          )}
        </div>
        <p className="text-gray-500 text-xs text-center mt-6">
          Didn't receive the code? Check your spam folder or contact support.
        </p>
      </div>
    </div>
  );
}

export default Otp;
