import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import DefaultProfile from '@/static/img/profile/profile-default.png'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step1SVG from '@/static/svg/oven/oven-register-step1.svg'
import RequiredSVG from '@/static/svg/required-star.svg'
import UploadSVG from '@/static/svg/upload-icon.svg'

interface OvenProfileRegisterProps {
  ovenRegister: OvenRegisterType
  setOvenRegister: React.Dispatch<React.SetStateAction<OvenRegisterType>>
}

interface OvenRegisterType {
  ovenName: string
  ovenDetail: string
  bankName: string
  account: string
  wishCategory: string[]
  accountName: string
  image: string | StaticImageData
}

function OvenProfileRegister(props: OvenProfileRegisterProps) {
  const { ovenRegister, setOvenRegister } = props
  const [profileOvenName, setProfileOvenName] = useState<string>('')
  const [profileOvenDetail, setProfileOvenDetail] = useState<string>('')
  const [profileImage, setProfileImage] = useState<string | StaticImageData>('')
  const router = useRouter()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e

    if (files?.length === 0) {
      return
    }

    const file = files?.[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as Blob)
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }: any = finishedEvent
      setProfileImage(result)
    }
  }

  const submitProfile = () => {
    if (!profileOvenName) {
      toast.error('오븐명을 입력해주세요.')
      return
    }

    if (!profileImage) {
      setProfileImage(DefaultProfile)
    }
    setOvenRegister({
      ...ovenRegister,
      ovenName: profileOvenName,
      ovenDetail: profileOvenDetail,
      image: profileImage,
    })
    router.push('/oven/register/cate')
  }
  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step1SVG className="w-64" />
      </div>

      <p className="text-3xl">
        대표 사진과 오븐명을 입력해주세요.
        <br />
        오븐 프로필은 추후 변경이 가능합니다.
      </p>

      {/* 프로필등록 */}
      <div className="flex items-center justify-center">
        {profileImage ? (
          <label htmlFor="oven-file-input" className="aspect-square relative">
            <Image
              src={profileImage}
              alt="profile"
              width={140}
              height={140}
              className="aspect-square object-cover rounded-full border-2 border-border"
            />
            <UploadSVG className="w-11 h-11 absolute right-0 bottom-0" />
          </label>
        ) : (
          <label htmlFor="oven-file-input" className="aspect-square relative">
            <Image
              src={DefaultProfile}
              alt="profile"
              width={140}
              height={140}
              className="aspect-square object-cover rounded-full border-2 border-border"
            />
            <UploadSVG className="w-11 h-11 absolute right-0 bottom-0" />
          </label>
        )}
        <input
          type="file"
          name="oven-file-input"
          id="oven-file-input"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* form */}
      <div className="pb-[6rem] flex flex-col gap-y-3">
        <label className="flex items-start gap-x-1 text-2xl" htmlFor="ovenname">
          <span>오븐명</span>
          <RequiredSVG className="w-3 h-3" />
        </label>
        <input
          type="text"
          id="ovenname"
          value={profileOvenName}
          onChange={(e) => setProfileOvenName(e.target.value)}
          className="w-full py-6 px-8 outline-none border-2 border-border rounded-xl text-2xl"
          placeholder="오븐명을 입력해주세요. (2~8자 한글, 영문, 숫자)"
        />

        <label
          className="pt-7 flex items-start gap-x-1 text-2xl"
          htmlFor="ovendetail"
        >
          <span>한 줄 소개를 입력해주세요.</span>
        </label>
        <input
          type="text"
          id="ovendetail"
          value={profileOvenDetail}
          onChange={(e) => setProfileOvenDetail(e.target.value)}
          className="w-full py-6 px-8 outline-none border-2 border-border rounded-xl text-2xl"
          placeholder="공백 포함 최대 30자 작성 가능합니다."
        />
      </div>
      <button
        type="button"
        onClick={submitProfile}
        className={`py-7 flex items-center justify-center bg-[#E5E5ED] rounded-xl button text-disabled text-2xl ${profileOvenName && 'bg-primary !text-black'} `}
      >
        다음 단계
      </button>
    </div>
  )
}

export default OvenProfileRegister
