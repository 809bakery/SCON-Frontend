'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import AlertButton from '@/components/AlertButton.tsx/index.tsx'
import XMarkSVG from '@/static/svg/close-circle-icon.svg'
import EyesOffSVG from '@/static/svg/eye-close.svg'
import EyesOnSVG from '@/static/svg/eye-open.svg'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import RememberOnSVG from '@/static/svg/square-fill-icon.svg'
import RememberOffSVG from '@/static/svg/square-unfill-icon.svg'

export default function EmailLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const removeItem = (item: string) => {
    if (item === email) {
      setEmail('')
    }

    if (item === password) {
      setPassword('')
    }
  }

  const handleSubmit = () => {
    if (email === 'admin' && password === '1234') {
      // eslint-disable-next-line no-alert
      alert(`어서오세요 관리자님🥳 ${isChecked ? '| 로그인 유지' : ''}`)
      router.push('/main')
    }

    // eslint-disable-next-line no-alert
    else alert('아이디 또는 비밀번호가 일치하지 않습니다.')
  }

  return (
    <div className="flex flex-col items-center">
      {/* 로고 */}
      <Link href="/login" className="mt-[3.75rem] mb-20">
        <LogoSVG className="w-48 h-14" />
      </Link>

      {/* 입력폼 */}
      <form className="w-full px-7 flex flex-col gap-y-5 text-[#302602] placeholder:text-[#CECCCC] text-2xl">
        {/* 이메일 입력 */}
        <div className="relative pl-8 pr-16 py-6 border-2 border-border focus-within:border-primary rounded-xl">
          <input
            className="w-full outline-none"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
          />
          {email.length > 0 && (
            <XMarkSVG
              onClick={() => removeItem(email)}
              className="w-6 h-6 absolute mr-6 right-0 bottom-[50%] transform translate-y-1/2 cursor-pointer"
            />
          )}
        </div>
        {/* 비밀번호 입력 */}
        <div className="relative pl-8 pr-32 py-6 border-2 border-border focus-within:border-primary rounded-xl">
          <input
            className="w-full outline-none"
            type={isPasswordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
          />
          {password.length > 0 && (
            <>
              {isPasswordVisible ? (
                <EyesOnSVG
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="w-7 h-7 absolute mr-20 right-0 bottom-[50%] transform translate-y-1/2 cursor-pointer"
                />
              ) : (
                <EyesOffSVG
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="w-7 h-7 absolute mr-20 right-0 bottom-[50%] transform translate-y-1/2 cursor-pointer"
                />
              )}
              <XMarkSVG
                onClick={() => removeItem(password)}
                className="w-6 h-6  absolute mr-6 right-0 bottom-[50%] transform translate-y-1/2 cursor-pointer"
              />
            </>
          )}
        </div>
        {/* 로그인 상태 유지 */}
        <div>
          <div className="flex items-center justify-end gap-x-3 text-xl text-disabled">
            {isChecked ? (
              <RememberOnSVG
                onClick={() => setIsChecked(!isChecked)}
                className="cursor-pointer"
              />
            ) : (
              <RememberOffSVG
                onClick={() => setIsChecked(!isChecked)}
                className="cursor-pointer"
              />
            )}
            <button
              type="button"
              onClick={() => setIsChecked(!isChecked)}
              className="cursor-pointer"
            >
              로그인 상태 유지하기
            </button>
          </div>
        </div>
        {/* 로그인 버튼 */}
        <button
          className="w-full px-7 py-6 text-2xl bg-primary rounded-xl font-bold"
          type="button"
          onClick={handleSubmit}
        >
          로그인
        </button>
        {/* 아이디·비밀번호 찾기 */}
        <div className="text-disabled text-xl flex items-center justify-end">
          <AlertButton text="아이디·비밀번호 찾기" />
        </div>
      </form>
      {/* 회원가입 */}
      <div className="text-disabled text-xl my-[9.375rem] flex gap-x-2 justify-between items-center">
        <span>아직 스콘의 회원이 아니시라면?</span>
        <Link href="/signup/basic" className="font-bold cursor-pointer">
          회원가입
        </Link>
      </div>
      <div />
    </div>
  )
}
