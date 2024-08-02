'use client'

import { useState } from 'react'

import RadioButtonActiveSVG from '@/static/svg/radio-button-active-icon.svg'
import RadioButtonInactiveSVG from '@/static/svg/radio-button-inactive-icon.svg'

export default function Info() {
  const [verified, setVerified] = useState(false)

  return (
    <div className="w-full px-10 py-12">
      <div className="w-full flex flex-col gap-8">
        <h1 className="text-2xl font-bold leading-8">기본 회원 정보</h1>
        <div className="w-full flex flex-col gap-[.625rem] items-start text-xl text-7 font-medium">
          <div className="flex space-x-5 items-center py-[.625rem]">
            <span className="w-[8.5rem] text-disabled">아이디 (이메일)</span>
            <span>809bakery@gmail.com</span>
          </div>
          <div className="flex space-x-5 items-center py-[.625rem]">
            <span className="w-[8.5rem] text-disabled">이름</span>
            <span>{verified ? '이민정' : '-'}</span>
          </div>
          <div className="flex space-x-5 items-center py-[.625rem]">
            <span className="w-[8.5rem] text-disabled">휴대폰 번호</span>
            <span>{verified ? '010-4299-8002' : '-'}</span>
          </div>
          <div className="flex space-x-5 items-center py-[.625rem]">
            <span className="w-[8.5rem] text-disabled">생년월일</span>
            <span>{verified ? '1998-03-04' : '-'}</span>
          </div>
          <div className="flex space-x-5 items-center py-[.625rem]">
            <span className="w-[8.5rem] text-disabled">성별</span>
            <span>
              {verified ? (
                <div className="flex space-x-5 items-center py-[.625rem]">
                  <div className="flex space-x-3">
                    <RadioButtonInactiveSVG className="w-7 h-7" />
                    <span>남성</span>
                  </div>
                  <div className="flex space-x-3">
                    <RadioButtonActiveSVG className="w-7 h-7" />
                    <span>여성</span>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-5 items-center py-[.625rem]">
                  <div className="flex space-x-3">
                    <RadioButtonInactiveSVG className="w-7 h-7" />
                    <span>남성</span>
                  </div>
                  <div className="flex space-x-3">
                    <RadioButtonInactiveSVG className="w-7 h-7" />
                    <span>여성</span>
                  </div>
                </div>
              )}
            </span>
          </div>
          <div className="flex space-x-5 items-start py-[.625rem]">
            <span className="min-w-[8.5rem] text-disabled">본인인증</span>
            <div className="w-full flex flex-col gap-[.625rem]">
              <span>
                {verified ? (
                  '2024-08-01 본인인증이 완료되었습니다.'
                ) : (
                  <button
                    type="button"
                    className="text-white px-9 py-2 text-sm font-bold leading-[1.375rem] bg-primary rounded-xl"
                    onClick={() => setVerified(true)}
                  >
                    휴대폰 본인인증
                  </button>
                )}
              </span>
              <span className="text-base font-medium lead-6 text-disabled">
                티켓 예매 서비스 이용을 위해 본인인증 절차가 필요합니다.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
