'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { passwordRegExp } from '@/constants/regex/index.ts'
import Checked from '@/static/svg/checked-icon.svg'
import HideSVG from '@/static/svg/eye-close.svg'
import ShowSVG from '@/static/svg/eye-open.svg'
import Required from '@/static/svg/required-star.svg'

export default function PasswordResetNew() {
  const router = useRouter()

  const [prevPassword, setPrevPassword] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [isPrevPasswordVisible, setIsPrevPasswordVisible] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false)
  const [passwordErrorMessages, setPasswordErrorMessages] = useState<string>('')
  const [passwordConfirmErrorMessages, setPasswordConfirmErrorMessages] =
    useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] =
    useState<boolean>(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'prev-password') {
      setPrevPassword(value)
    } else if (name === 'password') {
      setPassword(value)
      if (!passwordRegExp.test(value) && value.length > 0) {
        setPasswordErrorMessages(
          '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
        )
        setIsPasswordValid(false)
        setIsPasswordConfirmValid(false)
      } else if (passwordRegExp.test(value) && value.length > 0) {
        setPasswordErrorMessages('')
        setIsPasswordValid(true)
        if (passwordConfirm.length > 0 && value === passwordConfirm) {
          setPasswordConfirmErrorMessages('')
          setIsPasswordConfirmValid(true)
        }
      } else if (value.length === 0) {
        setPasswordErrorMessages('')
        setIsPasswordValid(false)
        setIsPasswordConfirmValid(false)
      }
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value)
      if (value.length === 0) {
        setPasswordConfirmErrorMessages('')
        setIsPasswordConfirmValid(false)
      } else if (password !== value) {
        setPasswordConfirmErrorMessages(
          '입력하신 비밀번호와 일치하지 않습니다.',
        )
        setIsPasswordConfirmValid(false)
      } else if (password === value && isPasswordValid) {
        setPasswordConfirmErrorMessages('')
        setIsPasswordConfirmValid(true)
      } else {
        setPasswordConfirmErrorMessages('')
        setIsPasswordConfirmValid(false)
      }
    }
  }

  const isDisabled =
    !isPasswordValid || !isPasswordConfirmValid || !prevPassword

  return (
    <div className="w-full px-7 pt-[11rem] flex flex-col pb-[13.5rem]">
      <div className="flex flex-col gap-10 mb-[11.25rem]">
        <h2 className="text-[2rem] font-medium">
          새로운 비밀번호를 설정해주세요.
        </h2>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="password"
            className="font-normal text-2xl flex space-x-1"
          >
            <span>현재 비밀번호</span>
            <Required />
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full border-2 border-border  rounded-xl focus-within:border-primary px-4  py-6">
              <input
                id="prev-password"
                name="prev-password"
                type={isPrevPasswordVisible ? 'text' : 'password'}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                onChange={onChange}
                value={prevPassword}
                className="outline-none rounded-xl text-2xl pl-4 pr-8 w-full"
              />
              <div
                role="presentation"
                className="cursor-pointer"
                onClick={() => setIsPrevPasswordVisible((prev) => !prev)}
              >
                {isPrevPasswordVisible ? (
                  <HideSVG className="w-7 h-7" />
                ) : (
                  <ShowSVG className="w-7 h-7" />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 비밀번호 입력 */}
        <div className="flex flex-col gap-4">
          <label
            htmlFor="password"
            className="font-normal text-2xl flex space-x-1"
          >
            <span>새로운 비밀번호</span>
            <Required />
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center w-full border-2 border-border  rounded-xl focus-within:border-primary px-4  py-6">
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                autoComplete="off"
                placeholder="비밀번호를 입력해주세요."
                onChange={onChange}
                value={password}
                className="outline-none rounded-xl text-2xl pl-4 pr-8 w-full"
              />
              {isPasswordValid && (
                <div className="min-w-min mr-6">
                  <Checked className="w-7 h-7" />
                </div>
              )}
              <div
                role="presentation"
                className="cursor-pointer"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? (
                  <HideSVG className="w-7 h-7" />
                ) : (
                  <ShowSVG className="w-7 h-7" />
                )}
              </div>
            </div>
            {passwordErrorMessages && (
              <p className="whitespace-pre-wrap text-warning pl-4">
                {passwordErrorMessages}
              </p>
            )}
            <div className="flex items-center w-full border-2 border-border  rounded-xl focus-within:border-primary px-4  py-6">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type={isPasswordConfirmVisible ? 'text' : 'password'}
                autoComplete="off"
                placeholder="비밀번호를 한 번 더 입력해주세요."
                onChange={onChange}
                value={passwordConfirm}
                className="outline-none rounded-xl text-2xl pl-4 pr-8 w-full"
              />
              {isPasswordValid && isPasswordConfirmValid && (
                <div className="min-w-min mr-6">
                  <Checked className="w-7 h-7" />
                </div>
              )}
              <div
                role="presentation"
                className="cursor-pointer"
                onClick={() => setIsPasswordConfirmVisible((prev) => !prev)}
              >
                {isPasswordConfirmVisible ? (
                  <HideSVG className="w-7 h-7" />
                ) : (
                  <ShowSVG className="w-7 h-7" />
                )}
              </div>
            </div>
            {passwordConfirmErrorMessages && (
              <p className="whitespace-pre-wrap text-warning pl-4">
                {passwordConfirmErrorMessages}
              </p>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`w-full text-center font-normal text-2xl py-7 rounded-xl mt-8 ${isDisabled ? 'btn-disabled' : 'bg-primary'}`}
        disabled={isDisabled}
        onClick={() => router.push('/mypage')}
      >
        <span>저장</span>
      </button>
    </div>
  )
}
