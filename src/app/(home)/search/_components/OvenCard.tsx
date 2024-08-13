import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'

interface OvenCardProps {
  ovenName: string
  recentStage: string[]
  image: string | StaticImageData
}

export default function OvenCard({
  ovenName,
  recentStage,
  image,
}: OvenCardProps) {
  const router = useRouter()
  const recentStageText = recentStage?.join(', ')
  return (
    <div
      role="presentation"
      className="w-full h-[9.25rem] border-0.5 border-border rounded-xl px-5 py-5 flex justify-between items-end hover:bg-lightgray-1 cursor-pointer"
      onClick={() => router.push(`/oven/detail/${ovenName}`)}
    >
      <div className="h-full flex gap-3 items-center">
        <Image
          src={image}
          width={108}
          height={108}
          className="w-[6.75rem] h-[6.75rem] rounded-xl object-cover object-center"
          alt="profile"
        />
        <div className="flex flex-col ml-4 gap-3">
          <h2 className="text-2xl font-bold">{ovenName}</h2>
          <div className="flex flex-col gap-1  text-disabled">
            <h3 className="text-base leading-6 font-bold">최근 스테이지</h3>
            <span className="text-xs w-[15.625rem] leading-6 truncate">
              {recentStageText}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
