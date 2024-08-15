'use client'

import { StaticImageData } from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { DUMMY_OVEN_INFO } from '@/constants/oven/manage/index.ts'

interface UserType {
  nickname: string
  email: string
  image: string | StaticImageData
  isOvener: boolean
}

function OvenSetting() {
  const router = useRouter()
  const [loginUser, setLoginUser] = useState<UserType>()
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false)
  const segment = usePathname().split('/')[2]
  useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem('user')!))
  }, [])

  const quitOven = () => {
    // 오븐 탈퇴 api
    toast.success('오븐 탈퇴가 완료되었습니다.')
    router.push('/main')
  }

  return (
    <div className="py-8 bg-[#FAFAFA] text-xl flex flex-col gap-y-8">
      <div>
        <div className="w-full px-8 py-5 bg-white border-y border-border font-bold">
          <p>오븐 관리</p>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/oven/${segment}/profile`)}
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          오븐 프로필 수정하기
        </button>
        <button
          type="button"
          onClick={() => router.push('/oven/[name]/members')}
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          오븐 멤버
        </button>
      </div>

      <div>
        <div className="w-full px-8 py-5 bg-white border-y border-border font-bold">
          <p>스테이지 관리</p>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/oven/${segment}/stage/new`)}
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          스테이지 등록하기
        </button>
        <button
          type="button"
          onClick={() => router.push('/oven/[name]/stage')}
          className="w-full px-16 py-5 bg-white text-disabled border-border border-b text-start"
        >
          등록된 스테이지 관리 (QR리더기 / 예매자 명단 확인)
        </button>
      </div>

      <div className="mt-20">
        {DUMMY_OVEN_INFO.leader === loginUser?.nickname ? (
          <button
            type="button"
            onClick={() => router.push('/oven/[name]/delete')}
            className="w-full px-16 py-5 bg-white text-warning font-bold border-border border-b text-start"
          >
            오븐 삭제
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsDeleteModal(true)}
            className="w-full px-16 py-5 bg-white text-warning font-bold border-border border-y text-start"
          >
            오븐 탈퇴
          </button>
        )}

        <div
          className={`${!isDeleteModal && 'hidden'} w-full h-dvh z-50 fixed left-0 top-0 flex items-center justify-center bg-[#4C4C4C] bg-opacity-80`}
        >
          <div className="bg-white rounded-xl flex flex-col px-10 py-6 gap-y-6">
            <h3 className="text-xl font-bold">오븐 탈퇴</h3>
            <span className="text-sm">
              탈퇴 버튼 선택 시 오븐에서 나가게 되며, <br />
              저장된 정보는 복구할 수 없습니다. <br /> <br />
              정말로 탈퇴하시겠어요?
            </span>
            <div className="flex flex-col gap-y-4 items-center text-xs">
              <button
                type="button"
                className="w-full py-4 bg-warning text-white rounded-xl"
                onClick={quitOven}
              >
                탈퇴
              </button>
              <button
                type="button"
                className="w-full py-4 border border-border rounded-xl"
                onClick={() => setIsDeleteModal(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OvenSetting
