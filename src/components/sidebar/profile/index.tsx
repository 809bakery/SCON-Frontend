import OvenMarkSVG from '@/static/svg/ovner-mark.svg'
import ProfileSVG from '@/static/svg/sidebar-profile.svg'

interface SideBarProfileProps {
  nickname: string
  isOven: boolean
}

function SideBarProfile(props: SideBarProfileProps) {
  const { nickname, isOven } = props
  return (
    <div className="px-7 py-4 flex items-center gap-x-12 text-2xl bg-[#E5E5ED] rounded-xl">
      <ProfileSVG className="w-14 h-14" />
      <p className="flex gap-x-3 items-center justify-between">
        <strong className="font-bold">{nickname}님</strong> 어서오세요!
        {isOven && <OvenMarkSVG className="w-7 h-7" />}
      </p>
    </div>
  )
}

export default SideBarProfile
