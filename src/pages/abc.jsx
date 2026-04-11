import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatSide from "../components/ChatSide";

function Chat() {
  const { id } = useParams();

  return (
    <div className="w-full h-dvh bg-[#101828] flex">
      {/* 🟢 Sidebar */}
      <div
        className={`
          ${id ? "hidden md:flex" : "flex"} 
          w-full md:w-[40%] lg:w-[30%] xl:w-[20%]
        `}
      >
        <Sidebar />
      </div>

      {/* 🔵 Chat */}
      <div
        className={`
          ${id ? "flex" : "hidden md:flex"} 
          flex-1
        `}
      >
        {id ? (
          <ChatSide />
        ) : (
          <div className="hidden md:flex items-center justify-center w-full text-white">
            Select a chat 👀
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
