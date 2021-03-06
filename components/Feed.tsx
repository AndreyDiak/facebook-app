import {Stories} from "./Stories";
import {InputBox} from "./InputBox";
import {Posts} from "./Posts";

export const Feed = () => {
  return (
    <div
      className="flex-grow h-screen
      pb-44 pt-6 mr-4 xl:mr-40 max-w-2xl
      overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <Stories />
        <InputBox />
        <Posts />
      </div>
    </div>
  )
}