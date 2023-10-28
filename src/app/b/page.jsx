"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://videochat2-s7zy.onrender.com");

function App() {
  const [peerId, setPeerId] = useState("");
  const [socketId, setSocketId] = useState();
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const [usreName, setUserName] = useState("");

  const [allUsers, setallUsers] = useState([]);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      socket.on("yourId", (id) => {
        setSocketId(id);
      });
    });
    import("peerjs").then(({ default: Peer }) => {
      // normal synchronous code
      const peer = new Peer();
      peer.on("open", (id) => {
        setPeerId(id);
        socket.emit("newId", {
          name: usreName,
          peerId: id,
          socketId: socket.id,
        });
      });

      peer.on("call", (call) => {
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;

        getUserMedia({ video: true, audio: true }, (mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          currentUserVideoRef.current.muted = true;
          call.answer(mediaStream);
          call.on("stream", function (remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        });
      });

      peerInstance.current = peer;
    });

    socket.on("allUsers", (users) => {
      setallUsers(users);
      console.log(users);
    });
  }, []);

  const call = (remotePeerId, userToCall) => {
    socket.emit("callUser", {
      callToId: userToCall,
      callFromId: socketId,
      callerName: usreName,
    });
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div className="App bg-black-dark h-screen">
      <h1>Current user id is {peerId}</h1>
      <input
        type="text"
        value={remotePeerIdValue}
        onChange={(e) => setRemotePeerIdValue(e.target.value)}
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div>
        <video muted ref={currentUserVideoRef} />
      </div>
      <input
        type="text"
        value={usreName}
        placeholder="Your Name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <div>
        <video ref={remoteVideoRef} />
      </div>

      <p>Your socket id : {socketId}</p>

      {allUsers.map((user, i) => (
        <button
          key={i}
          className="block mb-1"
          onClick={() => {
            call(user.peerId);
          }}>
          {user.peerId}
        </button>
      ))}
    </div>
  );
}

export default App;
