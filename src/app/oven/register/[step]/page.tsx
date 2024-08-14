'use client'

import Step from '@/components/Step.tsx'
import OvenBankRegister from '@/features/oven/components/register/bank/index.tsx'
import OvenCateRegister from '@/features/oven/components/register/category/index.tsx'
import OvenJoinRegister from '@/features/oven/components/register/join/index.tsx'
import OvenPeopleRegister from '@/features/oven/components/register/people/index.tsx'
import OvenProfileRegister from '@/features/oven/components/register/profile/index.tsx'

function OvenRegisterPage() {
  return (
    <div>
      <Step name="profile">
        <OvenProfileRegister />
      </Step>
      <Step name="cate">
        <OvenCateRegister />
      </Step>
      <Step name="bank">
        <OvenBankRegister />
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
