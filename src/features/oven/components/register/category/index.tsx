import { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import OvenCheckbox from '@/features/oven/components/checkbox/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step2SVG from '@/static/svg/oven/oven-register-step2.svg'

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

function OvenCateRegister(props: OvenCateRegisterProps) {
  const { ovenRegister, setOvenRegister } = props
  const router = useRouter()
  const [category, setCategory] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ])

  const handleCheck = (index: number) => {
    setCategory((prev) => {
      const newCategory = [...prev]
      newCategory[index] = !newCategory[index]
      return newCategory
    })
  }

  const submitCategory = () => {
    if (!category.includes(true)) {
      toast.error('하나 이상의 카테고리를 선택해주세요.')
      return
    }
    const categoryArr: string[] = []
    const wishMap = ['PERFORMANCE', 'LECTURE', 'CLUB', 'ETC']
    category.forEach((val, index) => {
      if (val) {
        categoryArr.push(wishMap[index])
      }
    })

    setOvenRegister({ ...ovenRegister, wishCategory: categoryArr })

    router.push('/oven/register/bank')
  }
  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step2SVG className="w-64" />
      </div>

      <div>
        <p className="text-3xl">개최하려는 스테이지 분야를 선택해주세요.</p>
        <p className="text-xl text-disabled flex items-center justify-end">
          (중복 선택 가능)
        </p>
      </div>

      <div className="flex flex-col gap-y-5">
        {['공연', '강연', '소모임', '기타'].map((val, index) => (
          <OvenCheckbox
            text={val}
            key={`${val}-checkbox`}
            checked={category[index]}
            index={index}
            handleCheck={handleCheck}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={submitCategory}
        className={`py-7 flex items-center justify-center bg-[#E5E5ED] rounded-xl button text-disabled text-2xl ${category.includes(true) && 'bg-primary !text-black'} `}
      >
        다음 단계
      </button>
    </div>
  )
}

export default OvenCateRegister
