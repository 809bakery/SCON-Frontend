import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CheckGIF from '@/static/gif/checked.gif'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step4SVG from '@/static/svg/oven/oven-register-step4.svg'

function OvenJoinRegister() {
  const router = useRouter()
  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step4SVG className="w-64" />
      </div>

      <div className="pt-[4.375rem] pb-40 flex flex-col gap-y-14 items-center justify-center">
        <Image src={CheckGIF} alt="완료이미지" />
        <div className="flex flex-col items-center justify-center gap-y-6">
          <p className="text-3xl font-bold">이세계 아이돌</p>
          <p className="text-2xl">오븐이 성공적으로 등록되었습니다.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push('/oven/my')}
        className="py-7 flex items-center justify-center  rounded-xl button text-2xl bg-primary !text-black"
      >
        오븐 관리 페이지로 이동
      </button>
    </div>
  )
}

export default OvenJoinRegister
