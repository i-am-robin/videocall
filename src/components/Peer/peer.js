"use client";

import("peerjs").then(({ default: Peer }) => {
  exportPeer(Peer);
});

export const Peer = (Peer) => {
  return { Peer };
};
