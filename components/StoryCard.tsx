import Image from "next/image";

interface Props {
  name: string
  src: string
  profile: string
}

export const StoryCard = ({ ...story }: Props) => {

  return (
    <div
      className="relative h-14 w-14 md:h-20 md:w-20
      lg:h-56 lg:w-32 cursor-pointer overflow-x p-3
      transition hover:scale-105 duration-200 ease-in hover:animate-pulse"
    >
      <Image
        className="absolute opacity-0 lg:opacity-100
        rounded-full z-50 top-10 left-1"
        src={story.profile}
        width={40}
        height={40}
        layout="fixed"
        alt=""
      />
      <Image
        className="object-cover filter
        hover:brightness-150 rounded-full lg:rounded-3xl
        duration-200 ease-in-out"
        src={story.src}
        layout="fill"
        alt=""
      />
      <p className="hidden lg:block absolute bottom-5 text-white font-medium">
        {story.name}
      </p>
  </div>)
}