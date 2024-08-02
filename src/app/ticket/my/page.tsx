'use client'

import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'

import { DUMMY_RESERVED_STAGE } from '@/constants/ticket/index.ts'
import TicketWrapperCard from '@/features/ticket/card/index.tsx'

interface StageType {
  rNum: string
  title: string
  image: string | StaticImageData
  reservedDate: string
  location: string
  stageDate: string
  status: string
  cost: number
}

function UserTicketListPage() {
  const router = useRouter()
  const clickedCancel = () => {}

  const clickedMobile = (stage: StageType) => {
    router.push(`/ticket/my/${stage.rNum}`)
  }

  const clickedTalk = () => {}

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
      {DUMMY_RESERVED_STAGE.map((stage) => (
        <TicketWrapperCard
          key={stage.rNum}
          classnames="p-5 flex flex-col gap-y-4"
        >
          <h3 className="px-3 font-bold text-xl">{stage.title}</h3>
          <div className="px-6 flex gap-x-3">
            <Image
              src={stage.image}
              alt={stage.title}
              width={130}
              height={180}
              className="rounded-xl"
            />
            <div className="flex-1 flex flex-col gap-y-2 text-sm">
              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">
                  예매번호
                </span>
                <span className="flex-1 text-disabled">{stage.rNum}</span>
              </p>

              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">예매일</span>
                <span className="flex-1 text-disabled">
                  {new Date(stage.reservedDate).toLocaleDateString('ko-kr')}
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
                  {`${new Date(stage.stageDate).toLocaleDateString('ko-kr')} ${parseDate(stage.stageDate)}`}
                </span>
              </p>
              <p className="flex gap-x-3">
                <span className="flex-1 font-bold text-[#A6A6B1]">상태</span>
                <span className="flex-1 text-disabled">
                  {stage.status === 'Ready' ? '예매 완료' : '종료됨'}
                </span>
              </p>
            </div>
          </div>

          <div className="px-6 flex justify-between items-center text-sm gap-x-5">
            <button
              type="button"
              onClick={clickedCancel}
              className="flex-1 py-2 flex items-center justify-center border border-warning text-warning rounded-xl"
            >
              예매취소
            </button>
            <button
              type="button"
              onClick={() => clickedMobile(stage)}
              className="flex-1 py-2 flex items-center justify-center border  border-primary rounded-xl"
            >
              모바일 티켓
            </button>
            <button
              type="button"
              onClick={clickedTalk}
              className="flex-1 py-2 flex items-center justify-center border  border-primary rounded-xl"
            >
              스콘톡
            </button>
          </div>
        </TicketWrapperCard>
      ))}
    </div>
  )
}

export default UserTicketListPage
