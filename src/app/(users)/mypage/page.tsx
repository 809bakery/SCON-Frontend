'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import MypageTap from '@/app/(users)/mypage/_components/MypageTap.tsx'
import Loader from '@/components/loader/index.tsx'
import EditSVG from '@/static/svg/edit-icon.svg'

export interface UserInfo {
  email: string
  nickname: string
  image: string
  ovener: boolean
  authorization: boolean
  loginType: 'ORIGINAL' | 'GOOGLE' | 'KAKAO' | 'NAVER'
}

export default function Mypage() {
  const router = useRouter()
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserInfo>({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    toast.error('로그인이 필요한 서비스입니다.')
    router.back()
  }

  return (
    <div className="flex flex-col">
      {/* 유저 프로필 */}
      <div className="w-full flex flex-col pt-5 pb-[3rem] bg-_white">
        <div className="flex flex-col items-center gap-5 bg-white py-8">
          <div className="w-[7.5rem] h-[7.5rem] rounded-full border border-border">
            <Image
              src={user?.image ?? '/dummy/dummy-default-profile.jpg'}
              alt={user?.nickname ?? 'profile'}
              width={120}
              height={120}
              className="aspect-square object-cover rounded-full"
            />
          </div>
          <div className="relative">
            <span className="font-bold text-2xl leading-8">
              {user?.nickname}
            </span>
            <div
              role="presentation"
              className="w-8 h-8 absolute bottom-0 -right-10  cursor-pointer flex justify-center items-center"
              onClick={() => router.push('/mypage/profile')}
            >
              <EditSVG className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white border-b divide-y divide-solid">
        <MypageTap text="회원 정보" url="/mypage/info" />
        <MypageTap
          text="비밀번호 재설정"
          url="/login/password_reset/new"
          toastMsg={
            user?.loginType !== 'ORIGINAL'
              ? '소셜 계정의 경우 스콘 내에서 비밀번호 변경이 불가능합니다.'
              : ''
          }
        />

        <MypageTap text="내 오븐 관리" url="/oven/my" />
        <MypageTap text="알림 설정" url="/mypage/push_settings" />
        <MypageTap
          text="이용 약관"
          ex_link="
https://hazzz.notion.site/339bc8aeb14a40f9a4a2e44c95764474?pvs=4"
        />
        <MypageTap text="회원 탈퇴" url="/mypage/leave" color="#F85252" />
      </div>
    </div>
  )
}
