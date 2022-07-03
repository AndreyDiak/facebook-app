export const HeaderIcon = ({ Icon, active } : {Icon : any, active?: boolean}) => {
  return (
    <div
      className="flex items-center cursor-pointer
        md:px-5 lg:px-10 h-10 px-4 md:hover:bg-gray-100 rounded-md
        active:border-b-2 active:border-blue-500 group">
      <Icon className={`h-6 md:h-7 text-gray-600 group-hover:text-blue-500 ${active && 'text-blue-500'} `} />
    </div>
  )
}