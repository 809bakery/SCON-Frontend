interface User {
  memberId: number
  email: string
  password: string
  nickname: string
  image: string
  phoneNumber: string
  reportCount: number
  role: 'ADMIN' | 'OVENER' | 'SCONEE'
  createdAt: string
}
