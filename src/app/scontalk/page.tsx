'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { DUMMY_SCONTALK_LIST } from '@/constants/dummy.ts'
import calculateTimeDifferenceInHours from '@/utils/date/calculateTimeDifferenceInHours.ts'
import formatDate from '@/utils/date/formatDate.ts'

const SconTalkList = [...DUMMY_SCONTALK_LIST]

/**
 * 주어진 스콘톡의 시간과 현재 시간을 비교하여 스콘톡의 상태를 결정합니다.
 *
 * @param {Date} talkTime - 스콘톡의 예정된 시간입니다.
 * @param {Date} now - 현재 시간입니다.
 * @returns {string} 스콘톡의 상태를 나타내는 문자열을 반환합니다.
 * - 'process': 스콘톡이 진행 중임을 나타냅니다.
 * - 'scheduled': 스콘톡이 오픈 예정임을 나타냅니다.
 * - 'done': 스콘톡이 종료됨을 나타냅니다.
 */
function determineTalkState(talkTime: Date, now: Date): string {
  const timeDiff = (talkTime.getTime() - now.getTime()) / 1000 / 60 / 60

  if (timeDiff >= -1 && timeDiff <= 1) return 'process'
  if (timeDiff > 1) return 'scheduled'
  return 'done'
}

const updatedTalkList = SconTalkList.map((talk) => {
  const now = new Date()
  const talkTime: Date = new Date(talk.time)
  const timeDiff = calculateTimeDifferenceInHours(talkTime, now)
  const state = determineTalkState(talkTime, now)

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
            <div className="w-20 h-20 bg-[#F7F7F7] rounded-full overflow-hidden">
              <Image
                src={talk.image}
                width={80}
                height={80}
                alt="profile"
                className="w-20 h-20 object-cover object-center"
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
