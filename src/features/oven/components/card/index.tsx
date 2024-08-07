import Image, { StaticImageData } from 'next/image'

interface OvenCardProps {
  ovenName: string
  image: string | StaticImageData
}

function OvenCard(props: OvenCardProps) {
  const { ovenName, image } = props
  return (
    <div className="w-[30%] rounded-xl cursor-pointer">
      <Image
        src={image}
        alt="oven profile"
        className="pt-2 px-2 rounded-xl aspect-square object-cover"
      />
      <p className="py-3 flex items-center justify-center">{ovenName}</p>
    </div>
  )
}

export default OvenCard
