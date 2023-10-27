import Image from "next/image";
import React from "react";

function SingleUser() {
  return (
    <div className="flex gap-3 w-full px-1 py-1">
      <div className="h-14 w-14 rounded-full overflow-hidden">
        <Image
          src={"/images/profile.jpg"}
          height={100}
          width={100}
          alt="a"
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-base">Robin Mia</h2>
        <span className="text-sm">What going?</span>
      </div>
      <span className="ml-auto">3.6</span>
    </div>
  );
}

export default SingleUser;
