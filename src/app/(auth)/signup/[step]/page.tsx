/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useRouter } from 'next/navigation'

import BasicInfoStep from '@/app/(auth)/signup/steps/BasicInfoStep.tsx'
import JoinStep from '@/app/(auth)/signup/steps/JoinStep.tsx'
import MoreInfoStep from '@/app/(auth)/signup/steps/MoreInfoStep.tsx'
import ProfileStep from '@/app/(auth)/signup/steps/ProfileStep.tsx'
import Step from '@/components/Step.tsx'
import BackSVG from '@/static/svg/arrow-left-icon.svg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SignupPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col">
      <div className="w-full relative flex items-center justify-center py-[14px] border-b border-[#d6d5d5] text-center text-[#565551]">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-7 cursor-pointer"
        >
          <BackSVG />
        </button>
        <span className="font-bold text-[1.5rem]">회원가입</span>
      </div>
      <Step name="basic">
        <BasicInfoStep />
      </Step>
      <Step name="profile">
        <ProfileStep />
      </Step>
      <Step name="more">
        <MoreInfoStep />
      </Step>
      <Step name="join">
        <JoinStep />
      </Step>
    </div>
  )
}
