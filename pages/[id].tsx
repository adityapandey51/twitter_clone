import FeedCard from "@/components/FeedCard";
import {useRouter} from "next/router";
import Twitterlayout from "@/components/layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { graphQLClient } from "@/clients/api";
import { getUserByIDQuery } from "@/graphql/query/user";

interface ServerProps{
  user?:User
}

const UserProfilePage:NextPage<ServerProps>=(props)=>{
  

    
    return (
      <div>
        <Twitterlayout>
          <div>
            <nav className="flex py-4 px-3 gap-4">
              <FaArrowLeft className="text-2xl mt-2" />
              <div>
                <div className="font-bold text-2xl">
                  {props.user?.firstName} {props.user?.lastName}
                </div>
                <div className="text-slate-500">{props.user?.tweets?.length} tweets</div>
              </div>
            </nav>
            <div className="mb-[14px] ">
                {props.user?.profileImage && <Image src={props.user?.profileImage} width={150} height={150} className="rounded-full p-5" alt="user-image"/>} 
                <div className="font-semibold text-2xl px-4">
                  {props.user?.firstName} {props.user?.lastName}
                </div>
            </div>
            {props.user?.tweets?.map((tweet) => {
          return tweet ? (
            <FeedCard key={tweet?.id} data={tweet as Tweet} />
          ) : null;
        })}
          </div>
        </Twitterlayout>
      </div>
    );
}

export const getServerSideProps:GetServerSideProps<ServerProps>=async(context)=>{
  const id=context.query.id as string | undefined;
  if(!id) return {notFound:true,props:{user:undefined}}

  const userInfo=await graphQLClient.request(getUserByIDQuery,{id})

  if (!userInfo) return {notFound:true,props:{ser:undefined}}
  return {
    props:{
      user:userInfo.getUserByID as User
    }
  }
}

export default UserProfilePage