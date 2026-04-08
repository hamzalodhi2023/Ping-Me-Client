import { FaCircle, FaEllipsisV, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiChatNewFill } from "react-icons/ri";
import Chat from "./Chat";
import ChatSubmit from "./ChatSubmit";

function ChatSide() {
  return (
    <div className="relative h-dvh bg-[#1e2939] w-full lg:w-[70%] xl:w-[80%] flex flex-col text-white">
      {/* Header */}
      <div className="w-full bg-[#364153] h-16 flex items-center justify-between p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="w-fit">
            <FaUserCircle className="text-5xl text-gray-400" />
          </div>
          <div className="">
            <p className="text-white font-bold">Hamza Khan Lodhi</p>
            <div className="flex items-center justify-start gap-2">
              <FaCircle className="text-xs bg-gray-800 rounded-full text-green-500" />
              <p className="text-xs text-gray-400">online</p>
            </div>
          </div>
        </div>
        <FaEllipsisV className="text-white text-xl cursor-pointer" />
      </div>
      {/* Chat Messages */}
      <Chat />
      {/* Chat Submit input */}
      <ChatSubmit />
    </div>
  );
}

export default ChatSide;
