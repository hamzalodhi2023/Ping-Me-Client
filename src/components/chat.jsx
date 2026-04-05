import React, { useState, useRef, useEffect } from "react";
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

const Chat = () => {
  // --- Dummy Data ---
  const contactsData = [
    { id: 1, name: "John Doe", status: "Online", avatar: null },
    { id: 2, name: "Jane Smith", status: "Offline", avatar: null },
    { id: 3, name: "Alex Johnson", status: "Away", avatar: null },
    { id: 4, name: "Emily Davis", status: "Online", avatar: null },
  ];

  const initialMessages = {
    1: [
      {
        id: 1,
        text: "Hey there! How are you?",
        sender: "them",
        timestamp: "10:00 AM",
      },
      {
        id: 2,
        text: "Hello! I'm doing great, thanks for asking.",
        sender: "me",
        timestamp: "10:02 AM",
      },
      {
        id: 3,
        text: "Do you have the report ready?",
        sender: "them",
        timestamp: "10:05 AM",
      },
      {
        id: 4,
        text: "Yes, just finished it. I'll send it over.",
        sender: "me",
        timestamp: "10:07 AM",
      },
    ],
    2: [
      {
        id: 1,
        text: "Hi Jane, meeting at 3pm today?",
        sender: "me",
        timestamp: "9:00 AM",
      },
      {
        id: 2,
        text: "Yes, see you then. Don't forget the documents.",
        sender: "them",
        timestamp: "9:15 AM",
      },
      { id: 3, text: "Got it, thanks!", sender: "me", timestamp: "9:16 AM" },
    ],
    3: [
      {
        id: 1,
        text: "Hey Alex, are you coming to the party?",
        sender: "me",
        timestamp: "Yesterday",
      },
      {
        id: 2,
        text: "Sorry, I'm busy with work. Maybe next time!",
        sender: "them",
        timestamp: "Yesterday",
      },
    ],
    4: [
      {
        id: 1,
        text: "Hi Emily, great job on the presentation!",
        sender: "me",
        timestamp: "8:30 AM",
      },
      {
        id: 2,
        text: "Thank you so much! I really appreciate it.",
        sender: "them",
        timestamp: "8:32 AM",
      },
    ],
  };

  const [contacts] = useState(contactsData);
  const [messages, setMessages] = useState(initialMessages);
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [inputMessage, setInputMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showChat, setShowChat] = useState(false);

  const messagesEndRef = useRef(null);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentContact = contacts.find((c) => c.id === selectedContactId);
  const currentMessages = messages[selectedContactId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, selectedContactId]);

  const handleContactSelect = (contactId) => {
    setSelectedContactId(contactId);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedContactId]: [...prev[selectedContactId], newMessage],
    }));
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getLastMessage = (contactId) => {
    const msgs = messages[contactId];
    if (!msgs || msgs.length === 0) return "No messages yet";
    const lastMsg = msgs[msgs.length - 1];
    return lastMsg.text.length > 30
      ? lastMsg.text.substring(0, 30) + "..."
      : lastMsg.text;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Online":
        return "text-green-500";
      case "Offline":
        return "text-gray-500";
      case "Away":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const ContactList = () => (
    <div className="w-full md:w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Chats</h2>
          <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-white" />
        </div>
        <div className="relative mt-3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact.id)}
              className={`flex items-center p-3 cursor-pointer transition duration-200 ${
                selectedContactId === contact.id && !showChat
                  ? "bg-gray-700"
                  : "hover:bg-gray-700/50"
              }`}
            >
              <div className="relative">
                <FaUserCircle className="text-4xl text-gray-400" />
                <FaCircle
                  className={`absolute bottom-0 right-0 text-xs ${getStatusColor(contact.status)} bg-gray-800 rounded-full`}
                />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-medium">{contact.name}</h3>
                <p className="text-sm text-gray-400 truncate">
                  {getLastMessage(contact.id)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No contacts found
          </div>
        )}
      </div>
    </div>
  );

  const ChatView = () => (
    <div className="w-full flex-1 flex flex-col bg-gray-900 h-full border-2 border-red-500">
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center">
          <button
            onClick={handleBackToList}
            className="md:hidden text-gray-400 hover:text-white mr-3"
          >
            <FaArrowLeft size={20} />
          </button>
          <FaUserCircle className="text-4xl text-gray-400" />
          <div className="ml-3">
            <h2 className="font-semibold text-lg">{currentContact?.name}</h2>
            <div className="flex items-center text-xs">
              <FaCircle
                className={`${getStatusColor(currentContact?.status)} mr-1 text-xs`}
              />
              <span className="text-gray-400">{currentContact?.status}</span>
            </div>
          </div>
        </div>
        <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-white" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentMessages.length > 0 ? (
          currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${
                  message.sender === "me"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm break-words">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${message.sender === "me" ? "text-blue-200" : "text-gray-400"}`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages yet. Start the conversation!
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-white transition flex-shrink-0">
            <FaSmile size={22} />
          </button>
          <button className="text-gray-400 hover:text-white transition flex-shrink-0">
            <FaPaperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition flex-shrink-0"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex h-full w-full md:flex-row">
        {/* Sidebar - full screen on mobile when visible */}
        <div
          className={`${showChat ? "hidden md:block" : "block"} h-full w-full`}
        >
          <ContactList />
        </div>
        {/* Chat View - full screen on mobile when visible */}
        <div
          className={`${!showChat ? "hidden md:block" : "block"} flex-1 h-full`}
        >
          {currentContact ? (
            <ChatView />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
