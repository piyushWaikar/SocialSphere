import Image from "next/image";
import Link from "next/link";
import React from "react";

const FriendRequest = () => {
  return (
    <div className="rounded-lg bg-white shadow-md text-sm p-4 flex flex-col gap-4">
      {/* TOP  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>

      {/* Users  */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/28302543/pexels-photo-28302543/free-photo-of-a-woman-with-long-hair-posing-for-a-portrait.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">Wayne Burton</span>
        </div>

        <div className="flex gap-3 justify-end">
          <Image
          src='/accept.png'
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <Image
          src='/reject.png'
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
