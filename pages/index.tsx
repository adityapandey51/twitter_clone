import React, { useCallback } from "react";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleToken } from "@/graphql/query/user";

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
  const handleLoginWithGoogle=useCallback(async(cred:CredentialResponse)=>{
    console.log("inside")
      const googleToken=cred.credential;
      if(!googleToken){
        console.log("no token")
        toast.error("Somethig wrong on your side");
        return
      };
console.log("second")
      const {verifyGoogleAuthToken}=await graphQLClient.request(
        verifyUserGoogleToken,{token:googleToken}
      )

      console.log("third")
      toast.success("Successfully Logged in")
      console.log(verifyGoogleAuthToken)
      
  },[])
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
        </div>
        <div className="col-span-5 border-r-[0.25px] border-l-[0.25px] h-screen overflow-y-scroll no-scrollbar border-gray-700">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 px-8 py-4">
          <div className="h-[150px] w-[400px] rounded-lg bg-slate-400 px-4 py-4">
            <h1 className="mb-[10px] text-2xl">New to Twitter?</h1>
            <GoogleLogin
              onSuccess={handleLoginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
