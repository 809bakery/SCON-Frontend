type ReservedMembersType = {
  isEntered: boolean
  user: UserType
}

type UserType = {
  nickname: string
  token: string // QR 코드에 쓰일 예매 번호
  email: string
}

export const DUMMY_RESERVED_MEMBERS: ReservedMembersType[] = [
  {
    isEntered: false,
    user: {
      nickname: '박상우',
      token: 's123456789',
      email: 'sangwoo@test.com',
    },
  },
  {
    isEntered: true,
    user: {
      nickname: '곽성재',
      token: 's987654321',
      email: 'kwakkwakkwak@test.com',
    },
  },
  {
    isEntered: false,
    user: {
      nickname: '박진우',
      token: 's123456789',
      email: 'jinwoojinwoo@test.com',
    },
  },
  {
    isEntered: true,
    user: {
      nickname: '이민정',
      token: 's987654321',
      email: 'minjeong@test.com',
    },
  },
  {
    isEntered: true,
    user: {
      nickname: '유우준',
      token: 's123456789',
      email: 'viewwj@official.com',
    },
  },
]
