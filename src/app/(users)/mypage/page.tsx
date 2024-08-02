'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import MypageTap from '@/app/(users)/mypage/_components/MypageTap.tsx'
import { DUMMY_OVEN_DETAIL_DATA } from '@/constants/dummy.ts'
import EditSVG from '@/static/svg/edit-icon.svg'

const name = '주르르'

export default function Mypage() {
  const router = useRouter()
  const user = DUMMY_OVEN_DETAIL_DATA.find((data) => data.ovenName === name)

  return (
    <div className="flex flex-col">
      {/* 유저 프로필 */}
      <div className="w-full flex flex-col pt-5 pb-[3rem] bg-_white">
        <div className="flex flex-col items-center gap-5 bg-white py-8">
          <div className="w-[7.5rem] h-[7.5rem] rounded-full border border-border">
            <Image
              src={user?.image ?? '/dummy/dummy-default-profile.jpg'}
              alt={user?.ovenName ?? 'profile'}
              width={120}
              height={120}
              className="aspect-square object-cover rounded-full"
            />
          </div>
          <div className="relative">
            <span className="font-bold text-2xl leading-8">
              {user?.ovenName}
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
        <MypageTap text="비밀번호 재설정" url="/login/password_reset" />
        <MypageTap text="내 오븐 관리" />
        <MypageTap text="알림 설정" url="/mypage/push_settings" />
        <MypageTap text="이용 약관" />
        <MypageTap text="회원 탈퇴" url="/mypage/leave" color="#F85252" />
      </div>
    </div>
  )
}
