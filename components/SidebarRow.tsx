import {SVGProps} from "react";
import Image from "next/image";
interface Props {
  src?: string
  title: string
  Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export const SidebarRow = ({src, Icon, title} : Props) => {
  return (
    <div className="flex items-center space-x-2 p-4 cursor-pointer hover:bg-gray-200 rounded-xl">
      {src && (
        <Image
          className="rounded-full"
          src={src}
          width={40}
          height={40}
          layout="fixed"
          alt=""
        />
      )}
      {Icon && (
        <Icon className="h-8 w-8 text-blue-500"/>
      )}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  )
}