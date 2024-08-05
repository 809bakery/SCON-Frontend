'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import TicketWrapperCard from '@/features/ticket/card/index.tsx'

function TicketBookSuccessPage() {
  const router = useRouter()

  const handleCheckTicket = () => {
    router.push('/ticket/my')
  }
  return (
    <div className="w-full pb-[12.5rem]">
      <div className="min-h-[15rem] relative">
        <Image
          src={DUMMY_STAGE_DETAIL.image}
          alt="background stage poster"
          layout="fill"
          objectFit="cover"
          className="opacity-30 absolute top-0"
        />

        <div className="w-full px-7 py-9 gap-y-2 flex items-center flex-col">
          <div className="py-6 text-4xl font-bold">예매 완료</div>

          <div className="p-3 flex flex-col items-center gap-y-3">
            <span className="font-bold">예매 번호</span>
            <span>S123456789</span>
          </div>
        </div>
      </div>

      {/* title */}
      <div className="flex flex-col gap-y-7 py-3 px-7">
        <div className="p-3 text-2xl font-bold">{`${DUMMY_STAGE_DETAIL.title} ${DUMMY_STAGE_DETAIL.detail && `- ${DUMMY_STAGE_DETAIL.detail}`}`}</div>

        <TicketWrapperCard classnames="p-5 flex flex-col justify-between gap-y-3">
          <span>2024. 07. 12 (금요일) 오후 3 : 00 시</span>
          <span>자유석 총 N매</span>
        </TicketWrapperCard>

        <TicketWrapperCard classnames="p-5 flex flex-col justify-between gap-y-3">
          <p className="font-bold">결제 완료 금액</p>
          <span className="text-2xl font-bold">{`${DUMMY_STAGE_DETAIL.cost.toLocaleString('ko-kr')}원`}</span>
        </TicketWrapperCard>

        <TicketWrapperCard classnames="p-5 flex flex-col justify-between gap-y-3">
          <p className="font-bold">결제 수단</p>
          <div className="flex flex-col gap-y-3">
            <span>신용카드 (일시불)</span>
            <span>****-****-****-1234</span>
          </div>
        </TicketWrapperCard>

        <button
          type="button"
          onClick={handleCheckTicket}
          className="py-5 bg-primary text-2xl rounded-xl px-3"
        >
          예매 내역 확인
        </button>
      </div>
    </div>
  )
}

export default TicketBookSuccessPage
