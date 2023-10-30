"use client";

import { getAllUsers } from "@/serverActions/GetAllUsers";
import { currentUserData as getCurrentUserData } from "@/serverActions/GetUserData";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function VontextProvider({ children }) {
  const [friends, setFriends] = useState();
  const [user, setUser] = useState();

  const [chatUserId, setChatUserId] = useState();

  function setCurrentChatUser(id) {
    setChatUserId(id);
    console.log("chating with: " + id);
  }

  useEffect(() => {
    async function run() {
      const reqFriends = await getAllUsers();
      setFriends(reqFriends);
      console.log(friends);

      const currentUserData = await getCurrentUserData();
      setUser(currentUserData);
    }

    run();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, friends, chatUserId, setCurrentChatUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default VontextProvider;
