'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import { DUMMY_INVITED_USERS } from '@/constants/oven/invite/index.ts'
import { DUMMY_MANAGE_MEMBERS } from '@/constants/oven/manage/setting/index.ts'

interface UserType {
  userId: number
  email: string
  nickname: string
  image: string | StaticImageData
  isOven: boolean
}

function OvenSettingMembers() {
  const [email, setEmail] = useState<string>('')
  const [searchedUsers, setSearchedUsers] = useState<UserType[]>([])
  // const [loginUser, setLoginUser] = useState<UserType>()

  // useEffect(() => {
  //   setLoginUser(JSON.parse(sessionStorage.getItem('user')!))
  // }, [])

  const checkMembers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    if (value) {
      const users = DUMMY_MANAGE_MEMBERS.filter((user) =>
        user.email?.includes(value),
      )
      setSearchedUsers(users)
    } else {
      setSearchedUsers([])
    }
  }

  const inviteMember = () => {
    // 조건에 따른 toast 분기
  }

  const manageMember = () => {
    // if(loginUser && !loginUser?.nickname DUMMY_OVEN_INFO.leader) {
    //   toast.error('오븐 멤버에 대한 관리 권한이 없습니다.')
    //   return
    // }
  }
  return (
    <div className="pt-5 px-7 pb-32 flex flex-col gap-y-8">
      <div className="py-3 px-5 flex flex-col gap-y-4 border rounded-xl border-border">
        <h3 className="text-xl font-bold">멤버 초대하기</h3>
        <div className="flex justify-between items-center gap-x-7 relative">
          <input
            type="email"
            placeholder="초대하려는 대상의 아이디(이메일)을 입력해주세요."
            value={email}
            onChange={checkMembers}
            className="flex-1 py-3 px-5 text-[#363232] border rounded-xl border-border focus:outline-none"
          />
          <button
            type="button"
            onClick={inviteMember}
            className={`text-disabled bg-[#E5E5ED] rounded-xl ${email && 'text-white bg-primary'} py-3 px-5`}
          >
            초대
          </button>

          <div
            className={`w-full py-4 absolute bottom-[-0.25rem] bg-white text-disabled border border-border rounded-xl ${!email && 'hidden'} translate-y-full overflow-hidden`}
          >
            {searchedUsers.length === 0 ? (
              <span className="flex items-center justify-center">
                일치하는 아이디의 유저가 없습니다.
              </span>
            ) : (
              <div className="py-3 px-8 flex flex-col gap-y-3">
                {searchedUsers.map((user) => (
                  <div
                    key={user.email}
                    className="flex items-center justify-between gap-x-5 text-[#363232]"
                  >
                    <Image
                      src={user.image}
                      alt="user"
                      className="w-6 h-6 rounded-full object-cover"
                    />

                    <span className="w-[15%] truncate">{user.nickname}</span>
                    <span className="flex-1">{user.email}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 멤버관리 */}
      <div className="flex flex-col gap-y-1 border border-border rounded-xl">
        {/* header */}
        <div className="w-full px-4 py-3 flex items-center border-b border-border font-bold text-[#363232]">
          <span className="w-[40%]">멤버</span>
          <span className="w-[40%]">아이디(이메일)</span>
          <div className="w-[20%] flex justify-between items-center gap-x-5">
            <span className="flex-1 text-center">역할</span>
            <span className="flex-1 !text-[#6B83FF] text-center">관리</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 overflow-y-scroll">
          {DUMMY_INVITED_USERS.map((user) => (
            <div
              className="w-full px-4 py-3 flex items-center"
              key={`${user.email}member`}
            >
              <div className="w-[40%] flex items-center gap-x-5">
                <Image
                  src={user.image}
                  alt="user"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{user.nickname}</span>
              </div>
              <span className="w-[40%] truncate pr-4">{user.email}</span>
              <div className="w-[20%] flex text-center justify-between items-center gap-x-5">
                <span className="flex-1">
                  {user.role === 'MEMBER' ? '멤버' : '대표'}
                </span>
                <button
                  type="button"
                  onClick={manageMember}
                  className="flex-1 text-center text-[#6B83FF]"
                >
                  관리
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OvenSettingMembers
