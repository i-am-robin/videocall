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

    getUserMedia({ video: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
      call.answer(mediaStream);
      call.on("stream", function (remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  });

  peerInstance.current = peer;
});
