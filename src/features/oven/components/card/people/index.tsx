import Image, { StaticImageData } from 'next/image'

import DefaultProfile from '@/static/img/profile/profile-default.png'

interface OvenPeopleCardProps {
  user: UserType
  index: number
}

interface UserType {
  userId: number
  email: string
  nickname: string
  image: string | StaticImageData
  role: string
}

function OvenPeopleCard(props: OvenPeopleCardProps) {
  const { user, index } = props
  return (
    <div className="w-full py-2 flex items-center gap-x-5 text-xl">
      <span className="w-fit">{index + 1}.</span>
      <Image
        src={user.image ? user.image : DefaultProfile}
        alt={user.nickname}
        className="aspect-square object-cover rounded-full"
        width={40}
        height={40}
      />
      <span className="w-[15%]">{user.nickname}</span>
      <span className="w-[50%] font-bold">{user.email}</span>
    </div>
  )
}

export default OvenPeopleCard
