/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { Toaster } from 'react-hot-toast'

import BasicInfoStep from '@/app/(auth)/signup/steps/BasicInfoStep.tsx'
import JoinStep from '@/app/(auth)/signup/steps/JoinStep.tsx'
import MoreInfoStep from '@/app/(auth)/signup/steps/MoreInfoStep.tsx'
import ProfileStep from '@/app/(auth)/signup/steps/ProfileStep.tsx'
import PushStep from '@/app/(auth)/signup/steps/PushStep.tsx'
import Step from '@/components/Step.tsx'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SignupPage() {
  return (
    <div className="flex flex-col">
      <Step name="basic">
        <BasicInfoStep />
      </Step>
      <Step name="profile">
        <ProfileStep />
      </Step>
      <Step name="more">
        <MoreInfoStep />
      </Step>
      <Step name="push">
        <PushStep />
      </Step>
      <Step name="join">
        <JoinStep />
      </Step>

      <Toaster />
    </div>
  )
}
