'use client'

import { StaticImageData } from 'next/image'
import { useState } from 'react'

import Step from '@/components/Step.tsx'
import OvenProfileRegister from '@/features/oven/components/register/profile/index.tsx'

interface OvenRegisterType {
  ovenName: string
  ovenDetail: string
  bankName: string
  account: string
  accountName: string
  image: string | StaticImageData
}

function OvenRegisterPage() {
  const [ovenRegister, setOvenRegister] = useState<OvenRegisterType>({
    ovenName: '',
    ovenDetail: '',
    bankName: '',
    account: '',
    accountName: '',
    image: '',
  })
  return (
    <div>
      <Step name="profile">
        <OvenProfileRegister
          ovenReister={ovenRegister}
          setOvenRegister={setOvenRegister}
        />
      </Step>
      <Step name="cate">
        <div>sdf</div>
      </Step>
      <Step name="bank">
        <div>bank</div>
      </Step>
      <Step name="join">
        <div>join</div>
      </Step>
    </div>
  )
}

export default OvenRegisterPage
