'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CardProps {
  title: string
  location: string
  sDate: string
  content: ContentType[]
  posterUrl: string
  // eslint-disable-next-line react/require-default-props
  isEnd?: boolean
}

interface ContentType {
  id: number
  episodeNumber: number
  time: string
}

function Card(props: CardProps) {
  const { title, location, sDate, content, posterUrl, isEnd } = props
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    handleDate()
  })

  const handleDate = () => {
    const startDate = new Date(sDate)
    const startDateFormat = `${startDate.getFullYear()}.${startDate.getMonth() + 1 < 10 ? `0${startDate.getMonth()}` : startDate.getMonth()}.${startDate.getDate() < 10 ? `0${startDate.getDate()}` : startDate.getDate()}`

    const endDate = new Date(content[content.length - 1].time)
    const endDateFormat = `${endDate.getFullYear()}.${endDate.getMonth() + 1 < 10 ? `0${endDate.getMonth()}` : endDate.getMonth()}.${endDate.getDate() < 10 ? `0${endDate.getDate()}` : endDate.getDate()}`

    if (startDateFormat === endDateFormat) {
      setDate(`${startDateFormat}`)
    } else {
      setDate(`${startDateFormat} ~ ${endDateFormat}`)
    }
  }
  return (
    <div className="w-[30%] rounded-xl shrink-0 flex flex-col gap-y-3  cursor-pointer">
      <div className="relative">
        {isEnd && (
          <div className="absolute z-10 w-full bg-[#4C4C4C] bg-opacity-80 h-full rounded-xl flex flex-col items-center justify-center text-white text-xl">
            <p>종료된</p>
            <p>스테이지</p>
          </div>
        )}
        <Image
          src={posterUrl}
          alt="poster"
          width={160}
          height={219}
          className="rounded-xl"
        />
      </div>

      <div className="w-full flex flex-col items-start justify-center gap-y-1">
        <h3 className="w-full font-bold truncate">{title}</h3>
        <p className=" w-full text-xs truncate">{location}</p>
        <p className="w-full text-2xs text-disabled truncate">{date}</p>
      </div>
    </div>
  )
}

export default Card
