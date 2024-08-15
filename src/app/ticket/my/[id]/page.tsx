'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import QRCode from 'react-qr-code'

import { privateApi } from '@/api/config/privateApi.ts'
import Loader from '@/components/loader/index.tsx'
import Timer from '@/components/timer.tsx'
import { DAY_MAP } from '@/constants/stage/info/index.ts'
import FilpSVG from '@/static/svg/ticket/ticket-flip-icon.svg'

const parseDate = (time: string) => {
  const hour =
    new Date(time).getHours() < 12
      ? new Date(time).getHours()
      : new Date(time).getHours() - 12
  const min = new Date(time).getMinutes()

  const meridiem = new Date(time).getHours() < 12 ? '오전' : '오후'

  return `${meridiem} ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
}
function TicketEnterPage() {
  const router = useRouter()
  const param = useParams()
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const { data: stage, isLoading } = useQuery({
    queryKey: ['reserve-stage-detail', param.id],
    queryFn: async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await privateApi.get(`/api/reserve/${param.id}`, config)
      console.log(response)
      return response.data
    },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(false)
    }, 180000)

    return () => {
      clearTimeout(timer)
    }
  }, [isFlipped])

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    )
  return (
    <div className="p-20 flex flex-col gap-y-10">
      <h3 className="flex items-center justify-center font-bold text-2xl">
        {stage?.title}
      </h3>

      <button
        className="w-full relative flex items-center justify-center"
        type="button"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {stage && (
          <Image
            src={stage?.image}
            alt={stage?.title}
            width={440}
            height={600}
            className={`w-full  object-cover !relative rounded-xl transition-all duration-300 cursor-pointer ${isFlipped && 'opacity-0'}`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          />
        )}
        <div
          className={`w-full h-full truncate absolute top-0 p-9 flex flex-col items-center justify-center gap-y-10 border border-border  rounded-xl transition-all duration-300 ${!isFlipped && 'opacity-0'} bg-lightgray-1`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-warning font-bold text-2xl">
              {isFlipped ? <Timer /> : <span>00 : 00</span>}
            </div>
            <span>후에 새로고침됩니다.</span>
          </div>

          {stage && <QRCode value={stage?.token} className="w-64 h-64" />}
          <div className="w-full text-xl flex flex-col items-center justify-center">
            <span className="px-8 w-full truncate">{stage?.token}</span>
            <span>{stage?.nickname}</span>
          </div>
        </div>

        <div className="p-2 z-10 rounded-tl-xl rounded-br-xl bg-[rgba(0,0,0,0.5)] flex items-center justify-center absolute top-0 left-0">
          <FilpSVG className="w-6 h-6" />
        </div>
      </button>

      <div className="flex justify-between items-center gap-x-10">
        <button
          type="button"
          className="flex-1 bg-primary rounded-xl flex items-center justify-center py-3 text-white font-bold"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {isFlipped ? '포스터 확인하기' : '모바일 티켓 확인하기'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex-1 rounded-xl flex items-center justify-center py-3 text-primary font-bold border border-border"
        >
          메인으로 이동하기
        </button>
      </div>

      <div className="flex flex-col gap-y-3 items-center justify-center">
        <h3 className="font-bold text-2xl">{`${stage && new Date(stage.time).toLocaleDateString('ko-kr')} (${stage && DAY_MAP[new Date(stage.time).getDay()]}요일) ${stage && parseDate(stage.time)}`}</h3>
        <p className="flex items-center justify-center text-[#A6A6B1]">
          {stage?.location}
        </p>
        <p className="flex items-center justify-center text-disabled">{`${stage?.token.slice(0, 5)}... | ${stage?.nickname}`}</p>
      </div>
    </div>
  )
}

export default TicketEnterPage
