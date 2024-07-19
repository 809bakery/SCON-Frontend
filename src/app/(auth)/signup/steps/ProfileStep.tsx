/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */

'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Checked from '@/static/svg/checked-icon.svg'
import DefaultProfileSVG from '@/static/svg/default-profile.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import Step2SVG from '@/static/svg/progress/step2.svg'
import Required from '@/static/svg/required-star.svg'
import UploadSVG from '@/static/svg/upload-icon.svg'

// 닉네임 정규표현식(2~8자 한글, 영문, 숫자만 허용)
const nicknameRegExp = /^[a-zA-Z0-9가-힣]{2,8}$/

export default function ProfileStep() {
  const router = useRouter()
  const [nickname, setNickname] = useState<string>('')
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<
    string | null
  >(null)
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false)
  const [isNicknameCheckSuccess, setIsNicknameCheckSuccess] =
    useState<boolean>(false)
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

  // TODO: 닉네임 중복 체크 API 연동
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setNickname(value)
    if (nicknameRegExp.test(value)) {
      setNicknameErrorMessage(null)
      setIsNicknameValid(true)
      setIsNicknameCheckSuccess(true)
    } else if (value.length === 0) {
      setNicknameErrorMessage(null)
      setIsNicknameValid(false)
      setIsNicknameCheckSuccess(false)
    } else {
      setNicknameErrorMessage('2~8자의 한글, 영문, 숫자만 입력 가능합니다.')
      setIsNicknameValid(false)
      setIsNicknameCheckSuccess(false)
    }
  }

  const isDisabled = !isNicknameCheckSuccess

  return (
    <div className="h-full px-7 flex flex-col justify-between pt-14 pb-[7.5rem]">
      <div>
        <div className="flex flex-col gap-7">
          <LogoSVG height={60} width={196} />
          <Step2SVG />
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <h2 className="font-medium text-[2rem]">
            프로필 정보를 입력해주세요.
          </h2>
          {imageUrl ? (
            <div className="flex justify-center items-center mt-10 mb-5">
              <div className="relative">
                <label htmlFor="file-input" className="cursor-pointer">
                  <div className="w-40 h-40  rounded-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt="profile"
                      width={160}
                      height={160}
                      layout="fixed"
                    />
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
              <div className="border-2 border-border  rounded-xl focus-within:border-primary flex justify-between px-4  py-6">
                <input
                  id="nickname"
                  type="text"
                  name="nickname"
                  autoComplete="off"
                  placeholder="닉네임을 입력해주세요."
                  onChange={onChange}
                  value={nickname}
                  className="w-full px-4 text-2xl rounded-xl outline-none"
                />
                {isNicknameValid && isNicknameCheckSuccess && (
                  <div className="min-w-min">
                    <Checked className="w-7 h-7" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {nicknameErrorMessage && (
            <p className="whitespace-pre-wrap text-warning pl-4">
              {nicknameErrorMessage}
            </p>
          )}
          {isNicknameCheckSuccess && (
            <p className="whitespace-pre-wrap text-success pl-4">
              사용 가능한 닉네임입니다.
            </p>
          )}
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
