'use client'

import { StaticImageData } from 'next/image'
import { useState } from 'react'

import Step from '@/components/Step.tsx'
import OvenBankRegister from '@/features/oven/components/register/bank/index.tsx'
import OvenCateRegister from '@/features/oven/components/register/category/index.tsx'
import OvenJoinRegister from '@/features/oven/components/register/join/index.tsx'
import OvenPeopleRegister from '@/features/oven/components/register/people/index.tsx'
import OvenProfileRegister from '@/features/oven/components/register/profile/index.tsx'

interface OvenRegisterType {
  ovenName: string
  ovenDetail: string
  bankName: string
  wishCategory: string[]
  account: string
  accountName: string
  image: string | StaticImageData
}

function OvenRegisterPage() {
  const [ovenRegister, setOvenRegister] = useState<OvenRegisterType>({
    ovenName: '',
    ovenDetail: '',
    wishCategory: [],
    bankName: '',
    account: '',
    accountName: '',
    image: '',
  })
  return (
    <div>
      <Step name="profile">
        <OvenProfileRegister
          ovenRegister={ovenRegister}
          setOvenRegister={setOvenRegister}
        />
      </Step>
      <Step name="cate">
        <OvenCateRegister
          ovenRegister={ovenRegister}
          setOvenRegister={setOvenRegister}
        />
      </Step>
      <Step name="bank">
        <OvenBankRegister
          ovenRegister={ovenRegister}
          setOvenRegister={setOvenRegister}
        />
      </Step>
      <Step name="people">
        <OvenPeopleRegister />
      </Step>
      <Step name="join">
        <OvenJoinRegister />
      </Step>
    </div>
  )
}

export default OvenRegisterPage
