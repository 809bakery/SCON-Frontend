'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

function OvenSignUpPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isPhoneAuth, setIsPhoneAuth] = useState<boolean>(false)
  const router = useRouter()

  const handlePhoneAuth = () => {
    toast.success('번호 인증이 완료되었습니다.')
    setIsModalOpen(!isModalOpen)
    setIsPhoneAuth(!isPhoneAuth)
  }

  const handleModal = () => {
    if (!isPhoneAuth) {
      setIsModalOpen(!isModalOpen)
      return
    }

    router.push('/signup/oven/success')
  }
  return (
    <>
      <div
        className={` ${isModalOpen ? '' : 'hidden'} top-0 left-0 w-full h-[100dvh] fixed flex items-center justify-center bg-black z-40 bg-opacity-50`}
      >
        <div className="w-[30rem] p-8 flex flex-col gap-y-10 bg-white rounded-xl z-50">
          <p className="text-2xl">오브너 등록을 위해 본인인증이 필요합니다.</p>
          <div className="px-8 flex gap-x-5 justify-between items-center text-xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="py-4 border border-border rounded-xl flex-1 flex items-center justify-center"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handlePhoneAuth}
              className="py-4 bg-primary rounded-xl flex-1 flex items-center justify-center"
            >
              번호로 인증
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-15 pt-[120px] pb-[12.5rem]">
        <div className="px-14 flex flex-col font-bold text-3xl">
          <p>
            나만의 스테이지 개최를 위해선
            <br />
            오브너 등록이 필요해요!
          </p>
        </div>

        <ul className="px-14 pb-[17.5rem] flex flex-col gap-y-4 no-underline text-xl text-disabled">
          <li>· 오브너 등록을 위해 1회 본인인증 과정이 필요합니다.</li>
          <li>· 오븐을 만들어 동료들과 함께 스테이지를 개최할 수 있습니다.</li>
          <li>· 커뮤니티를 통해 팬들과 양방 소통이 가능합니다.</li>
        </ul>
        <div className="px-14 max-w-[598px] fixed  bottom-0 py-4 w-full bg-white rounded-t-xl">
          <button
            type="button"
            onClick={handleModal}
            className="w-full  py-5 flex items-center justify-center bg-primary rounded-xl text-2xl"
          >
            오브너 등록
          </button>
        </div>
      </div>
    </>
  )
}

export default OvenSignUpPage
