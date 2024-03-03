import Twitterlayout from "@/components/layout/TwitterLayout";
import { NextPage } from "next";


const UserProfilePage:NextPage=()=>{
    return (
        <div>
            <Twitterlayout>
                <h1>
                    Profile Page
                </h1>
            </Twitterlayout>
        </div>
    )
}

export default UserProfilePage