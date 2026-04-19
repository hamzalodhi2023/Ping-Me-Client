import { FaUserCircle, FaCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
function Profile() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-start gap-1 bg-[#101828]">
      <div className="flex w-full items-center justify-start gap-2 border-b-[0.5px] border-[#949ca8] bg-[#1e2939] p-3 text-white">
        <IoIosArrowBack className="h-8 w-8 rounded-full bg-[#364153] p-1 text-xs font-light text-[#949ca8]" />
        <h1>Profile & Settings</h1>
      </div>

      {/* Section 1 */}
      <div className="mx-auto mt-4 w-[calc(100%-50px)] rounded-2xl bg-[#1e2939] p-3 md:w-[60%]">
        <div className="flex flex-col items-center justify-center gap-3">
          {/* image */}
          <div className="relative block w-fit">
            <FaUserCircle className="text-6xl text-gray-400" />
            <IoIosAdd className="absolute right-0 bottom-0 rounded-full border-2 border-[#1e2939] bg-[#2563eb] text-xl font-extrabold text-white" />
          </div>
          {/* Name and Email */}
          <div className="flex flex-col items-center justify-center text-white">
            <span>Hamza Khan Lodhi</span>
            <span className="text-[#6b7280]">hamzalodhi2023@gmail.com</span>
          </div>
          {/* Buttons Edit Profile and Share */}
          <div className="flex w-full items-center justify-center gap-3">
            <button className="flex-1 rounded-xl bg-[#2563eb] py-2 text-white">
              Edit Profile
            </button>
            <button className="flex-1 rounded-xl border border-gray-500 bg-gray-700 py-2 text-gray-400">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto mt-4 flex w-[calc(100%-50px)] flex-col items-start justify-center rounded-2xl md:w-[60%]">
        <h2 className="pb-2 pl-2 text-[#4b5563]">Account</h2>
        <div className="flex w-full flex-col items-center justify-center rounded-t-[14px] bg-[#1e2939]">
          <div className="flex w-full items-center justify-start gap-2 p-3">
            <LuUserRound className="h-10 w-10 rounded-[9px] bg-[#2563eb26] p-2 text-[#3b82f6]" />
            <div>
              <p className="text-[#e5e7eb]">Full Name</p>
              <p className="text-[#6b7280]">Hamza Khan Lodhi</p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center bg-[#1e2939]">
          <div className="flex w-full items-center justify-start gap-2 p-3">
            <TfiEmail className="h-10 w-10 rounded-[9px] bg-[#10b98126] p-2 text-[#10b981]" />
            <div>
              <p className="text-[#e5e7eb]">Email</p>
              <p className="text-[#6b7280]">hamzalodhi2023@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between bg-[#1e2939]">
          <div className="flex w-full items-center justify-start gap-2 p-3">
            <CiLock className="h-10 w-10 rounded-[9px] bg-[#f59e0b26] p-2 text-[#f59e0b]" />
            <div>
              <p className="text-[#e5e7eb]">Password</p>
              <p className="text-[#6b7280]">Last changed 3 months ago</p>
            </div>
          </div>
          <FaChevronRight className="mr-3 text-xl text-[#4b5563]" />
        </div>
        <div className="flex w-full items-center justify-between rounded-b-[14px] bg-[#1e2939]">
          <div className="flex w-full items-center justify-start gap-2 p-3">
            <IoMdNotificationsOutline className="h-10 w-10 rounded-[9px] bg-[#f59e0b26] p-2 text-[#f59e0b]" />
            <div>
              <p className="text-[#e5e7eb]">Notification</p>
            </div>
          </div>
          <form className="flex items-center justify-center">
            <input type="checkbox" name="" id="" className="mr-3" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
