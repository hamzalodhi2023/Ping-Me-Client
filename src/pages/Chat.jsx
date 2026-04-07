import ChatSide from "../components/ChatSide";
import Sidebar from "../components/Sidebar";

function Chat() {
  return (
    <div className="w-full h-screen bg-[#101828] block md:flex">
      <Sidebar />
      <ChatSide />
    </div>
  );
}

export default Chat;
