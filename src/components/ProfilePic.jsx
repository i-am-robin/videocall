import React from "react";

function ProfilePic({ children, h, w }) {
  return (
    <div className={`h-${h} w-${w} rounded-full overflow-hidden`}>
      {children}
    </div>
  );
}

export default ProfilePic;
