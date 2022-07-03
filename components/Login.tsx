import Image from "next/image";
import {signIn} from "next-auth/react";

export const Login = () => {
  return <div className="flex flex-col items-center">
    <Image
      src="https://links.papareact.com/t4i"
      height={300}
      width={300}
      objectFit="contain"
      alt=""
    />
    <h1
      className="text-white rounded px-4 py-2 bg-blue-500 cursor-pointer hover:bg-blue-600"
      // @ts-ignore
      onClick={signIn}
    >
      Login to use app
    </h1>
  </div>
}
