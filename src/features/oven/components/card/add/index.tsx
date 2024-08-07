'use client'

import { useRouter } from 'next/navigation'

import OvenPlusSVG from '@/static/svg/oven/oven-plus-icon.svg'

function OvenAddCard() {
  const router = useRouter()

  const handleRegister = () => {
    router.push('/oven/register/profile')
  }

  return (
    <button
      type="button"
      onClick={handleRegister}
      className="w-[30%] rounded-xl cursor-pointer"
    >
      <div className="pt-2 px-2 flex items-center justify-center rounded-xl aspect-square object-cover bg-[#E5E5ED]">
        <OvenPlusSVG className="w-14 h-14" />
      </div>
      <p className="py-3 flex items-center justify-center">새 오븐 등록하기</p>
    </button>
  )
}

export default OvenAddCard
