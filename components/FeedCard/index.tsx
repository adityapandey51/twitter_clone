import React from "react"
import Image from "next/image"
import {BiMessageRounded} from "react-icons/bi"
import { FaRegHeart } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

const FeedCard: React.FC=()=>{
    return (
      <div className="border border-r-0 border-l-0 border-b-0 border-gray-700 p-4 hover:bg-slate-900 transition-all cursor-pointer">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-1">
            <Image
              className="rounded-full"
              src="https://avatars.githubusercontent.com/u/124462709?v=4"
              height={50}
              width={50}
              alt="User_Image"
            />
          </div>
          <div className="col-span-11">
            <h3>Aditya Pandey</h3>
            <p className="mt-2">
              Charting new orbits for growth and innovation!
              <br/>
              <br/>
              Our government has
              updated the FDI policy in the space sector, paving the way for a
              galaxy of opportunities.
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