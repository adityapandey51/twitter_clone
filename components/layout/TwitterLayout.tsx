import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiMoney, BiUser } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyUserGoogleToken } from "@/graphql/query/user";
import { useCallback } from "react";
import { graphQLClient } from "@/clients/api";




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

interface TwitterlayoutProps {
    children: React.ReactNode;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {

    const {user}=useCurrentUser();
    const queryClient=useQueryClient()

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


    return (
      <div>
        <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
          <div className="col-span-2 sm:col-span-3 pt-1 sm:ml-28">
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 text-xl px-1 sm:px-0 sm:pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li
                    className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                    key={item.title}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="hidden sm:inline">{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 ml-[-4px] sm:ml-0 px-1">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="block sm:hidden text-2xl h-fit w-fit bg-[#1d9bf0] hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
                  <BsTwitter />
                </button>
              </div>
            </div>
            {user && (
              <div className="absolute bottom-5 flex  sm:gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
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
                  <h3 className="text-xl sm:inline hidden">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-10 sm:col-span-5  border-r-[0.25px] border-l-[0.25px] h-screen overflow-y-scroll no-scrollbar border-gray-700">
            {props.children}
          </div>
          <div className="col-span-0 sm:col-span-3 px-8 py-4">
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

export default Twitterlayout