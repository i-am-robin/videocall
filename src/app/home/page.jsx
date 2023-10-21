import React from "react";

function HomePage() {
  let peer = new Peer();

  function inti(userId) {
    peer = new Peer(userId);
    peer.on("open", (id) => {
      console.log(id + "connected");
    });

    listenToCall();
  }

  function listenToCall() {
    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          myStream = stream;
          addLocalVideo(stream);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            if (!peerList.includes(call.peer)) {
              addRemoteVideo(remoteStream);
              peerList.push(call.peer);
            }
          });
        })
        .catch((err) => {
          console.log("unable to connect because " + err);
        });
    });
  }

  //this function will be called when we try to make a call
  function makeCall(receiverId) {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        myStream = stream;
        addLocalVideo(stream);
        let call = peer.call(receiverId, stream);
        call.on("stream", (remoteStream) => {
          if (!peerList.includes(call.peer)) {
            addRemoteVideo(remoteStream);
            peerList.push(call.peer);
          }
        });
      })
      .catch((err) => {
        console.log("unable to connect because " + err);
      });
  }

  //this function will add local stream to video pannel
  function addLocalVideo(stream) {
    let video = document.createElement("video");
    video.srcObject = stream;
    video.classList.add("video");
    video.muted = true; // local video need to be mute because of noise issue
    video.play();
    document.getElementById("localVideo").append(video);
  }

  //this function will add remote stream to video pannel
  function addRemoteVideo(stream) {
    let video = document.createElement("video");
    video.srcObject = stream;
    video.classList.add("video");
    video.play();
    document.getElementById("remoteVideo").append(video);
  }

  return <div>HomePage</div>;
}

export default HomePage;
