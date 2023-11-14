"use client";

import { currentUserData as getCurrentUserData } from "@/serverActions/GetUserData";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAllUsers } from "@/serverActions/GetAllUsers";
import { io } from "socket.io-client";

export const UserContext = createContext();

const socket = io("http://localhost:5000/");

function VontextProvider({ children }) {
  const [allFriends, setAllFriends] = useState([]);
  const [activeFriends, setActiveFriends] = useState([]);

  const [user, setUser] = useState(null);
  const [socketId, setSocketId] = useState();
  const [incomingCall, setIncomingCall] = useState(false);
  const [chatUser, setChatUser] = useState();

  const [peerId, setPeerId] = useState();

  const peerInstance = useRef(null);

  const callerVideo = useRef();
  const userVideo = useRef();

  function setCurrentChatUser(id) {
    for (const user of activeFriends) {
      if (user.id === id) {
        console.log(user);
        setChatUser(user);
        return user;
      }
    }
  }

  useEffect(() => {
    // get user and frieds
    async function run() {
      const currentUserData = await getCurrentUserData();
      setUser(currentUserData);

      const reqfriends = await getAllUsers();
      setAllFriends(reqfriends);
    }
    run();

    // import peer.js
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer();

      peer.on("open", (id) => {
        setPeerId(id);
      });

      peer.on("call", (call) => {
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = mediaStream;
          }
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            if (callerVideo.current) {
              callerVideo.current.srcObject = remoteStream;
            }
          });
        });
      });

      peerInstance.current = peer;
    });

    // handle socket.io-client
    socket.on("connect", () => {
      // console.log("socket is connected");

      socket.on("myId", (id) => {
        // console.log("your socket id: " + id);
        setSocketId(id);
      });

      socket.on("call", (id) => {
        console.log(`geting call from ${id}`);
        setIncomingCall(true);
      });
    });
  }, []);

  useEffect(() => {
    if (user && peerId) {
      // console.log("submit me");
      socket.emit("addMe", { user, peerId });
    }
  }, [user, peerId]);

  useEffect(() => {
    socket.on("allUsers", async (activeUsers) => {
      // console.log(activeUsers);
      const updatedFriends = allFriends.map((friend) => {
        const activeUser = activeUsers.find(
          (user) => user.userId === friend.id
        );
        if (activeUser) {
          return { ...friend, active: true, peerId: activeUser.peerId };
        } else {
          return { ...friend, active: false, peerId: friend.peerId };
        }
      });
      await setActiveFriends(updatedFriends);
    });
  }, [allFriends, activeFriends]);

  async function makeCall(id) {
    console.log(`calling to ${id}`);

    console.log(allFriends);

    activeFriends.map((friend) => {
      console.log(friend);
    });

    // if (peerId === "not found") return console.log("not online");

    return console.log("hi");

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(async (stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }

        const call = peerInstance.current.call(peerId, stream);

        socket.emit("callUser", { from: user, to: userToCall.socketId });

        call.on("stream", (remoteStream) => {
          if (callerVideo.current) {
            callerVideo.current.srcObject = remoteStream;
          }
        });
      });
  }

  function ansCall() {
    peerInstance.current.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
          call.answer(stream);
          call.on("stream", function (remoteStream) {
            if (callerVideo.current) {
              callerVideo.current.srcObject = remoteStream;
            }
          });
        });
    });
  }

  return (
    <UserContext.Provider
      value={{
        peerId,
        user,
        chatUser,
        socketId,
        incomingCall,
        allFriends,
        activeFriends,
        callerVideo,
        userVideo,
        setCurrentChatUser,
        makeCall,
        ansCall,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default VontextProvider;
