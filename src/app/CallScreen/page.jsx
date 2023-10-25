import CallController from "@/components/CallController";
import React from "react";

function CallScreenPage() {
  return (
    <div className="bg-black-dark h-screen">
      <div className="my-10 absolute left-1/2 -translate-x-1/2">
        <h2>Robin Mia</h2>
        <span>Calling</span>
      </div>
      <CallController />
    </div>
  );
}

export default CallScreenPage;
