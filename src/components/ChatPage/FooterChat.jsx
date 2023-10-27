"use client";

import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";

function FooterChat() {
  const [text, setText] = useState("");
  const minRows = 1; // Minimum number of rows
  const maxRows = 6; // Maximum number of rows
  const defaultBorderRadiusClass = "rounded-full"; // Default border radius class
  const roundedFullClass = "rounded-md"; // Border radius class when rows change

  const [borderRadiusClass, setBorderRadiusClass] = useState(
    defaultBorderRadiusClass
  );

  const handleInputChange = (e) => {
    const textareaLineHeight = 24; // Adjust this value based on your CSS
    const previousRows = e.target.rows;
    e.target.rows = minRows; // Reset to minimum rows
    const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === maxRows) {
      e.target.style.overflowY = "scroll";
    } else {
      e.target.style.overflowY = "hidden";
      e.target.rows = currentRows;
    }

    setText(e.target.value);

    if (currentRows !== previousRows) {
      // Rows changed, update the border radius class
      setBorderRadiusClass(
        currentRows === minRows ? defaultBorderRadiusClass : roundedFullClass
      );
    }
  };

  const handleSendMsg = () => {};

  return (
    <div className="mt-auto  flex items-center gap-3 mx-2 py-1">
      <textarea
        value={text}
        onChange={handleInputChange}
        className={`resize-none ${borderRadiusClass}`}
        rows={minRows}
        placeholder="Type something..."
      />
      <button
        onClick={handleSendMsg}
        className="h-10 w-10 rounded-full items-center flex bg-opacity-0 hover:bg-opacity-20">
        <PaperAirplaneIcon height={24} width={24} className="text-prymary" />
      </button>
    </div>
  );
}

export default FooterChat;
