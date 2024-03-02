import React, { useCallback, useState } from "react";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { FaImage } from "react-icons/fa6";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More Options",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const {user}=useCurrentUser()
  const queryClient=useQueryClient()
  const {tweets=[]}=useGetAllTweets()
  const {mutate}=useCreateTweet()

  const [content,setContent]=useState('')
  
  const handleOnClickImage=useCallback(()=>{
    const input=document.createElement('input')
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*')
    input.click()
  },[]);
  
  const handleLoginWithGoogle=useCallback(async(cred:CredentialResponse)=>{
      
      const googleToken=cred.credential;
      if(!googleToken){
        console.log("no token")
        toast.error("Somethig wrong on your side");
        return
      };
      const {verifyGoogleAuthToken}=await graphQLClient.request(
        verifyUserGoogleToken,{token:googleToken}
      )

      toast.success("Successfully Logged in")
      console.log(verifyGoogleAuthToken)

      if (verifyGoogleAuthToken)
        window.localStorage.setItem('_twitter_token',verifyGoogleAuthToken)

      await queryClient.invalidateQueries(['current-user'])
      

      
  },[queryClient])


  const handleCreateTweet=useCallback(()=>{
    mutate({
      content,
    });
  },[content,mutate])
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-28">
          <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-1">
              <button className="bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                Tweet
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImage && (
                <Image
                  className="rounded-full"
                  src={user?.profileImage}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div>
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r-[0.25px] border-l-[0.25px] h-screen overflow-y-scroll no-scrollbar border-gray-700">
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
                <textarea value={content}
                onChange={e=>setContent(e.target.value)}
                  className="bg-transparent w-full text-xl px-2 border-b border-slate-400"
                  placeholder="What's happening?"
                  rows={4}
                ></textarea>
                <div className="flex justify-between items-center mt-[6px] px-1">
                  <FaImage onClick={handleOnClickImage} className="text-xl"></FaImage>
                  <button onClick={handleCreateTweet} className="bg-[#1d9bf0] font-semibold text-lg py-1 px-4 rounded-full">
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
         {
          tweets?.map((tweet)=>{
            return ( tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null)
          })
         }
        </div>
        <div className="col-span-3 px-8 py-4">
          {!user && (
            <div className="h-[150px] w-[400px] rounded-lg bg-slate-400 px-4 py-4">
              <h1 className="mb-[10px] text-2xl">New to Twitter?</h1>
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
