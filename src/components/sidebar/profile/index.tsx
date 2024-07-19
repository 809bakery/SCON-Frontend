import ArrowRightSVG from '@/static/svg/chevron-right.svg'
import OvenMarkSVG from '@/static/svg/ovner-mark.svg'
import ProfileSVG from '@/static/svg/sidebar-profile.svg'

interface SideBarProfileProps {
  nickname: string
  isOven: boolean
}

function SideBarProfile(props: SideBarProfileProps) {
  const { nickname, isOven } = props
  return (
    <div className="px-7 py-4 flex items-center justify-between gap-x-12 text-2xl bg-[#E5E5ED] rounded-xl">
      <ProfileSVG className="w-14 h-14" />
      <p className="flex flex-1 gap-x-3 items-center justify-start">
        <strong className="font-bold">{nickname}님</strong> 어서오세요!
        {isOven && <OvenMarkSVG className="w-7 h-7" />}
      </p>

      <ArrowRightSVG
        className="w-8 h-8 cursor-pointer"
        // eslint-disable-next-line no-alert
        onClick={() => alert('준비 중 입니다🍪')}
      />
    </div>
  )
}

export default SideBarProfile
