import React, { useCallback, useState } from "react";
import { FaImage } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/layout/TwitterLayout";



export default function Home() {
  const {user}=useCurrentUser()
  const {tweets=[]}=useGetAllTweets()
  const {mutate}=useCreateTweet()

  const [content,setContent]=useState('')
  
  const handleOnClickImage=useCallback(()=>{
    const input=document.createElement('input')
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*')
    input.click()
  },[]);
  

  const handleCreateTweet=useCallback(()=>{
    mutate({
      content,
    });
    setContent('')
  },[content,mutate])

  return (
    <div>
      <Twitterlayout>
        <div className="border border-r-0 border-l-0 border-b-0 border-gray-700 p-4 hover:bg-slate-900 transition-all cursor-pointer">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
              {user?.profileImage && (
                <Image
                  className="rounded-full"
                  src={user?.profileImage}
                  height={50}
                  width={50}
                  alt="User_Image"
                />
              )}
            </div>
            <div className="col-span-11">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-transparent w-full text-xl px-2 border-b border-slate-400"
                placeholder="What's happening?"
                rows={4}
              ></textarea>
              <div className="flex justify-between items-center mt-[6px] px-1">
                <FaImage
                  onClick={handleOnClickImage}
                  className="text-xl"
                ></FaImage>
                <button
                  onClick={handleCreateTweet}
                  className="bg-[#1d9bf0] font-semibold text-lg py-1 px-4 rounded-full"
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) => {
          return tweet ? (
            <FeedCard key={tweet?.id} data={tweet as Tweet} />
          ) : null;
        })}
      </Twitterlayout>
    </div>
  );
}
