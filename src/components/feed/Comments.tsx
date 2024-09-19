import prisma from '@/lib/client'
import Image from 'next/image'
import React from 'react'
import CommentList from './CommentList';

const Comments =async ({postId}:{postId:number}) => {
    const comments = await prisma.comment.findMany({
        where:{
            postId
        },
        include:{
            user:true
        }
    });
  return (
    <>
        <CommentList postId={postId} comments={comments} />
    </>
  )
}

export default Comments