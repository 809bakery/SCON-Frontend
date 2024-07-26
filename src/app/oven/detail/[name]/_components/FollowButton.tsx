import FilledHeartSVG from '@/static/svg/heart-fill-icon.svg'
import UnfilledHeartSVG from '@/static/svg/heart-unfill-icon.svg'

interface FollowButtonProps {
  follow: boolean
  setFollow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FollowButton({ follow, setFollow }: FollowButtonProps) {
  const onClickFollow = () => {
    setFollow(!follow)
  }

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 border border-border px-3 py-1 rounded-xl"
      onClick={onClickFollow}
    >
      {follow ? (
        <FilledHeartSVG className="w-[1.875rem] h-[1.875rem]" />
      ) : (
        <UnfilledHeartSVG className="w-[1.875rem] h-[1.875rem]" />
      )}
      <span className="font-bold text-sm">팔로우</span>
    </button>
  )
}
