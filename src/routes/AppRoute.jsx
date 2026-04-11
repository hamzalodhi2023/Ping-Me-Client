import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "../pages/AuthPage";
import Chat from "../pages/ChatPage";
import Profile from "../pages/ProfilePage";
import Otp from "../pages/OtpPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
