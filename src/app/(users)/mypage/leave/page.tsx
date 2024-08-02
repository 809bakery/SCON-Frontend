'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import RememberOnSVG from '@/static/svg/square-fill-icon.svg'
import RememberOffSVG from '@/static/svg/square-unfill-icon.svg'

export default function Leave() {
  const router = useRouter()
  const [isAgreed, setIsAgreed] = useState<boolean>(false)

  const handleDeleteUser = () => {
    localStorage.clear()
    router.push('/main')
  }

  return (
    <div className="px-[3.25rem] pt-[7.5rem]">
      <div className="flex flex-col gap-[3.75rem] mb-[11.25rem]">
        <h2 className="text-4xl font-bold leading-[3.4375rem]">
          회원 탈퇴 전,
          <br />꼭 확인해주세요!
        </h2>
        <div className="w-full">
          <li className="py-4 text-base font-medium leading-6 text-disabled">
            가입된 오븐에서 다 탈퇴됩니다
          </li>
          <li className="py-4 text-base font-medium leading-6 text-disabled">
            너없으면스콘망해가지마세요
          </li>
        </div>
      </div>
      <div className="mt-[9.5rem] flex flex-col gap-5">
        <div
          role="presentation"
          className="flex items-center cursor-pointer"
          onClick={() => setIsAgreed((prev) => !prev)}
        >
          {isAgreed ? (
            <RememberOnSVG className="w-6 h-6" />
          ) : (
            <RememberOffSVG className="w-6 h-6" />
          )}
          <span className="ml-2 text-xl leading-7 font-medium text-disabled">
            위 모든 사항을 확인했으며, 동의합니다
          </span>
        </div>
        <button
          type="button"
          className={`w-full text-center font-normal text-2xl py-7 rounded-xl mt-8 ${isAgreed ? 'bg-primary' : 'btn-disabled'}`}
          disabled={!isAgreed}
          onClick={handleDeleteUser}
        >
          <span>탈퇴하기</span>
        </button>
      </div>
    </div>
  )
}
