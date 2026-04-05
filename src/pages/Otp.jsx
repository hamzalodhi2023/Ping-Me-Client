import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaClock,
  FaKey,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { otpSchema } from "../validation/otp-validation";

function Otp() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const otpFields = Array.from({ length: 6 }, (_, index) => `otp${index + 1}`);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  const otpValues = useWatch({
    control,
    name: otpFields,
  });

  useEffect(() => {
    if (canResend) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setCanResend(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [canResend]);

  const onSubmit = (data) => {
    const otp = Object.values(data).join("");
    console.log("OTP entered:", otp);
  };

  const handleResendCode = () => {
    setCanResend(false);
    setTimeLeft(30);
  };
  const inputClassName =
    "h-14 w-12 rounded-2xl border border-white/12 bg-white/8 text-center text-xl font-semibold text-white shadow-inner shadow-black/10 outline-none backdrop-blur-md transition duration-200 placeholder:text-slate-500 focus:-translate-y-0.5 focus:border-sky-400/80 focus:bg-white/14 focus:ring-4 focus:ring-sky-400/15 sm:h-16 sm:w-14";

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07111f] px-4 py-8 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-5%] h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-10%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_52%)]" />
      </div>

      <div className="relative w-full max-w-lg overflow-hidden rounded-4xl border border-white/15 bg-white/10 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <div className="border-b border-white/10 bg-linear-to-br from-sky-400/22 via-blue-500/10 to-white/5 px-6 pb-6 pt-8 md:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/12 hover:text-white"
          >
            <FaArrowLeft size={12} />
            Back
          </button>

          <div className="mt-6 text-center">
            <div className="mx-auto mb-4 flex h-18 w-18 items-center justify-center rounded-3xl border border-white/15 bg-white/10 shadow-lg shadow-sky-950/30">
              <FaKey className="text-3xl text-sky-300" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-blue-100/80">
              Secure Access
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Verify your code
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-200/80">
              We sent a 6-digit verification code to{" "}
              <span className="font-medium text-sky-300">example@mail.com</span>
              . Enter it below to continue.
            </p>
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <div className="grid gap-3 rounded-3xl border border-white/10 bg-black/10 p-4 text-sm text-slate-200/80 backdrop-blur-md sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
              <FaShieldAlt className="text-sky-300" />
              <span>One-time code expires in 30 seconds</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
              <FaClock className="text-cyan-300" />
              <span>Use the latest code sent to your email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {otpFields.map((fieldName, index) => {
                const fieldRegistration = register(fieldName);

                return (
                  <input
                    key={fieldName}
                    {...fieldRegistration}
                    ref={(element) => {
                      fieldRegistration.ref(element);
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpValues?.[index] || ""}
                    className={inputClassName}
                    placeholder="•"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(-1);
                      setValue(fieldName, value, { shouldValidate: true });

                      if (value && index < otpFields.length - 1) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        if (otpValues?.[index]) {
                          setValue(fieldName, "", { shouldValidate: true });
                          return;
                        }

                        if (index > 0) {
                          const previousField = otpFields[index - 1];
                          setValue(previousField, "", { shouldValidate: true });
                          inputRefs.current[index - 1]?.focus();
                        }
                      }

                      if (e.key === "ArrowLeft" && index > 0) {
                        inputRefs.current[index - 1]?.focus();
                      }

                      if (
                        e.key === "ArrowRight" &&
                        index < otpFields.length - 1
                      ) {
                        inputRefs.current[index + 1]?.focus();
                      }
                    }}
                  />
                );
              })}
            </div>

            <div className="min-h-5 w-full">
              {Object.keys(errors).length > 0 && (
                <p className="text-center text-sm text-rose-300">
                  All OTP fields must contain a single number.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold shadow-lg shadow-sky-950/30 transition duration-200 ${
                isValid
                  ? "bg-linear-to-r from-sky-500 via-blue-500 to-cyan-400 text-white hover:scale-[1.01] hover:from-sky-400 hover:to-cyan-300"
                  : "cursor-not-allowed bg-gray-600 text-gray-300"
              }`}
            >
              Confirm & Continue
            </button>
          </form>

          <div className="rounded-3xl border border-white/10 bg-black/10 px-5 py-4 text-center backdrop-blur-md">
            {canResend ? (
              <button
                onClick={handleResendCode}
                className="mx-auto flex items-center justify-center gap-2 text-sm font-medium text-sky-300 transition hover:text-sky-200"
              >
                <FaSyncAlt size={14} />
                Resend code
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                <FaClock size={14} />
                Resend code in {timeLeft}s
              </div>
            )}

            <p className="mt-3 text-xs leading-5 text-slate-400">
              Didn&apos;t receive the code? Check spam or wait for the resend
              timer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;
