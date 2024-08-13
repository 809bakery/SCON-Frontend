import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'

interface OvenCardProps {
  ovenId: number
  ovenName: string
  image: string | StaticImageData
}

function OvenCard(props: OvenCardProps) {
  const { ovenId, ovenName, image } = props
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push(`/oven/${ovenId}`)}
      className="w-[30%] rounded-xl cursor-pointer"
    >
      <Image
        src={image}
        width={140}
        height={140}
        alt="oven profile"
        className="w-full pt-2 px-2 rounded-xl aspect-square object-cover"
      />
      <p className="py-3 flex items-center justify-center">{ovenName}</p>
    </button>
  )
}

export default OvenCard
