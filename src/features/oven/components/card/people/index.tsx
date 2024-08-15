import Image from 'next/image'

interface OvenPeopleCardProps {
  user: UserType
  index: number
}

interface UserType {
  userId: number | null
  email: string | null
  nickname: string | null
  image: string | null
  isOven: boolean
}

function OvenPeopleCard(props: OvenPeopleCardProps) {
  const { user, index } = props
  return (
    <div className="w-full py-2 flex items-center gap-x-5 text-xl">
      <span className="w-fit">{index + 1}.</span>
      {user.image && (
        <Image
          src={user?.image}
          alt="user-profile"
          className="aspect-square object-cover rounded-full"
          width={40}
          height={40}
        />
      )}
      <span className="w-[15%]">{user.nickname}</span>
      <span className="w-[50%] font-bold">{user.email}</span>
    </div>
  )
}

export default OvenPeopleCard
