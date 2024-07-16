/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Checked from '@/static/svg/checked-icon.svg'
import DefaultProfileSVG from '@/static/svg/default-profile.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import Step2SVG from '@/static/svg/progress/step2.svg'
import Required from '@/static/svg/required-star.svg'
import UploadSVG from '@/static/svg/upload-icon.svg'

export default function ProfileStep() {
  const router = useRouter()
  const [nickname, setNickname] = useState<string>('')
  const [isNicknameValid] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e

    if (files?.length === 0) {
      return
    }

    const file = files?.[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as Blob)
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }: any = finishedEvent
      setImageUrl(result)
    }
  }

  const isDisabled = false

  return (
    <div className="px-7 flex flex-col justify-start py-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step2SVG />
      </div>
      <div className="mt-16 flex flex-col gap-5">
        <h2 className="font-medium text-[2rem]">프로필 정보를 입력해주세요.</h2>
        {imageUrl ? (
          <div className="flex justify-center items-center mt-10 mb-5">
            <div className="relative">
              <label htmlFor="file-input" className="cursor-pointer">
                <div className="w-40 h-40  rounded-full overflow-hidden">
                  <img src={imageUrl} alt="profile" width="160" height="160" />
                </div>
                <UploadSVG className="absolute bottom-0 right-0" />
              </label>
            </div>
          </div>
        ) : (
          // div의 사이즈는 default-profile.svg의 사이즈에 맞춰서 설정
          <div className="flex justify-center items-center mt-10 mb-5">
            <div className="relative w-40 h-40  rounded-full">
              <label htmlFor="file-input" className="cursor-pointer">
                <DefaultProfileSVG />
                <UploadSVG className="absolute bottom-0 right-0" />
              </label>
            </div>
          </div>
        )}
        <div className="post-form__submit-area">
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="nickname"
            className="font-normal text-2xl flex space-x-1"
          >
            <span>닉네임</span>
            <Required />
          </label>
          <div className="flex flex-col gap-3">
            <div className="border-2 border-gray-300  rounded-xl focus-within:border-primary flex justify-between px-4  py-6">
              <input
                id="nickname"
                type="text"
                name="nickname"
                autoComplete="off"
                placeholder="닉네임을 입력해주세요."
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                className="w-full px-4 text-2xl rounded-xl outline-none"
              />
              {isNicknameValid && (
                <div className="min-w-min">
                  <Checked className="w-7 h-7" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`w-full text-center font-normal text-2xl py-7 rounded-xl mt-8 ${isDisabled ? 'btn-disabled' : 'bg-primary'}`}
        disabled={isDisabled}
        onClick={() => router.push('/signup/more')}
      >
        <span>다음 단계</span>
      </button>
    </div>
  )
}
