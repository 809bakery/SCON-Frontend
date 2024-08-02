/* eslint-disable no-nested-ternary */

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Timer from '@/components/timer.tsx'
import { emailRegExp } from '@/constants/regex/index.ts'
import Checked from '@/static/svg/checked-icon.svg'
import Required from '@/static/svg/required-star.svg'

export default function PasswordReset() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [emailConfirm, setEmailConfirm] = useState<string>('')
  const [isEmailButtonClicked, setIsEmailButtonClicked] = useState(false)
  const [isEmailConfirmSuccess, setIsEmailConfirmSuccess] = useState(false)
  const [emailErrorMessages, setEmailErrorMessages] = useState<string>('')
  const [emailConfirmErrorMessages, setEmailConfirmErrorMessages] =
    useState<string>('')
  const [emailConfirmSuccessMessage, setEmailConfirmSuccessMessage] =
    useState<boolean>(false)
  const [timerKey, setTimerKey] = useState(0)

  const handleButtonClick = () => {
    setIsEmailButtonClicked(true)
    setEmailConfirmErrorMessages(
      `메일 전송이 완료되었습니다.\n메일 발송이 되지 않을시 재전송 버튼을 눌러주세요.`,
    )
    setTimerKey((prevKey) => prevKey + 1)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
      // 이메일 형식이 아닐 경우
      if (!emailRegExp.test(value) && value.length > 0) {
        setEmailErrorMessages('이메일 형식이 올바르지 않습니다.')
        setIsEmailValid(false)
      } else if (emailRegExp.test(value) && value.length > 0) {
        setEmailErrorMessages('')
        setIsEmailValid(true)
      } else if (value.length === 0) {
        setEmailErrorMessages('')
        setIsEmailValid(false)
      }
    } else if (name === 'emailConfirm') {
      setEmailConfirm(value)
      if (value.length === 0) {
        setEmailConfirmErrorMessages('')
      } else if (value !== 'ABCDE') {
        setEmailConfirmErrorMessages('인증 코드를 다시 확인해주세요.')
      } else {
        setEmailConfirmErrorMessages('')
        setEmailConfirmSuccessMessage(true)
        setIsEmailConfirmSuccess(true)
      }
    }
  }

  const isDisabled = !isEmailConfirmSuccess || !isEmailValid

  return (
    <div className="w-full px-7 pt-[11rem] flex flex-col pb-[13.5rem]">
      <div className="flex flex-col gap-10 mb-[11.25rem]">
        <h2 className="text-[2rem] font-medium">
          비밀번호 재설정을 위해
          <br />
          현재 사용하시는 ID를 입력해주세요.
        </h2>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="email"
            className="font-normal text-2xl flex space-x-1"
          >
            <span>이메일</span>
            <Required />
          </label>
          <div className="flex flex-col gap-3">
            <div className="border-2 border-border  rounded-xl focus-within:border-primary flex justify-between px-4  py-6">
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="off"
                disabled={isEmailConfirmSuccess}
                placeholder="이메일을 입력해주세요."
                onChange={onChange}
                value={email}
                className="w-full px-4 text-2xl rounded-xl outline-none"
              />
              {isEmailConfirmSuccess && (
                <div className="min-w-min">
                  <Checked className="w-7 h-7" />
                </div>
              )}
            </div>
            {emailErrorMessages && (
              <p className="whitespace-pre-wrap text-warning pl-4">
                {emailErrorMessages}
              </p>
            )}
          </div>
        </div>
        {/* 이메일 인증 */}
        <div className="flex flex-col gap-4">
          <label
            htmlFor="emailConfirm"
            className="font-normal text-2xl flex space-x-1"
          >
            <span>이메일 인증코드</span>
            <Required />
          </label>
          <div className="flex flex-col gap-3">
            <div className="flex space-x-4 w-full">
              <div className="flex items-center w-full border-2 border-border  rounded-xl focus-within:border-primary px-4  py-6">
                <input
                  id="emailConfirm"
                  type="email"
                  name="emailConfirm"
                  autoComplete="off"
                  disabled={!isEmailButtonClicked || isEmailConfirmSuccess}
                  placeholder="인증코드를 입력해주세요."
                  onChange={onChange}
                  value={emailConfirm}
                  className="outline-none bg-transparent rounded-xl text-2xl pl-4 pr-8 w-full"
                />
                {isEmailButtonClicked && !isEmailConfirmSuccess && (
                  <Timer key={timerKey} />
                )}
                {isEmailConfirmSuccess && (
                  <div className="min-w-min">
                    <Checked className="w-7 h-7" />
                  </div>
                )}
              </div>
              <button
                type="button"
                className={`cursor-pointer text-center px-4  rounded-xl font-medium text-xl min-w-max ${
                  isEmailConfirmSuccess || !isEmailValid
                    ? 'btn-disabled'
                    : 'bg-primary'
                }`}
                onClick={handleButtonClick}
                disabled={isEmailConfirmSuccess || !isEmailValid}
              >
                <span>
                  {isEmailButtonClicked
                    ? isEmailConfirmSuccess
                      ? '인증완료'
                      : '재전송'
                    : '인증요청'}
                </span>
              </button>
            </div>
            {emailConfirmErrorMessages && (
              <p className="whitespace-pre-wrap text-warning pl-4">
                {emailConfirmErrorMessages}
              </p>
            )}
            {emailConfirmSuccessMessage && (
              <p className="whitespace-pre-wrap text-success pl-4">
                인증이 완료되었습니다.
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`w-full text-center font-normal text-2xl py-7 rounded-xl mt-8 ${isDisabled ? 'btn-disabled' : 'bg-primary'}`}
        disabled={isDisabled}
        onClick={() => router.push('/login/password_reset/new')}
      >
        <span>다음 단계</span>
      </button>
    </div>
  )
}
