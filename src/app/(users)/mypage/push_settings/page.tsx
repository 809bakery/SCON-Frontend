'use client'

import { useState } from 'react'

import IndicatorSVG from '@/static/svg/indicator-icon.svg'

export default function PushSettings() {
  const [isPushOn, setIsPushOn] = useState<boolean>(false)

  return (
    <>
      <div className="flex flex-col divide-y divide-solid">
        <div className="px-12 py-6 flex justify-between">
          <span className="text-xl font-bold leading-7">알림 수신</span>
          <div
            role="presentation"
            className={`flex h-[2.5rem] border border-border rounded-[1.25rem] px-1 items-center cursor-pointer ${isPushOn ? 'bg-primary' : ''}`}
            onClick={() => setIsPushOn((prev) => !prev)}
          >
            <div className="w-16 h-8">
              <IndicatorSVG
                fill={isPushOn ? '#FFFFFF' : '#E5E5ED'}
                className={`w-8 h-8 rounded-full bg-white transition-all duration-300 ease-in-out ${isPushOn ? 'translate-x-full' : 'translate-x-0'}`}
              />
            </div>
          </div>
        </div>
        <div className="px-12 py-6 flex flex-col">
          <span className="text-xl font-bold leading-7">알림 내용</span>
        </div>
      </div>
      <div className="w-full border-t border-b border-lightgray-1 divide-y divide-lightgray-1">
        <li className="px-[3.75rem] py-[.625rem] text-base font-medium leading-6 text-disabled">
          예매한 스테이지 시작 1시간 전 알림
        </li>
        <li className="px-[3.75rem] py-[.625rem] text-base font-medium leading-6 text-disabled">
          팔로우한 오븐의 커뮤니티 새 글
        </li>
      </div>
    </>
  )
}
