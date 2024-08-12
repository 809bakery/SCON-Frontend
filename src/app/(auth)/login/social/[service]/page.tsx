/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { publicApi } from '@/api/config/publicApi.ts'
import Loader from '@/components/loader/index.tsx'
import { removeTokenAll, setToken } from '@/utils/cookie/index.ts'

import useSignupStore from '@/store/SignupStore.ts'

function SocialRedirectPage({ params }: { params: { service: string } }) {
  const setType = useSignupStore((state) => state.setType)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    login()
  }, [])

  async function login() {
    try {
      const response = await publicApi.post('/api/auth/log-in/social', {
        social: params.service,
        code: searchParams.get('code'),
      })

      if (response.status === 200) {
        setType('social')
        // eslint-disable-next-line @typescript-eslint/dot-notation
        const accessToken = response.data['Authorization']
        const refreshToken = response.data['Authorization-refresh']

        setToken('ACCESS_TOKEN', accessToken)
        setToken('REFRESH_TOKEN', refreshToken)

        if (response.data.nickname.includes('_')) {
          toast.success(`아직 회원이 아니시군요\n회원가입을 시작합니다!`)
          router.push('/signup/profile')
        } else {
          toast.success('로그인 성공!')
          router.push('/main')
        }
      }
    } catch (error) {
      removeTokenAll()
      router.push('/login')
    }
  }

  if (isLoading) {
    return <Loader />
  }
}

export default SocialRedirectPage
