import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newChatSchema } from "../validation/NewChatInput-validation";
function NewChatInput({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(newChatSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <form
        className="bg-[#1e2939] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Enter email address..."
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 transition mb-1"
        />
        {errors.email && (
          <p className="text-rose-400 text-xs mb-3">{errors.email.message}</p>
        )}
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
          className={`w-full text-sm font-medium py-2.5 rounded-lg transition mt-2 ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default NewChatInput;
