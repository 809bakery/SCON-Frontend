'use client'

import { useState } from 'react'

import { DUMMY_RESERVED_MEMBERS } from '@/constants/oven/manage/members/index.ts'
import MemberCheckbox from '@/features/oven/components/manage/members/index.tsx'
import SquareFillSVG from '@/static/svg/square-fill-icon.svg'
import SquareUnfillSVG from '@/static/svg/square-unfill-icon.svg'

interface UserType {
  nickname: string
  token: string // QR 코드에 쓰일 예매 번호
  email: string
}
interface ReservedMembersType {
  isEntered: boolean
  user: UserType
}

function OvenStageReserved() {
  const [tab, setTab] = useState<number>(0)
  const [users, setUsers] = useState<ReservedMembersType[]>(
    DUMMY_RESERVED_MEMBERS,
  )

  const enterMember = (user: UserType) => {
    const newUsers = users.map((member) => {
      if (member.user.email === user.email) {
        return {
          ...member,
          isEntered: !member.isEntered,
        }
      }
      return member
    })
    setUsers(newUsers)
  }

  const leaveMember = (user: UserType) => {
    const newUsers = users.map((member) => {
      if (member.user.email === user.email) {
        return {
          ...member,
          isEntered: !member.isEntered,
        }
      }
      return member
    })
    setUsers(newUsers)
  }
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
          {users.map((member, index) => (
            <MemberCheckbox
              key={`enter-${member.user.email}`}
              className={`${member.isEntered && 'hidden'}`}
            >
              <button type="button" onClick={() => enterMember(member.user)}>
                {' '}
                {member.isEntered ? (
                  <SquareFillSVG className="w-6 h-6" />
                ) : (
                  <SquareUnfillSVG className="w-6 h-6" />
                )}
              </button>
              <span>{index + 1}</span>
              <span>{member.user.nickname}</span>
              <span>{member.user.token}</span>
              <span className="underline">{member.user.email}</span>
            </MemberCheckbox>
          ))}
        </div>
      ) : (
        <div className="py-7 px-5">
          {users.map((member, index) => (
            <MemberCheckbox
              key={`leave-${member.user.email}`}
              className={`${!member.isEntered && 'hidden'}`}
            >
              <button type="button" onClick={() => leaveMember(member.user)}>
                {' '}
                {member.isEntered ? (
                  <SquareFillSVG className="w-6 h-6" />
                ) : (
                  <SquareUnfillSVG className="w-6 h-6" />
                )}
              </button>
              <span>{index + 1}</span>
              <span>{member.user.nickname}</span>
              <span>{member.user.token}</span>
              <span className="underline truncate">{member.user.email}</span>
            </MemberCheckbox>
          ))}
        </div>
      )}
    </div>
  )
}

export default OvenStageReserved
