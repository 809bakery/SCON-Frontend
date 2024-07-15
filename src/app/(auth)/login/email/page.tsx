import Link from 'next/link'

import BackSVG from '@/static/svg/chevron-left.svg'
import EyesOnSVG from '@/static/svg/eye-open.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import XMarkSVG from '@/static/svg/xmark-circle.svg'

export default function EmailLoginPage() {
  return (
    <div className="flex flex-col items-center">
      {/* 이메일로 로그인 */}
      <div className="w-full relative flex items-center justify-center py-[14px] mb-[3.75rem] border-b border-[#d6d5d5] text-center text-[#565551]">
        <Link href="/login" className="absolute left-0 cursor-pointer">
          <BackSVG />
        </Link>
        <span className="font-bold text-[1.5rem]">이메일로 로그인</span>
      </div>

      {/* scon logo */}
      <div className="mb-[5rem]">
        <LogoSVG width={196} height={60} />
      </div>

      {/* form */}
      <form className="w-full px-7 flex flex-col gap-y-5 text-[#302602] placeholder:text-[#CECCCC] text-2xl">
        <div className="relative pl-8 pr-16 py-6 border-2 border-[#E4E4E4] focus-within:border-[#FFC90D] rounded-xl">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="이메일을 입력해주세요."
          />
          <XMarkSVG className="absolute mr-6 right-0 bottom-[50%] transform translate-y-1/2" />
        </div>
        <div className="relative pl-8 pr-32 py-6 border-2 border-[#E4E4E4] focus-within:border-[#FFC90D] rounded-xl">
          <input
            className="w-full outline-none"
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <EyesOnSVG className="absolute mr-20 right-0 bottom-[50%] transform translate-y-1/2" />
          <XMarkSVG className="absolute mr-6 right-0 bottom-[50%] transform translate-y-1/2" />
        </div>

        <div>
          <div className="flex items-center justify-end gap-x-3 text-xl text-[#A0A0A0]">
            <div className="w-6 h-6 bg-[#FFC90D] rounded" />
            <span>로그인 상태 유지하기</span>
          </div>
        </div>

        <button
          className="w-full px-7 py-6 text-2xl bg-[#FFC90D] rounded-xl font-bold"
          type="submit"
        >
          로그인
        </button>

        <div className="text-[#A0A0A0] text-xl flex items-center justify-end">
          <span className="cursor-pointer">아이디·비밀번호 찾기</span>
        </div>
      </form>

      <div className="text-[#A0A0A0] text-xl mb-[151px] mt-[389px] flex gap-x-2 justify-between items-center">
        <span>아직 스콘의 회원이 아니시라면?</span>
        <strong className="font-bold cursor-pointer">회원가입</strong>
      </div>

      <div />
    </div>
  )
}
