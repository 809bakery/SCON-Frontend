/* eslint-disable no-nested-ternary */

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import Timer from '@/components/timer.tsx'
import { emailRegExp, passwordRegExp } from '@/constants/regex/index.ts'
import Checked from '@/static/svg/checked-icon.svg'
import HideSVG from '@/static/svg/eye-close.svg'
import ShowSVG from '@/static/svg/eye-open.svg'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step1SVG from '@/static/svg/progress/progress-step1.svg'
import Required from '@/static/svg/required-star.svg'
import UnChecked from '@/static/svg/unchecked-icon.svg'

import useSignupStore from '@/store/SignupStore.ts'

export default function BasicInfoStep() {
  const setType = useSignupStore((state) => state.setType)
  const setEmailState = useSignupStore((state) => state.setEmail)
  const setPasswordState = useSignupStore((state) => state.setPassword)

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

  const checkEmailConfirm = async (code: string) => {
    const response = await publicApi.get(
      `/api/auth/mail/verify/${email}/${code}`,
    )

    if (response.status === 200) {
      setIsEmailConfirmSuccess(true)
      setEmailConfirmSuccessMessage(true)
    } else {
      setEmailConfirmErrorMessages('인증 코드를 다시 확인해주세요.')
      setIsEmailConfirmSuccess(false)
    }
  }

  const handleButtonClick = async () => {
    setIsEmailButtonClicked(true)
    const response = await publicApi.get(`/api/auth/mail/send/${email}`)
    if (response.status === 200) {
      setEmailConfirmErrorMessages(
        `메일 전송이 완료되었습니다.\n메일 발송이 되지 않을시 재전송 버튼을 눌러주세요.`,
      )
      setTimerKey((prevKey) => prevKey + 1)
      return
    }
    setEmailConfirmErrorMessages('인증 코드 전송에 실패했습니다.')
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
      } else {
        setEmailConfirmErrorMessages('')
        checkEmailConfirm(value)
      }
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

  const handleTermsOfService = (type: string) => {
    if (type === 'all') {
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

  const handleNextStep = () => {
    setEmailState(email)
    setPasswordState(password)
    setType('credentials')
    router.push('/signup/profile')
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
          <Step1SVG className="w-80" />
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <h2 className="font-medium text-[2rem]">기본 정보를 입력해주세요.</h2>
          {/* 이메일 입력 */}
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
            {/* 비밀번호 입력 */}
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
              {/* 약관동의 */}
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
                      <a
                        target="_blank"
                        href="https://hazzz.notion.site/339bc8aeb14a40f9a4a2e44c95764474?pvs=4"
                        className="underline cursor-pointer"
                        rel="noreferrer"
                      >
                        서비스 이용약관
                      </a>{' '}
                      에 동의합니다.{' '}
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
                      <a
                        target="_blank"
                        href="https://hazzz.notion.site/68dd9b13dffc4fdb86639950709ab67a"
                        className="underline cursor-pointer"
                        rel="noreferrer"
                      >
                        개인정보의 수집 · 이용
                      </a>{' '}
                      에 동의합니다.{' '}
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
                        <Checked className="w-6 h-6 " />
                      ) : (
                        <UnChecked className="w-6 h-6" />
                      )}
                    </div>
                    <p>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://hazzz.notion.site/ce743b5781f6432a9f4417128f5e73e2?pvs=4"
                        className="underline cursor-pointer"
                      >
                        마케팅 수집 · 홍보 목적의 개인정보 수집 및 이용
                      </a>
                      합니다. (선택)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 다음단계로 이동 */}
      <button
        type="button"
        className={`w-full text-center font-normal text-2xl py-7 rounded-xl mt-8 ${isDisabled ? 'btn-disabled' : 'bg-primary'}`}
        disabled={isDisabled}
        onClick={handleNextStep}
      >
        <span>다음 단계</span>
      </button>
    </div>
  )
}
