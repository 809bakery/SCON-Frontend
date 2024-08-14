'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import SideBarMenu from '@/components/sidebar/item/index.tsx'
import SideBarProfile from '@/components/sidebar/profile/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import SideBarCloseSVG from '@/static/svg/sidebar/sidebar-close.svg'
import { getAccessToken, removeTokenAll } from '@/utils/cookie/index.ts'

function SideBar() {
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
    enabled: !!getAccessToken(),
  })

  const logout = () => {
    removeTokenAll()
    window.location.href = '/main'
  }

  return (
    <div>
      <div className={`px-7 flex flex-col gap-y-8 ${user && 'mb-8'}`}>
        <div className="py-8  flex items-center justify-between">
          <Link href="/main">
            <LogoSVG className="w-[6.5625rem] h-8" />
          </Link>

          <SideBarCloseSVG
            className="w-8 h-8 cursor-pointer"
            onClick={() => router.back()}
          />
        </div>
        {user && (
          <SideBarProfile
            nickname={user?.nickname}
            isOvener={user?.ovener}
            image={user?.image}
          />
        )}
      </div>

      <div className="h-3 bg-[#F7F7F7]" />
      <div className="flex flex-col justify-center mb-[18.75rem]">
        <SideBarMenu text="홈" url="/main" />
        <SideBarMenu text="스테이지 둘러보기" url="/stage/list/all" />
        <SideBarMenu text="오븐 둘러보기" url="/oven/detail" />
        {user ? (
          <SideBarMenu text="예매 내역 확인하기" url="/ticket/my" />
        ) : (
          <SideBarMenu text="예매 내역 확인하기" />
        )}
        {user && <SideBarMenu text="스콘톡" url="/scontalk" />}
        {user ? (
          <SideBarMenu text="마이페이지" url="/mypage" />
        ) : (
          <SideBarMenu text="마이페이지" />
        )}

        {user?.ovener ? (
          <SideBarMenu text="오븐 관리하기" url="/oven/my" />
        ) : (
          <SideBarMenu text="오브너 등록하기" url="/signup/oven" />
        )}
        {user && (
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
        {!user && (
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
