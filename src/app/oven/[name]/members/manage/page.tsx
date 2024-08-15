'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import Loader from '@/components/loader/index.tsx'
import MemberCheckbox from '@/features/oven/components/manage/members/index.tsx'
import SquareFillSVG from '@/static/svg/square-fill-icon.svg'
import SquareUnfillSVG from '@/static/svg/square-unfill-icon.svg'

interface UserType {
  id: number
  headCount: number
  nickname: string
  token: string // QR 코드에 쓰일 예매 번호
  email: string
  entry: boolean
}

function OvenStageReserved() {
  const [tab, setTab] = useState<number>(0)
  const param = useParams()
  const [users, setUsers] = useState<UserType[]>()

  const { isLoading } = useQuery({
    queryKey: ['reservedMemberList', param.name],
    queryFn: async () => {
      const response = await privateApi.get(`/api/reserve/manage/${param.name}`)

      if (response.status === 200) {
        setUsers(response.data as UserType[])
      }
      return response.data
    },
  })

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    )
  return (
    <div>
      {/* tab */}
      <div className="flex items-center justify-between border-b border-border">
        <button
          type="button"
          onClick={() => setTab(0)}
          className={`flex-1 ${tab === 0 && '!text-black font-bold !border-primary'} py-5 flex items-center justify-center border-transparent border-b-4 text-disabled text-2xl`}
        >
          입장전
        </button>
        <button
          type="button"
          onClick={() => setTab(1)}
          className={`flex-1 ${tab === 1 && '!text-black font-bold !border-primary'} py-5 flex items-center justify-center border-transparent border-b-4 text-disabled text-2xl`}
        >
          입장 후
        </button>
      </div>

      {/* content */}
      {tab === 0 ? (
        <div className="py-7 px-5">
          {users &&
            users.map((member, index) => (
              <MemberCheckbox
                // eslint-disable-next-line react/no-array-index-key
                key={`enter-${member.email}-${index}`}
                className={`${member.entry && 'hidden'}`}
              >
                {member.entry ? (
                  <SquareFillSVG className="w-6 h-6" />
                ) : (
                  <SquareUnfillSVG className="w-6 h-6" />
                )}
                <span>{member.id}</span>
                <span>{member.nickname}</span>
                <span className="truncate">
                  {member.token.slice(0, 10)} ...
                </span>
                <span className="underline">{member.email}</span>
              </MemberCheckbox>
            ))}
        </div>
      ) : (
        <div className="py-7 px-5">
          {users &&
            users.map((member, index) => (
              <MemberCheckbox
                // eslint-disable-next-line react/no-array-index-key
                key={`leave-${member.email}-${index}`}
                className={`${!member.entry && 'hidden'}`}
              >
                {member.entry ? (
                  <SquareFillSVG className="w-6 h-6" />
                ) : (
                  <SquareUnfillSVG className="w-6 h-6" />
                )}
                <span>{member.id}</span>
                <span>{member.nickname}</span>
                <span>{member.token}</span>
                <span className="underline truncate">{member.email}</span>
              </MemberCheckbox>
            ))}
        </div>
      )}
    </div>
  )
}

export default OvenStageReserved
