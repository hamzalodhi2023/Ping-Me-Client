import ChatLayout from "../components/ChatLayout";
import ChatSidebar from "../components/ChatSidebar";
import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();
  return (
    <div className="w-full h-dvh bg-[#101828] flex">
      {/* 🟢 Sidebar */}
      <div
        className={`
          ${id ? "hidden md:flex" : "block md:flex"} 
          bg-[#1e2939] w-full md:w-[40%] lg:w-[30%] xl:w-[20%] h-dvh flex-col relative md:border-r-2 border-gray-500
        `}
      >
        <ChatSidebar />
      </div>

      {/* 🔵 Chat */}
      <div
        className={`
          ${id ? "flex" : "hidden md:flex"}
          relative h-dvh bg-[#1e2939] w-full lg:w-[70%] xl:w-[80%] flex-col text-white
        `}
      >
        {id ? (
          <ChatLayout />
        ) : (
          <div className="hidden md:flex items-center justify-center h-dvh w-full text-white">
            Select a chat 👀
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
