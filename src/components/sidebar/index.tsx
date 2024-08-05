'use client'

import { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import SideBarMenu from '@/components/sidebar/item/index.tsx'
import SideBarProfile from '@/components/sidebar/profile/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import SideBarCloseSVG from '@/static/svg/sidebar/sidebar-close.svg'

interface UserType {
  nickname: string
  email: string
  image: string | StaticImageData
  isOvener: boolean
}

function SideBar() {
  const [loginUser, setLoginUser] = useState<UserType>()
  const router = useRouter()

  useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem('user')!))
  }, [])

  const logout = () => {
    toast.success('로그아웃 되었습니다.')
    sessionStorage.removeItem('user')
    router.push('/')
  }

  return (
    <div>
      <div className={`px-7 flex flex-col gap-y-8 ${loginUser && 'mb-8'}`}>
        <div className="py-8  flex items-center justify-between">
          <Link href="/main">
            <LogoSVG className="w-[6.5625rem] h-8" />
          </Link>

          <SideBarCloseSVG
            className="w-8 h-8 cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
        {loginUser && (
          <SideBarProfile
            nickname={loginUser?.nickname}
            isOvener={loginUser?.isOvener}
            image={loginUser?.image}
          />
        )}
      </div>

      <div className="h-3 bg-[#F7F7F7]" />
      <div className="flex flex-col justify-center mb-[18.75rem]">
        <SideBarMenu text="홈" url="/main" />
        <SideBarMenu text="스테이지 둘러보기" url="/stage/list/all" />
        <SideBarMenu text="오븐 둘러보기" url="/oven/detail" />
        <SideBarMenu text="양도 게시판" />
        <SideBarMenu text="예매 내역 확인하기" url="/ticket/my" />
        <SideBarMenu text="스콘톡" />
        <SideBarMenu text="마이페이지" url="/mypage" />

        {loginUser?.isOvener && <SideBarMenu text="오븐 관리하기" />}
        {loginUser && (
          <button
            type="button"
            onClick={logout}
            className="text-[#6B6E78] px-14 py-7 underline font-extrabold text-xl border-b border-border text-start cursor-pointer"
          >
            로그아웃
          </button>
        )}
      </div>

      <div className="w-full px-14 my-[9.375rem]">
        {!loginUser && (
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="w-full py-6 bg-primary rounded-xl text-2xl"
          >
            로그인
          </button>
        )}
      </div>

      <Toaster />
    </div>
  )
}

export default SideBar
