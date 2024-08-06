'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { DUMMY_SCONTALK_LIST } from '@/constants/dummy.ts'

const SconTalkList = [...DUMMY_SCONTALK_LIST]

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', options)
    .format(date)
    .replace('.', '. ')
    .replace('일', '')
    .replace(',', '')
    .trim()
}
const updatedTalkList = SconTalkList.map((talk) => {
  const now = new Date()
  const talkTime: Date = new Date(talk.time)
  const timeDiff = (talkTime.getTime() - now.getTime()) / 1000 / 60 / 60

  let state = ''
  if (timeDiff >= -1 && timeDiff <= 1) {
    state = 'process'
  } else if (timeDiff > 1) {
    state = 'scheduled'
  } else if (timeDiff < -1) {
    state = 'done'
  }

  return { ...talk, state, timeDiff, talkTime }
})

export default function SconTalkPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col divide-y divide-border border-b border-border">
      {updatedTalkList.map((talk) => (
        <div
          role="presentation"
          key={talk.chatRoomId}
          className="flex px-10 py-5 cursor-pointer hover:bg-lightgray-1"
          onClick={() => router.push(`/scontalk/${talk.chatRoomId}`)}
        >
          <div className="flex items-center space-x-8">
            <div className="w-20 h-20 bg-[#F7F7F7] rounded-full">
              <Image
                src={talk.image}
                width={80}
                height={80}
                alt="profile"
                className="w-20 h-20 object-cover object-center rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2 p-2">
              <div
                // eslint-disable-next-line no-nested-ternary
                className={`text-sm leading-[1.375rem] font-bold ${talk.state === 'process' ? 'text-primary' : talk.state === 'scheduled' ? 'text-success' : 'text-disabled'} `}
              >
                {talk.state === 'process' && '스콘톡 진행중 '}
                {talk.state === 'scheduled' && '스콘톡 오픈 예정'}
                {talk.state === 'done' && '스콘톡 종료'}
              </div>
              <div className="text-xl leading-7 font-medium">{talk.title}</div>
              <div className="font-medium text-base leading-6 text-disabled">
                {formatDate(talk.time)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
