import FeedCard from "@/components/FeedCard";
import {useRouter} from "next/router";
import Twitterlayout from "@/components/layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import { NextPage } from "next";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";


const UserProfilePage:NextPage=()=>{
    const {user}=useCurrentUser();
    const router=useRouter();
    
    return (
      <div>
        <Twitterlayout>
          <div>
            <nav className="flex py-4 px-3 gap-4">
              <FaArrowLeft className="text-2xl mt-2" />
              <div>
                <div className="font-bold text-2xl">
                  {user?.firstName} {user?.lastName}
                </div>
                <div className="text-slate-500">{user?.tweets?.length} tweets</div>
              </div>
            </nav>
            <div className="mb-[14px] ">
                {user?.profileImage && <Image src={user?.profileImage} width={150} height={150} className="rounded-full p-5" alt="user-image"/>} 
                <div className="font-semibold text-2xl px-4">
                  {user?.firstName} {user?.lastName}
                </div>
            </div>
            {user?.tweets?.map((tweet) => {
          return tweet ? (
            <FeedCard key={tweet?.id} data={tweet as Tweet} />
          ) : null;
        })}
          </div>
        </Twitterlayout>
      </div>
    );
}

export default UserProfilePage