'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import TicketCalendar from '@/features/ticket/calendar/index.tsx'
import TicketPurchase from '@/features/ticket/purchase/index.tsx'

function TicketBookPage() {
  const params = useParams()
  const [isCalendar, setIsCalendar] = useState<number | undefined>(undefined)

  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', params.id],
    queryFn: async () => {
      let response
      if (loginUser) {
        response = await privateApi.get(`/api/event/${params.id}`)
      } else {
        response = await publicApi.get(`/api/event/${params.id}`)
      }
      // eslint-disable-next-line no-console
      console.log(response.data)
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
  return (
    <div className="w-full pb-[12.5rem]">
      <div className="min-h-[15rem] relative overflow-hidden">
        <Image
          src={stageDetail?.eventResponseDto?.eventImage}
          alt="background stage poster"
          width={600}
          height={329}
          objectFit="cover"
          className="opacity-30 absolute top-0"
        />

        <div className="w-full px-7 py-9 gap-y-2 flex flex-col">
          <div className="p-3 text-2xl font-bold">{`${stageDetail?.eventResponseDto?.title} ${stageDetail?.eventResponseDto?.subTitle && `- ${stageDetail?.eventResponseDto?.subTitle}`}`}</div>

          <div className="p-3 flex flex-col">
            <span>{stageDetail?.eventResponseDto?.location}</span>
            <span>
              {`${new Date(
                stageDetail?.eventResponseDto?.content[0].time,
              ).toLocaleDateString('ko-kr')} - ${new Date(
                stageDetail?.eventResponseDto?.content[
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  stageDetail?.eventResponseDto?.content.length - 1
                ].time,
              ).toLocaleDateString('ko-kr')}`}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-7 pt-3">
        {isCalendar ? (
          <TicketPurchase
            id={Number(params.id)}
            setIsCalendar={setIsCalendar}
          />
        ) : (
          <TicketCalendar setIsCalendar={setIsCalendar} />
        )}
      </div>
    </div>
  )
}

export default TicketBookPage
