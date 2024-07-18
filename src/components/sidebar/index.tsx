'use client'

import Link from 'next/link'
import { useState } from 'react'

import SideBarMenu from '@/components/sidebar/item/index.tsx'
import SideBarProfile from '@/components/sidebar/profile/index.tsx'
import LogoSVG from '@/static/svg/main-icon.svg'
import SideBarCloseSVG from '@/static/svg/sidebar-close.svg'

function SideBar() {
  const [user, setUser] = useState<'oven' | 'scon' | undefined>(undefined)
  return (
    <div>
      <div className="px-7 flex flex-col gap-y-8 mb-8">
        <div className="py-8  flex items-center justify-between">
          <Link href="/">
            <LogoSVG className="h-8 w-fit" />
          </Link>

          <SideBarCloseSVG
            className="w-8 h-8 cursor-pointer"
            onClick={() => setUser(undefined)}
          />
        </div>
        <SideBarProfile nickname="쿨핀" isOven={user === 'oven'} />
      </div>

      <div className="h-3 bg-[#F7F7F7]" />
      <div
        className={`flex flex-col justify-center ${user === 'oven' && 'mb-[24.0625rem]'} ${user === 'scon' && 'mb-[29.375rem]'}`}
      >
        <SideBarMenu text="홈" />
        <SideBarMenu text="스테이지" />
        <SideBarMenu text="오븐 둘러보기" />
        <SideBarMenu text="양도 게시판" />
        <SideBarMenu text="예매 내역 확인하기" />
        <SideBarMenu text="마이페이지" />
        {user === 'oven' && <SideBarMenu text="오븐 관리하기" />}
      </div>

      <div className="w-full px-14 mt-[22.375rem] mb-[9.4375rem]">
        {user !== 'oven' && (
          <button
            type="button"
            onClick={() => setUser('oven')}
            className="w-full py-6 bg-primary rounded-xl text-2xl"
          >
            오브너로 전환
          </button>
        )}
      </div>
    </div>
  )
}

export default SideBar
