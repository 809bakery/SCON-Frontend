'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import TicketWrapperCard from '@/features/ticket/card/index.tsx'

import useTicketPurchaseStore from '@/store/PurchaseTicketStore.ts'

function TicketBookSuccessPage() {
  const router = useRouter()
  const params = useParams()

  const headCountState = useTicketPurchaseStore((state) => state.headCount)
  // const subEventId = useTicketPurchaseStore((state) => state.subEventId)

  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', params.id],
    queryFn: async () => {
      let response
      if (loginUser) {
        response = await privateApi.get(`/api/event/${params.id}`)
      } else {
        response = await publicApi.get(`/api/event/${params.id}`)
      }
      return response.data
    },
  })

  const { data: loginUser } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  const handleCheckTicket = () => {
    router.push('/ticket/my')
  }
  return (
    <div className="w-full pb-[12.5rem]">
      <div className="min-h-[15rem] relative overflow-hidden">
        <Image
          src={stageDetail?.eventResponseDto?.eventImage}
          alt="background stage poster"
          width={600}
          height={329}
          className="opacity-30 absolute top-0"
        />

        <div className="w-full px-7 py-9 gap-y-2 flex items-center flex-col">
          <div className="py-6 text-4xl font-bold">예매 완료</div>

          <div className="p-3 flex flex-col items-center">
            <span className="font-bold">{loginUser?.nickname} 님</span>
            <span>감사합니다.</span>
          </div>
        </div>
      </div>

      {/* title */}
      <div className="flex flex-col gap-y-7 py-3 px-7">
        <div className="p-3 text-2xl font-bold">{`${stageDetail?.eventResponseDto?.title} ${stageDetail?.eventResponseDto?.subTitle && `- ${stageDetail?.eventResponseDto.subTitle}`}`}</div>

        <TicketWrapperCard classnames="p-5 flex flex-col justify-between gap-y-3">
          <span>2024. 07. 12 (금요일) 오후 3 : 00 시</span>
          <span>자유석 총 {headCountState}매</span>
        </TicketWrapperCard>

        <TicketWrapperCard classnames="p-5 flex flex-col justify-between gap-y-3">
          <p className="font-bold">결제 완료 금액</p>
          <span className="text-2xl font-bold">{`${(stageDetail?.eventResponseDto.cost || 0 * headCountState + 500).toLocaleString('ko-kr')}원`}</span>
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
