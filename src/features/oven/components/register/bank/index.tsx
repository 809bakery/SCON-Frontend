import { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step3SVG from '@/static/svg/oven/oven-register-step3.svg'
import RequiredSVG from '@/static/svg/required-star.svg'

interface OvenRegisterType {
  ovenName: string
  ovenDetail: string
  bankName: string
  account: string
  wishCategory: string[]
  accountName: string
  image: string | StaticImageData
}

interface OvenCateRegisterProps {
  ovenRegister: OvenRegisterType
  setOvenRegister: React.Dispatch<React.SetStateAction<OvenRegisterType>>
}

function OvenBankRegister(props: OvenCateRegisterProps) {
  const { ovenRegister, setOvenRegister } = props
  const [profileAccountName, setProfileAccountName] = useState<string>('')
  const [profileAccount, setProfileAccount] = useState<string>('')
  const [profileBankName, setProfileBankName] = useState<string>('')
  const router = useRouter()

  const handleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const reg = /^[0-9]*$/
    if (reg.test(value)) {
      setProfileAccount(value)
    } else {
      toast.error('숫자만 입력해주세요.')
    }
  }

  const submitAccount = () => {
    if (!profileAccountName) {
      toast.error('예금주명을 입력해주세요.')
      return
    }

    if (!profileAccount) {
      toast.error('계좌번호를 입력해주세요.')
      return
    }

    if (!profileBankName) {
      toast.error('은행 또는 증권사를 선택해주세요.')
    }

    setOvenRegister({
      ...ovenRegister,
      accountName: profileAccountName,
      account: profileAccount,
      bankName: profileBankName,
    })
    router.push('/oven/register/people')
  }
  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step3SVG className="w-64" />
      </div>

      <p className="text-3xl">정산 받으실 계좌를 등록해주세요.</p>

      {/* form */}
      <div className="pb-[6rem] flex flex-col gap-y-3">
        <label
          className="flex items-start gap-x-1 text-2xl"
          htmlFor="ovenaccountname"
        >
          <span>예금주명</span>
          <RequiredSVG className="w-3 h-3" />
        </label>
        <input
          type="text"
          id="ovenaccountname"
          value={profileAccountName}
          onChange={(e) => setProfileAccountName(e.target.value)}
          className="w-full py-6 px-8 outline-none border-2 border-border rounded-xl text-2xl"
          placeholder="예금주명 입력"
        />

        <label
          className="pt-7 flex items-start gap-x-1 text-2xl"
          htmlFor="ovenbankaccount"
        >
          <span>계좌번호 입력</span>
          <RequiredSVG className="w-3 h-3" />
        </label>
        <input
          type="text"
          id="ovenbankaccount"
          value={profileAccount}
          onChange={handleAccount}
          className="w-full py-6 px-8 outline-none border-2 border-border rounded-xl text-2xl"
          placeholder="계좌번호 입력('-' 제외)"
        />

        <label
          className="pt-7 flex items-start gap-x-1 text-2xl"
          htmlFor="ovenbankname"
        >
          <span>은행 또는 증권사 선택</span>
          <RequiredSVG className="w-3 h-3" />
        </label>
        <input
          type="text"
          id="ovenbankname"
          value={profileBankName}
          onChange={(e) => setProfileBankName(e.target.value)}
          className="w-full py-6 px-8 outline-none border-2 border-border rounded-xl text-2xl"
          placeholder="예금주명 입력"
        />
      </div>
      <button
        type="button"
        onClick={submitAccount}
        className={`py-7 flex items-center justify-center bg-[#E5E5ED] rounded-xl button text-disabled text-2xl ${profileAccountName && profileAccount && profileBankName && 'bg-primary !text-black'} `}
      >
        다음 단계
      </button>
    </div>
  )
}

export default OvenBankRegister
