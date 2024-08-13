import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import Loader from '@/components/loader/index.tsx'
import CheckGIF from '@/static/gif/checked.gif'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step4SVG from '@/static/svg/oven/oven-register-step4.svg'

import useCreateOvenStore from '@/store/CreateOvenStore.ts'

function OvenJoinRegister() {
  const ovenName = useCreateOvenStore((state) => state.ovenName)
  const ovenDetail = useCreateOvenStore((state) => state.ovenDetail)
  const bankName = useCreateOvenStore((state) => state.bankName)
  const wishCategory = useCreateOvenStore((state) => state.wishCategory)
  const account = useCreateOvenStore((state) => state.account)
  const accountName = useCreateOvenStore((state) => state.accountName)
  const image = useCreateOvenStore((state) => state.image)

  const { isLoading, isError, error } = useQuery({
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
        return response.status
      }
      localStorage.removeItem('createOvenState')
      throw new Error(`Request failed with status ${response.status}`)
    },
  })
  const router = useRouter()

  if (isLoading) return <Loader />

  if (isError) return <div>Error... {error.message}</div>
  return (
    <div className="pt-14 pb-[6.25rem] px-7 flex flex-col gap-y-14">
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step4SVG className="w-64" />
      </div>

      <div className="pt-[4.375rem] pb-40 flex flex-col gap-y-14 items-center justify-center">
        <Image src={CheckGIF} alt="완료이미지" />
        <div className="flex flex-col items-center justify-center gap-y-6">
          <p className="text-3xl font-bold">이세계 아이돌</p>
          <p className="text-2xl">오븐이 성공적으로 등록되었습니다.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push('/oven/my')}
        className="py-7 flex items-center justify-center  rounded-xl button text-2xl bg-primary !text-black"
      >
        오븐 관리 페이지로 이동
      </button>
    </div>
  )
}

export default OvenJoinRegister
