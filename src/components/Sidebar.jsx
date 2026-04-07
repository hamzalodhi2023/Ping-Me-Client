import { RiChatNewFill } from "react-icons/ri";
import {
  FaSearch,
  FaUserCircle,
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
  FaEllipsisV,
  FaCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useState } from "react";

function Sidebar() {
  const [selectedContactId, setSelectedContactId] = useState(1);
  const contactsData = [
    { id: 1, name: "John Doe", status: "Online", avatar: null },
    { id: 2, name: "Jane Smith", status: "Offline", avatar: null },
    { id: 3, name: "Alex Johnson", status: "Away", avatar: null },
    { id: 4, name: "Emily Davis", status: "Online", avatar: null },
  ];
  return (
    <div className="bg-[#1e2939] w-full md:w-[40%] lg:w-[30%] xl:w-[20%] h-screen flex-col hidden md:flex relative md:border-r-2 border-[#364153]">
      {/* Top section (fixed) */}
      <div>
        {/* Logo */}
        <div className="w-full flex items-center justify-between p-3">
          <img src="./logotxt.png" alt="logo" className="w-28" />
          <div className="flex items-center justify-center gap-3 ">
            <div className="relative w-fit block md:hidden">
              <FaUserCircle className="text-4xl text-gray-400" />
              <FaCircle className="absolute bottom-0 right-0 text-xs bg-gray-800 rounded-full text-green-500" />
            </div>
            <RiChatNewFill className="text-white text-3xl" />
          </div>
        </div>

        {/* Search */}
        <div className="w-full p-3">
          <div className="relative mt-3">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 🔥 Scrollable chat list */}
      <div className="flex-1 overflow-y-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full flex items-center p-3 cursor-pointer transition duration-200 hover:bg-gray-700/50"
          >
            <div className="relative">
              <FaUserCircle className="text-4xl text-gray-400" />
              <FaCircle className="absolute bottom-0 right-0 text-xs bg-gray-800 rounded-full text-green-500" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="font-medium text-white">John Doe</h3>
              <p className="text-sm text-gray-400 truncate">10:00 AM</p>
            </div>
          </div>
        ))}
      </div>
      {/* User Profile Setting*/}
      <div className="w-full bg-[#364153] h-16 absolute bottom-0 left-0 hidden md:flex items-center justify-between p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-fit">
            <FaUserCircle className="text-4xl text-gray-400" />
            <FaCircle className="absolute bottom-0 right-0 text-xs bg-gray-800 rounded-full text-green-500" />
          </div>
          <p className="text-white font-bold">Hamza Khan Lodhi</p>
        </div>
        <IoMdSettings className="text-white text-2xl" />
      </div>
    </div>
  );
}

export default Sidebar;
