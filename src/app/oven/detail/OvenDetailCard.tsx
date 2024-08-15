import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'

interface OvenDetailCardProps {
  src: string | StaticImageData
  name: string
  id: string
}

export default function OvenDetailCard({ src, name, id }: OvenDetailCardProps) {
  const router = useRouter()
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    router.push(`/oven/detail/${encodeURIComponent(name)}?id=${id}`)
  }

  return (
    <div className="w-[30%] flex flex-col items-center gap-3 px-[.625rem] py-3">
      <div
        role="presentation"
        className="relative  rounded-xl overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <Image
          src={src}
          alt={name}
          width={140}
          height={140}
          objectPosition="center"
          className="w-full aspect-square object-cover"
        />
      </div>
      <span className="text-base leading-6 font-medium">{name}</span>
    </div>
  )
}
