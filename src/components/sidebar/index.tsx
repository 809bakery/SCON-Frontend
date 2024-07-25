'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import SideBarMenu from '@/components/sidebar/item/index.tsx'
import SideBarProfile from '@/components/sidebar/profile/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import SideBarCloseSVG from '@/static/svg/sidebar/sidebar-close.svg'

function SideBar() {
  const [user, setUser] = useState<'oven' | 'scon' | undefined>(undefined)

  const router = useRouter()

  return (
    <div>
      <div className="px-7 flex flex-col gap-y-8 mb-8">
        <div className="py-8  flex items-center justify-between">
          <Link href="/main">
            <LogoSVG className="h-8 w-fit" />
          </Link>

          <SideBarCloseSVG
            className="w-8 h-8 cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
        <SideBarProfile nickname="쿨핀" isOven={user === 'oven'} />
      </div>

      <div className="h-3 bg-[#F7F7F7]" />
      <div
        className={`flex flex-col justify-center ${user === 'oven' && 'mb-[24.0625rem]'} ${user === 'scon' && 'mb-[29.375rem]'}`}
      >
        <SideBarMenu text="홈" url="/main" />
        <SideBarMenu text="스테이지" />
        <SideBarMenu text="오븐 둘러보기" url="/oven/detail" />
        <SideBarMenu text="양도 게시판" />
        <SideBarMenu text="예매 내역 확인하기" />
        <SideBarMenu text="마이페이지" />
        {user === 'oven' && <SideBarMenu text="오븐 관리하기" />}
        {user !== 'oven' && (
          <button
            type="button"
            onClick={() => setUser('oven')}
            className="text-primary px-14 py-7 font-extrabold text-xl border-b border-[#F2F3F7] text-start cursor-pointer"
          >
            오브너로 전환하기
          </button>
        )}

        {user === 'oven' && (
          <button
            type="button"
            onClick={() => setUser(undefined)}
            className="text-primary px-14 py-7 font-extrabold text-xl border-b border-[#F2F3F7] text-start cursor-pointer"
          >
            오브너에서 로그아웃
          </button>
        )}
      </div>

      <div className="w-full px-14 my-[9.375rem]">
        {user !== 'oven' && (
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="w-full py-6 bg-primary rounded-xl text-2xl"
          >
            로그인
          </button>
        )}
      </div>
    </div>
  )
}

export default SideBar
