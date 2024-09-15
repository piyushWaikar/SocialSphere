import Image from "next/image";
import React from "react";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <div className="rounded-lg shadow-md text-sm p-4 bg-white">
      {/* TOP  */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span className="Sponsored Ads">Sponsered Ad's</span>
        <Image src="/more.png" width={16} height={16} alt="" />
      </div>

      {/* BOTTOM  */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/20157508/pexels-photo-20157508/free-photo-of-people-relaxing-in-the-park.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/20157508/pexels-photo-20157508/free-photo-of-people-relaxing-in-the-park.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            className="rounded-full w-6 h-6 object-cover"
            height={24}
            width={24}
          />
          <span className="text-blue-500 font-medium">BigChef Lounge</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ipsum?"
            : size === "md"
            ? "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis at molestiae aliquam quisquam accusamus magni aliquid odit autem eligendi quos"}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg ">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Ad;
