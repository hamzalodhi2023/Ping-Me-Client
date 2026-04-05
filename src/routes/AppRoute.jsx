import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth";
import Authcode from "../components/auth";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="code" element={<Authcode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
