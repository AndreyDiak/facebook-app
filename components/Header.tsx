import Image from "next/image";

import {
  BellIcon, ChatIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ViewGridIcon
} from "@heroicons/react/solid"

import {
  FlagIcon, PlayIcon, SearchIcon, ShoppingCartIcon
} from "@heroicons/react/outline"
import {HeaderIcon} from "./HeaderIcon";
import {signOut, useSession} from "next-auth/react";

export const Header = () => {

  const { data } = useSession();

  // @ts-ignore
  return (
    <div className="flex items-center p-2 sticky z-50 bg-white shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout={"fixed"}
          alt=""
        />
        <div className="flex items-center ml-2 p-2 rounded-full bg-gray-100">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex flex ml-2 items-center bg-transparent focus:outline-none"
            type="text"
            name=""
            id=""
            placeholder="Search Facebook"/>
        </div>
      </div>
      {/*  Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      <div className="flex items-center sm:space-x-2 justify-end">
         {/*Profile pic */}
        <Image
          className="rounded-full cursor-pointer"
          // @ts-ignore
          onClick={signOut}
          src={data?.user?.image!}
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
        <p className="hidden md:inline-block whitespace-nowrap font-bold pr-3">{data?.user?.name}</p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  )
}