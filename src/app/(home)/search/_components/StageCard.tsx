/* eslint-disable react/jsx-boolean-value */
import Image, { StaticImageData } from 'next/image'

interface StageCardProps {
  title: string
  location: string
  time: string
  image: string | StaticImageData
}

export default function StageCard({
  title,
  location,
  time,
  image,
}: StageCardProps) {
  return (
    <div className="w-full hover:bg-lightgray-1 cursor-pointer">
      <div className="w-full rounded-xl flex px-5 py-[1.875rem] shadow-border">
        <div className="min-h-[12.25rem] max-h-[12.25rem] min-w-[10rem] max-w-[10rem] relative">
          <Image
            src={image}
            fill
            className=" object-cover rounded-xl"
            alt="profile"
          />
        </div>
        <div className="w-full flex flex-col pl-7 gap-5">
          <div className="flex space-x-3 h-[1.875rem] text-xs font-bold">
            <div className="bg-primary px-2 py-1 flex justify-center items-center rounded">
              <span>예매중</span>
            </div>
            <div className="border border-primary px-2 py-1 flex justify-center items-center rounded">
              <span>인기</span>
            </div>
            <div className="border border-border px-2 py-1 flex justify-center items-center rounded">
              <span>공연임박</span>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-[4.375rem] flex items-center">
              <h2 className="text-2xl font-bold line-clamp-2">{title}</h2>
            </div>
            <div className="text-disabled flex flex-col gap-1">
              <h3 className="text-base font-bold">{location}</h3>
              <p className="text-xs font-medium mt-1">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
