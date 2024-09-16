import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

const AddPost = () => {
  
  const {userId} = auth(); // from clerk authentication , where user is login through
  // console.log(userId)
  const testAction =async (formData:FormData)=>{
    "use server"
    if(!userId) return;
    const desc = formData.get('desc') as string;
    try {
      const res =await prisma.post.create({
        data:{
          userId:userId,
          desc:desc
        }
      })
      console.log(res);
      
    } catch (err) {
      console.log(err);
      
    }
  }
  return (
    <div className="p-4 shadow-md bg-white rounded-lg flex gap-4 justify-between text-sm">
      {/* avatar  */}
      <Image
        src="https://images.pexels.com/photos/25216810/pexels-photo-25216810/free-photo-of-man-pouring-a-cup-of-turkish-tea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        width={48}
        height={48}
        alt=""
        className="w-12 h-12 object-cover rounded-full"
      />

      {/* post  */}
      <div className="flex-1">
        {/* text input  */}
        <form action={testAction} className="flex gap-4">
          <textarea
            placeholder="What's on you mind ?"
            className="bg-slate-100 rounded-lg flex-1 p-2"
            name="desc"
          ></textarea>
          <Image
            src="/emoji.png"
            width={20}
            height={20}
            alt=""
            className="w-5 h-5 cursor-pointer self-end"
          />
          <button>Send</button>
        </form>
        {/* post options */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addimage.png" alt="" width={20} height={20} />
            Photo
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
