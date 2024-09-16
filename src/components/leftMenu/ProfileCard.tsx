import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileCard = async() => {
  const {userId} = auth(); // fetching current userId from clerk
  if(!userId) return null;
  const user = await prisma.user.findFirst({
    where:{
      id:userId
    },
    //populating other model, with only selected field such as followers with only count .
    include:{
      _count:{
        select:{
          followers:true
        }
      }
    }
  });
  console.log(user);

  if(!user) return null
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user.cover || '/noCover.jpeg'}
          alt=""
          fill
          className="rounded-md object-cover"
        />
        <Image
          src={user.avatar || '/noAvatar.png'}
          alt=""
          width={48}
          height={48}
          className="object-cover rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">{(user.name && user.surname) ? user.name + " " + user.surname : user.name}</span>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <Image
              src="https://images.pexels.com/photos/28220698/pexels-photo-28220698/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="object-fit rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/28220698/pexels-photo-28220698/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="object-fit rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/28220698/pexels-photo-28220698/free-photo-of-nguoitamchuyenhouse-sai-gon-vi-t-nam-2020-saigon-vietnam-2020.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              width={12}
              height={12}
              className="object-fit rounded-full w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-500">{user._count.followers} Followers</span>
        </div>
        <Link href={`/profile/${user.username}`}>
        <button className="bg-blue-500 text-white text-xs p-2 rounded-md">
          My Profile
        </button></Link>
      </div>
    </div>
  );
};

export default ProfileCard;
