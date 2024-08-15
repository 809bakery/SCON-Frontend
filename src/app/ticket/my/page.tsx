'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// eslint-disable-next-line import/no-extraneous-dependencies
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import TicketWrapperCard from '@/features/ticket/card/index.tsx'

interface StageType {
  title: string
  image: string
  time: string
  location: string
  cost: number
  token: string
  nickname: string
  subEventId: number
  createdAt: string
}

function UserTicketListPage() {
  const router = useRouter()

  const { data: reserveStageList } = useQuery({
    queryKey: ['reserve-stage-list'],
    queryFn: async () => {
      const response = await privateApi.get('/api/reserve')
      // eslint-disable-next-line no-console
      return response.data
    },
  })

  const queryClient = useQueryClient()
  const { mutate: cancelReserve } = useMutation({
    mutationFn: async (subEventId: number) => {
      const response = await privateApi.delete(
        `/api/reserve/cancel/${subEventId}`,
      )
      return response.data
    },

    onSuccess: () => {
      toast.success('예매가 취소되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['reserve-stage-list'] })
    },

    onError: () => {
      toast.error('예매 취소에 실패했습니다.')
    },
  })

  const clickedMobile = (stage: StageType) => {
    const now = new Date()
    let diff = new Date(stage.time).getTime() - now.getTime()
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (diff < 0) {
      toast.error('이미 공연이 종료되었습니다.')
      return
    }
    router.push(`/ticket/my/${stage.subEventId}`)
  }

  const compareDate = (stage: StageType) => {
    const now = new Date()
    let diff = new Date(stage.time).getTime() - now.getTime()
    diff = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return diff < 0
  }

  const parseDate = (time: string) => {
    const hour =
      new Date(time).getHours() < 12
        ? new Date(time).getHours()
        : new Date(time).getHours() - 12
    const min = new Date(time).getMinutes()

    const meridiem = new Date(time).getHours() < 12 ? '오전' : '오후'

    return `${meridiem} ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
  }
  return (
    <div className="pt-5 pb-[12.5rem] px-7 w-full flex flex-col gap-y-4">
      {reserveStageList?.map((stage: StageType) => (
        <TicketWrapperCard
          key={stage.token}
          classnames={`p-5 flex flex-col gap-y-4 ${compareDate(stage) && 'bg-lightgray-1'}`}
        >
          <h3 className="px-3 font-bold text-xl">{stage.title}</h3>
          <div className="px-6 flex gap-x-3">
            <Image
              src={stage.image}
              alt={stage.title}
              width={132}
              height={188}
              className="w-[8.25rem] h-[11.75rem] rounded-xl object-cover"
            />
            <div className="flex-1 max-w-[20rem] flex flex-col gap-y-2 text-sm">
              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">
                  예매번호
                </span>
                <span className="flex-1 text-disabled truncate">
                  {stage?.token}
                </span>
              </p>

              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">예매일</span>
                <span className="flex-1 text-disabled">
                  {new Date(stage.createdAt).toLocaleDateString('ko-kr')}
                </span>
              </p>
              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">장소</span>
                <span className="flex-1 text-disabled">{stage.location}</span>
              </p>
              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">
                  관람일시
                </span>
                <span className="flex-1 text-disabled">
                  {`${new Date(stage.time).toLocaleDateString('ko-kr')} ${parseDate(stage.time)}`}
                </span>
              </p>
              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">상태</span>
                <span className="flex-1 text-disabled">
                  {compareDate(stage) ? '종료됨' : '예매 완료'}
                </span>
              </p>
            </div>
          </div>

          <div className="px-6 flex justify-between items-center text-sm gap-x-5">
            <button
              type="button"
              onClick={() => cancelReserve(stage.subEventId)}
              className={`flex-1 py-2 flex items-center justify-center border border-warning text-warning rounded-xl ${compareDate(stage) && '!border-border !text-disabled'}`}
            >
              예매취소
            </button>
            <button
              type="button"
              onClick={() => clickedMobile(stage)}
              className={`flex-1 py-2 flex items-center justify-center border  border-primary rounded-xl ${compareDate(stage) && '!border-border !text-disabled'}`}
            >
              모바일 티켓
            </button>
            <button
              type="button"
              className="flex-1 py-2 flex items-center justify-center border  border-primary rounded-xl"
            >
              스콘톡
            </button>
          </div>
        </TicketWrapperCard>
      ))}
      <p className="text-sm text-disabled flex items-center justify-center">
        종료된 스테이지의 스콘톡은 ‘스콘톡’ 카테고리에서 확인할 수 있습니다.
      </p>
    </div>
  )
}

export default UserTicketListPage
