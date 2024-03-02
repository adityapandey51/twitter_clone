import React from "react"
import Image from "next/image"
import {BiMessageRounded} from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { Tweet } from "@/gql/graphql";


interface feedCardProps{
  data: Tweet;
}
const FeedCard:React.FC<feedCardProps>=(props)=>{
    const {data}=props
    return (
      <div className="border border-r-0 border-l-0 border-b-0 border-gray-700 p-4 hover:bg-slate-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-1">
           {data.author.profileImage && <Image
              className="rounded-full"
              src={data.author?.profileImage}
              height={50}
              width={50}
              alt="User_Image"
            />}
          </div>
          <div className="col-span-11">
            <h3>{data.author?.firstName} {data.author?.lastName}</h3>
            <p className="mt-2">
            {data.content}
            </p>
            <div className="flex justify-between mt-5 pr-[80px] text-xl">
              <div>
                <BiMessageRounded />
              </div>
              <div>
                <FaRetweet />
              </div>
              <div>
                <FaRegHeart />
              </div>
              <div>
                <FiUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FeedCard