import Image from "next/image";
import Link from "next/link";
import React from "react";

const UserMediaCard = ({ userId }: { userId: string }) => {
  return (
    <div className="rounded-lg bg-white shadow-md text-sm p-4 flex flex-col gap-4">
      {/* TOP  */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>
      {/* BOTTOM  */}
      <div className="flex gap-4 justify-between flex-wrap">
        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/18460532/pexels-photo-18460532/free-photo-of-roofs-of-medieval-buildings-in-town.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/20370059/pexels-photo-20370059/free-photo-of-woman-in-a-wedding-dress-posing-in-a-bridal-shop.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/14475824/pexels-photo-14475824.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/27779112/pexels-photo-27779112/free-photo-of-a-white-dog-stands-in-front-of-a-church.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/28164876/pexels-photo-28164876/free-photo-of-a-man-climbing-a-rock-face-with-a-backpack.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/25216810/pexels-photo-25216810/free-photo-of-man-pouring-a-cup-of-turkish-tea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/28217988/pexels-photo-28217988/free-photo-of-a-snowy-landscape-with-mountains-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div className="relative w-1/5 h-24">
          <Image
            src="https://images.pexels.com/photos/28347063/pexels-photo-28347063/free-photo-of-a-laptop-and-coffee-cup-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default UserMediaCard;
