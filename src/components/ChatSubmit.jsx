import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

function ChatSubmit() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const message = watch("message");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (data) => {
    const trimmedMessage = data.message?.trim();
    if (!trimmedMessage) return;
    reset();
    setShowEmojiPicker(false);
  };

  const handleEmojiSelect = (emojiData) => {
    setValue("message", `${message || ""}${emojiData.emoji}`, {
      shouldDirty: true,
    });
  };

  return (
    <div className="absolute bottom-0 left-0 w-full bg-[#364153] px-3 py-3 sm:px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full items-end gap-2 rounded-2xl bg-[#1e2939] px-2 py-2 shadow-lg sm:gap-3 sm:px-3"
      >
        <div ref={pickerRef} className="relative">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-white/5 hover:text-white sm:h-10 sm:w-10"
            aria-label="Open emoji picker"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <FaSmile size={18} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-20 w-[min(320px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:bottom-14 sm:w-87.5">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                width="100%"
                height={350}
                theme="dark"
                autoFocusSearch={false}
                emojiStyle="apple"
                lazyLoadEmojis={true}
                showPreview={false}
                previewConfig={{ showPreview: false }}
                skinTonePickerLocation="preview"
              />
            </div>
          )}
        </div>

        <textarea
          {...register("message")}
          rows={1}
          placeholder="Type a message..."
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
        />

        <button
          type="submit"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 sm:h-10 sm:w-10"
          aria-label="Send message"
        >
          <FaPaperPlane size={16} />
        </button>
      </form>
    </div>
  );
}

export default ChatSubmit;
