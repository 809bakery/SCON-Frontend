'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'

interface UserType {
  userId: number
  email: string
  nickname: string
  image: string
  role: string
}

function OvenSettingMembers() {
  const [email, setEmail] = useState<string>('')
  const params = useParams()

  const { data: ovenMemberList } = useQuery({
    queryKey: ['ovenMemberList', params.name],
    queryFn: async () => {
      const response = await privateApi.get(`/api/oven/${params.name}/user`)
      return response.data
    },
  })

  const { mutate: inviteMemberFn } = useMutation({
    mutationFn: async (userId: number) => {
      const response = await privateApi.post(`/api/oven/invite`, {
        ovenId: params.name,
        userId,
      })
      return response.data
    },
    onSuccess: () => {
      toast.success('멤버 초대가 완료되었습니다.')
      setEmail('')
    },
    onError: () => {
      toast.error('멤버 초대에 실패했습니다.')
    },
  })

  const { mutate: compareEmailFn } = useMutation({
    mutationFn: async (userEmail: string) => {
      const response = await privateApi.get(
        `/api/oven/${params.name}/search/user/${userEmail}`,
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.userId === null) {
        toast.error('일치하는 아이디의 유저가 없습니다.')
      } else {
        inviteMemberFn(data.userId)
      }
    },
  })

  const inviteMember = () => {
    // 조건에 따른 toast 분기
    if (!email) {
      toast.error('아이디(이메일)을 입력해주세요.')
      return
    }

    compareEmailFn(email)
  }

  const queryClient = useQueryClient()
  const { mutate: deleteMember } = useMutation({
    mutationFn: async (userId: number) => {
      const response = await privateApi.delete(
        `/api/oven/${params.name}/${userId}`,
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ovenMemberList', params.name],
      })
      toast.success('멤버 추방이 완료되었습니다.')
    },

    onError: () => {
      toast.error('멤버 추방에 실패했습니다.')
    },
  })
  const manageMember = (userId: number) => {
    deleteMember(userId)
  }

  const { mutate: transferLeader } = useMutation({
    mutationFn: async (userId: number) => {
      const response = await privateApi.patch(
        `/api/oven/delegate/${params.name}/${userId}`,
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ovenMemberList', params.name],
      })
      toast.success('리더 양도가 완료되었습니다.')
    },
    onError: () => {
      toast.error('리더 양도에 실패했습니다.')
    },
  })
  const manageLeader = (userId: number) => {
    transferLeader(userId)
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
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 py-3 px-5 text-[#363232] border rounded-xl border-border focus:outline-none"
          />
          <button
            type="button"
            onClick={inviteMember}
            className={`text-disabled bg-[#E5E5ED] rounded-xl ${email && 'text-white bg-primary'} py-3 px-5`}
          >
            초대
          </button>
          {/* 
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
          </div> */}
        </div>
      </div>

      {/* 멤버관리 */}
      <div className="flex flex-col gap-y-1 border border-border rounded-xl">
        {/* header */}
        <div className="w-full px-4 py-3 flex items-center border-b border-border font-bold text-[#363232]">
          <span className="w-[40%]">멤버</span>
          <span className="w-[40%]">아이디(이메일)</span>
          <div className="w-[20%] flex justify-between items-center gap-x-5">
            <span className="flex-1 text-center text-[#6B83FF]">대표</span>
            <span className="flex-1 !text-warning text-center">추방</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-1 overflow-y-scroll">
          {ovenMemberList &&
            ovenMemberList.map((user: UserType) => (
              <div
                className="w-full px-4 py-3 flex items-center"
                key={`${user.email}member`}
              >
                <div className="w-[40%] flex items-center gap-x-5">
                  <Image
                    src={user.image}
                    width={35}
                    height={35}
                    alt="user"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>
                    {user.nickname} {user.role === 'LEADER' && '👑'}
                  </span>
                </div>
                <span className="w-[40%] truncate pr-4">{user.email}</span>
                <div className="w-[20%] flex text-center justify-between items-center gap-x-5">
                  <button
                    type="button"
                    onClick={() => manageLeader(user.userId)}
                    className="flex-1 text-center text-[#6B83FF]"
                  >
                    양도
                  </button>
                  <button
                    type="button"
                    onClick={() => manageMember(user.userId)}
                    className="flex-1 text-center text-warning"
                  >
                    추방
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
