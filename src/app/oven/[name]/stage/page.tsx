'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { DUMMY_OVEN_PROFILE } from '@/constants/oven/manage/profile/index.ts'
import { DAY_MAP } from '@/constants/stage/info/index.ts'
import OvenManageCard from '@/features/oven/components/manage/stage/card/index.tsx'

function OvenSettingStage() {
  const router = useRouter()
  const parseDate = (startDate: string) => {
    const date = new Date(startDate).toLocaleDateString('ko-kr')
    const day = DAY_MAP[new Date(startDate).getDay()]
    return `${date} (${day})`
  }

  return (
    <div className="py-10 px-7 flex flex-col gap-y-4">
      {DUMMY_OVEN_PROFILE.map((stage) => (
        <OvenManageCard
          key={stage.createdAt}
          className="flex flex-col gap-y-4 items-center"
        >
          <h3 className="text-xl font-bold">{stage.title}</h3>

          <Image
            src={stage.image}
            alt="stage-image"
            className="object-cover w-32"
          />
          <span className="text-[#363232]">{`${stage.location} |  ${parseDate(stage.startDate)}`}</span>

          <div className="flex justify-between items-center gap-x-5 text-sm">
            <button
              type="button"
              onClick={() => router.push('/stage/detail/1')}
              className="py-2 px-6 border border-primary rounded-xl"
            >
              상세 정보 조회
            </button>
            <button
              type="button"
              onClick={() => toast.error('준비 중')}
              className="py-2 px-6 border border-primary rounded-xl"
            >
              QR 리더기
            </button>
            <button
              type="button"
              onClick={() => router.push('/oven/1/members/manage')}
              className="py-2 px-6 border border-primary rounded-xl"
            >
              예매자 명단 확인
            </button>
          </div>
        </OvenManageCard>
      ))}
    </div>
  )
}

export default OvenSettingStage
