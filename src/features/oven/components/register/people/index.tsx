import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import Loader from '@/components/loader/index.tsx'
import OvenPeopleCard from '@/features/oven/components/card/people/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step4SVG from '@/static/svg/oven/oven-register-step4.svg'

import useCreateOvenStore from '@/store/CreateOvenStore.ts'

interface UserType {
  userId: number | null
  email: string | null
  nickname: string | null
  image: string | null
  isOven: boolean
}

function OvenPeopleRegister() {
  const ovenName = useCreateOvenStore((state) => state.ovenName)
  const ovenDetail = useCreateOvenStore((state) => state.ovenDetail)
  const bankName = useCreateOvenStore((state) => state.bankName)
  const wishCategory = useCreateOvenStore((state) => state.wishCategory)
  const account = useCreateOvenStore((state) => state.account)
  const accountName = useCreateOvenStore((state) => state.accountName)
  const image = useCreateOvenStore((state) => state.image)

  const queryClient = useQueryClient()
  const {
    data: ovenId,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['ovenSignUp'],
    queryFn: async () => {
      let response
      const formData = new FormData()
      formData.append('ovenName', ovenName)
      formData.append('ovenDetail', ovenDetail)
      formData.append('bankName', bankName)
      formData.append('wishCategory', wishCategory.join(','))
      formData.append('account', account)
      formData.append('accountName', accountName)
      if (image) formData.append('image', image)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      // eslint-disable-next-line prefer-const
      response = await privateApi.post('/api/oven', formData, config)

      if (response.status === 200) {
        localStorage.removeItem('createOvenState')
        queryClient.invalidateQueries({ queryKey: ['user-oven-list'] })
        return response.status
      }
      localStorage.removeItem('createOvenState')
      return response.data
    },
  })

  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [invitedUsers, setInvitedUsers] = useState<UserType[]>([])

  const { mutate: inviteMemberFn } = useMutation({
    mutationFn: async (userId: number) => {
      const response = await privateApi.post(`/api/oven/invite`, {
        ovenId,
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
        `/api/oven/${ovenId}/search/user/${userEmail}`,
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.userId === null) {
        toast.error('일치하는 아이디의 유저가 없습니다.')
      } else {
        setInvitedUsers((prev) => [...prev, data])
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

  if (isLoading) return <Loader />

  if (isError) return <div>Error... {error.message}</div>

  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step4SVG className="w-64" />
      </div>

      <p className="text-3xl">(선택) 오븐에 멤버를 초대하세요.</p>

      <div className="flex flex-col gap-y-3">
        <label
          className="pt-7 flex items-start gap-x-1 text-2xl"
          htmlFor="ovenpeople"
        >
          <span>초대하려는 유저의 이메일을 입력해주세요.</span>
        </label>
        <div className="py-6 px-8 border-2 border-border relative rounded-xl">
          <input
            type="text"
            id="ovenpeople"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pr-20 outline-none text-2xl"
            placeholder="공백 포함 최대 30자 작성 가능합니다."
          />

          <button
            type="button"
            onClick={inviteMember}
            className="px-5 py-2 absolute right-5 rounded-xl text-2xl bg-primary bottom-[50%] transform translate-y-1/2"
          >
            초대
          </button>
        </div>
      </div>

      <div className="p-5 border-border border rounded-xl">
        <p className="text-2xl pb-3">초대 목록</p>
        <div className="flex flex-col gap-y-3 max-h-[31.25rem] overflow-y-scroll">
          {!invitedUsers.length ? (
            <div className="py-8 flex items-center justify-center text-disabled text-xl">
              초대된 구성원이 없습니다.
            </div>
          ) : (
            invitedUsers?.map((user: UserType, index: number) => (
              <OvenPeopleCard key={user.userId} user={user} index={index} />
            ))
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push('/oven/register/join')}
        className="py-7 flex items-center justify-center rounded-xl button text-2xl bg-primary"
      >
        오븐 등록 완료
      </button>
    </div>
  )
}

export default OvenPeopleRegister
