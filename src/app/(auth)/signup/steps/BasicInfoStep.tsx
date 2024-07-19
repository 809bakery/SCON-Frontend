/* eslint-disable no-nested-ternary */

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Timer from '@/components/timer.tsx'
import Checked from '@/static/svg/checked-icon.svg'
import HideSVG from '@/static/svg/hide-icon.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import Step1SVG from '@/static/svg/progress/step1.svg'
import Required from '@/static/svg/required-star.svg'
import ShowSVG from '@/static/svg/show-icon.svg'
import UnChecked from '@/static/svg/unchecked-icon.svg'

// 이메일 정규표현식
const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 비밀번호 정규표현식(8자 이상, 영문, 숫자, 특수문자 허용)
const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/

export default function BasicInfoStep() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false)
  const [emailConfirm, setEmailConfirm] = useState<string>('')
  const [isEmailButtonClicked, setIsEmailButtonClicked] = useState(false)
  const [isEmailConfirmSuccess, setIsEmailConfirmSuccess] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const [emailErrorMessages, setEmailErrorMessages] = useState<string>('')
  const [emailConfirmErrorMessages, setEmailConfirmErrorMessages] =
    useState<string>('')
  const [emailConfirmSuccessMessage, setEmailConfirmSuccessMessage] =
    useState<boolean>(false)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false)
  const [passwordErrorMessages, setPasswordErrorMessages] = useState<string>('')
  const [passwordConfirmErrorMessages, setPasswordConfirmErrorMessages] =
    useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] =
    useState<boolean>(false)

  const [termsOfService, setTermsOfService] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ])

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
    } else if (name === 'password') {
      setPassword(value)
      if (!passwordRegExp.test(value) && value.length > 0) {
        setPasswordErrorMessages(
          '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
        )
        setIsPasswordValid(false)
      } else if (passwordRegExp.test(value) && value.length > 0) {
        setPasswordErrorMessages('')
        setIsPasswordValid(true)
      } else if (value.length === 0) {
        setPasswordErrorMessages('')
        setIsPasswordValid(false)
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

  const handleTermsOfService = (type: string) => {
    if (type === 'all') {
      //  termsOfService의 첫 요소가 true일 경우 모두 false로 변경
      //  termsOfService의 첫 요소가 false일 경우 모두 true로 변경
      setTermsOfService((prev) =>
        prev[0]
          ? [false, false, false, false, false]
          : [true, true, true, true, true],
      )
    } else if (type === 'term1') {
      setTermsOfService((prev) => [prev[0], !prev[1], ...prev.slice(2)])
    } else if (type === 'term2') {
      setTermsOfService((prev) => [
        ...prev.slice(0, 2),
        !prev[2],
        ...prev.slice(3),
      ])
    } else if (type === 'term3') {
      setTermsOfService((prev) => [
        ...prev.slice(0, 3),
        !prev[3],
        ...prev.slice(4),
      ])
    } else if (type === 'term4') {
      setTermsOfService((prev) => [...prev.slice(0, 4), !prev[4]])
    }
  }

  const isDisabled =
    !emailConfirm ||
    !isEmailConfirmSuccess ||
    !isPasswordValid ||
    !isPasswordConfirmValid ||
    !termsOfService[1] ||
    !termsOfService[2] ||
    !termsOfService[3]

  return (
    <div className="px-7 flex flex-col justify-start pt-14 pb-[7.5rem]">
      <div>
        <div className="flex flex-col gap-7">
          <LogoSVG height={60} width={196} />
          <Step1SVG />
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <h2 className="font-medium text-[2rem]">기본 정보를 입력해주세요.</h2>

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

            <div className="flex flex-col gap-4">
              <label
                htmlFor="password"
                className="font-normal text-2xl flex space-x-1"
              >
                <span>비밀번호</span>
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
                    {isPasswordVisible ? <HideSVG /> : <ShowSVG />}
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
                    {isPasswordConfirmVisible ? <HideSVG /> : <ShowSVG />}
                  </div>
                </div>
                {passwordConfirmErrorMessages && (
                  <p className="whitespace-pre-wrap text-warning pl-4">
                    {passwordConfirmErrorMessages}
                  </p>
                )}
              </div>
              <div className="border-2 rounded-xl border-border px-8 pt-8 pb-7">
                <div className="flex space-x-5">
                  <div
                    role="presentation"
                    className="cursor-pointer"
                    onClick={() => handleTermsOfService('all')}
                  >
                    {termsOfService.every((term) => term) ? (
                      <Checked className="w-9 h-9" />
                    ) : (
                      <UnChecked className="w-9 h-9" />
                    )}
                  </div>

                  <h3 className="text-2xl font-normal">모두 동의합니다.</h3>
                </div>
                <hr className="my-5" />
                <div className="text-disabled font-normal text-xl gap-4 flex flex-col">
                  <div className="flex space-x-4">
                    <div
                      role="presentation"
                      className="cursor-pointer"
                      onClick={() => handleTermsOfService('term1')}
                    >
                      {termsOfService[1] ? (
                        <Checked className="w-6 h-6" />
                      ) : (
                        <UnChecked className="w-6 h-6" />
                      )}
                    </div>
                    <p>
                      만 14세 이상입니다.{' '}
                      <span className="text-warning">(필수)</span>
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <div
                      role="presentation"
                      className="cursor-pointer"
                      onClick={() => handleTermsOfService('term2')}
                    >
                      {termsOfService[2] ? (
                        <Checked className="w-6 h-6" />
                      ) : (
                        <UnChecked className="w-6 h-6" />
                      )}
                    </div>
                    <p>
                      서비스 이용약관에 동의합니다.{' '}
                      <span className="text-warning">(필수)</span>
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <div
                      role="presentation"
                      className="cursor-pointer"
                      onClick={() => handleTermsOfService('term3')}
                    >
                      {termsOfService[3] ? (
                        <Checked className="w-6 h-6" />
                      ) : (
                        <UnChecked className="w-6 h-6" />
                      )}
                    </div>
                    <p>
                      개인정보의 수집 · 이용에 동의합니다.{' '}
                      <span className="text-warning">(필수)</span>
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <div
                      role="presentation"
                      className="cursor-pointer"
                      onClick={() => handleTermsOfService('term4')}
                    >
                      {termsOfService[4] ? (
                        <Checked className="w-6 h-6 min-w-max" />
                      ) : (
                        <UnChecked className="w-6 h-6 min-w-max" />
                      )}
                    </div>
                    <p>
                      마케팅 수집 · 홍보 목적의 개인정보 수집 및 이용에 동의
                      합니다. (선택)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={`w-full text-center font-normal text-2xl py-7 rounded-xl mt-8 ${isDisabled ? 'btn-disabled' : 'bg-primary'}`}
        disabled={isDisabled}
        onClick={() => router.push('/signup/profile')}
      >
        <span>다음 단계</span>
      </button>
    </div>
  )
}
