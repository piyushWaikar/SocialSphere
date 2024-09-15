import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserInfoCard = ({ userId }: { userId: string }) => {
  return (
    <div className="rounded-lg bg-white shadow-md text-sm p-4 flex flex-col gap-4">
      {/* TOP  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>
      {/* BOTTOM  */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black ">Lloyd Fleming</span>
          <span className="text-sm">@Fleming</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam saepe
          nostrum corrupti repudiandae ex nobis.
        </p>

        <div className="flex gap-2 items-center">
          <Image src="/map.png" alt="" width={16} height={16} />
          <span>
            Living in <b>Denver</b>
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <Image src="/school.png" alt="" width={16} height={16} />
          <span>
            went to <b>Edgar High School</b>
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <Image src="/work.png" alt="" width={16} height={16} />
          <span>
            Works at <b>Apple Inc.</b>
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <Image src='/link.png' alt="" width={16} height={16}/>
            <Link href='https://github.com/piyushWaikar' className="text-blue-500 font-medium">piyush</Link>
          </div>
          <div className="flex gap-1 items-center">
          <Image src='/date.png' alt="" width={16} height={16}/>
          <span>Joinded November 2024</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">Folow</button>
        <span className="text-red-400 self-end text-xs cursor-pointer">Block User</span>
      </div>
    </div>
  );
};

export default UserInfoCard;
