import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'

import ArrowRightSVG from '@/static/svg/arrow-right-icon.svg'
import OvenMarkSVG from '@/static/svg/checked-ovener-icon.svg'

interface SideBarProfileProps {
  nickname: string | undefined
  isOvener: boolean | undefined
  image: string | StaticImageData | undefined
}

function SideBarProfile(props: SideBarProfileProps) {
  const router = useRouter()
  const { nickname, isOvener, image } = props
  return (
    <div className="px-7 py-4 flex items-center justify-between gap-x-8 text-2xl bg-[#E5E5ED] rounded-xl">
      {image && (
        <Image
          src={image!}
          className="w-14 h-14 rounded-full"
          alt="프로필 이미지"
        />
      )}
      <p className="flex flex-1 gap-x-3 items-center justify-start">
        <strong className="font-bold">{nickname}님</strong> 어서오세요!
        {isOvener && <OvenMarkSVG className="w-7 h-7" />}
      </p>

      <ArrowRightSVG
        className="w-8 h-8 cursor-pointer"
        // eslint-disable-next-line no-alert
        onClick={() => router.push('/mypage/profile')}
      />
    </div>
  )
}

export default SideBarProfile
