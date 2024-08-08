import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { DUMMY_INVITED_USERS } from '@/constants/oven/invite/index.ts'
import OvenPeopleCard from '@/features/oven/components/card/people/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step4SVG from '@/static/svg/oven/oven-register-step4.svg'

function OvenPeopleRegister() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')

  const checkEmail = () => {
    if (!email) {
      toast.error('이메일을 입력해주세요.')
      return
    }

    // axios 쏴서 이메일 체크
    setEmail('')
  }
  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step4SVG className="w-64" />
      </div>

      <p className="text-3xl">(선택) 오븐에 멤버를 초대하세요.</p>

      <div className="flex flex-col gap-y-3">
        <label
          className="pt-7 flex items-start gap-x-1 text-2xl"
          htmlFor="ovenpeople"
        >
          <span>초대하려는 유저의 이메일을 입력해주세요.</span>
        </label>
        <div className="py-6 px-8 border-2 border-border relative rounded-xl">
          <input
            type="text"
            id="ovenpeople"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pr-20 outline-none text-2xl"
            placeholder="공백 포함 최대 30자 작성 가능합니다."
          />

          <button
            type="button"
            onClick={checkEmail}
            className="px-5 py-2 absolute right-5 rounded-xl text-2xl bg-primary bottom-[50%] transform translate-y-1/2"
          >
            초대
          </button>
        </div>
      </div>

      <div className="p-5 border-border border rounded-xl">
        <p className="text-2xl pb-3">초대 목록</p>
        <div className="flex flex-col gap-y-3 max-h-[31.25rem] overflow-y-scroll">
          {DUMMY_INVITED_USERS.map((user, index) => (
            <OvenPeopleCard key={user.userId} user={user} index={index} />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push('/oven/register/join')}
        className="py-7 flex items-center justify-center rounded-xl button text-2xl bg-primary"
      >
        오븐 등록 완료
      </button>
    </div>
  )
}

export default OvenPeopleRegister
