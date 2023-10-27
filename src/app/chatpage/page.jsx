import FooterChat from "@/components/ChatPage/FooterChat";
import HeaderSection from "@/components/ChatPage/Header";
import React from "react";

function ChatPage() {
  const users = [
    {
      userName: "Robin",
      userProfilePic: "/images/profile.jpg",
    },
  ];
  return (
    <div className="max-h-screen flex flex-col h-screen bg-black-dark">
      {users.map((userData, i) => {
        return <HeaderSection key={i} userData={userData} />;
      })}
      <FooterChat />
    </div>
  );
}

export default ChatPage;
