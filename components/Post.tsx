import Image from "next/image";
import {ChatAltIcon, ShareIcon, ThumbUpIcon} from "@heroicons/react/outline";

export interface PostsType {
  email: string
  name: string
  image: string
  message: string
  postImage: string
  _id: string
  timestamp: any
}
export const Post = ({...props} : PostsType) => {

  console.log({...props})

  return <div className="flex flex-col">
    <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
      <div className="flex items-center space-x-2">
        <img src={props.image} alt="" className="rounded-full" width={40} height={40} />
        <div className="">
          <p className="font-medium">{props.name}</p>
          {props.timestamp
              ? (
                  <p className="text-xs text-gray-400">
                    {new Date(props.timestamp?.toDate()).toLocaleString()}
                  </p>
              )
              : (
                  <p className="text-xs text-gray-400">
                    Loading...
                  </p>
              )
          }
        </div>

      </div>
    </div>
    {props.postImage && (
      <div className="relative h-56 md:h-96 bg-white">
        <Image src={props.postImage} objectFit="cover" layout="fill" alt=""/>
      </div>
    )}
    <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
      <div className="inputIcon rounded-none rounded-bl-2xl">
        <ThumbUpIcon className="h-4"/>
        <p className="text-xs sm:text-base">Like</p>
      </div>
      <div className="inputIcon rounded-none">
        <ChatAltIcon className="h-4" />
        <p className="text-xs sm:text-base">Comment</p>
      </div>
      <div className="inputIcon rounded-none rounded-br-2xl">
        <ShareIcon className="h-4"/>
        <p className="text-xs sm:text-base">Share</p>
      </div>
    </div>
  </div>
}