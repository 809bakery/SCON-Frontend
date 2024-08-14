'use client'

import { useRouter } from 'next/navigation'

interface OvenProfileCardProps {
  children: React.ReactNode
  id: number
}

function OvenProfileCard(props: OvenProfileCardProps) {
  const { children, id } = props
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push(`/stage/detail/${id}`)}
      className="bg-white py-8 px-5 flex justify-between gap-x-7 border border-border rounded-xl"
    >
      {children}
    </button>
  )
}

export default OvenProfileCard
