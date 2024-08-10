/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { publicApi } from '@/api/config/publicApi.ts'
// import { setToken } from '@/utils/cookie/index.ts'

function SocialRedirectPage({ params }: { params: { service: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['social'],
    queryFn: async () => {
      const response = await publicApi.post('/api/auth/log-in/social', {
        social: params.service,
        code: searchParams.get('code'),
      })

      return response.data
    },
  })
  // useEffect(() => {
  //   login()
  // }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (data) {
    console.log(data)
    if (data.nickname.includes('_')) {
      toast.success(`아직 회원이 아니시군요\n회원가입을 시작합니다!`)
      router.push('/signup/basic')
    } else {
      toast.success('로그인 성공!')
      router.push('/main')
    }
  }

  // async function login() {
  //   try {
  //     const response = await publicApi.post('/api/auth/log-in/social', {
  //       social: params.service,
  //       code: searchParams.get('code'),
  //     })

  //     if (response.status === 200) {
  //       // eslint-disable-next-line @typescript-eslint/dot-notation
  //       const accessToken = response.headers['authorization']
  //       const refreshToken = response.headers['authorization-refresh']

  //       console.log(response)

  //       // 쿠키에 토큰 저장
  //       setToken('ACCESS_TOKEN', accessToken)
  //       setToken('REFRESH_TOKEN', refreshToken)

  //       if (response.data.nickname.includes('_')) {
  //         toast.success(`아직 회원이 아니시군요\n회원가입을 시작합니다!`)
  //         router.push('/signup/basic')
  //       } else {
  //         toast.success('로그인 성공!')
  //         router.push('/main')
  //       }
  //     }
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.error(error)
  //     alert(
  //       `아직 소셜 로그인은 준비 중입니다🍪\n ${params.service}의 ${searchParams.get('code') as string}코드는 확인되었어요!\n 로그인 페이지로 돌아갈게요`,
  //     )
  //     router.push('/login')
  //   }
  // }
}

export default SocialRedirectPage

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-unused-expressions */

// 'use client'

// import { useQuery } from '@tanstack/react-query'
// import { useRouter, useSearchParams } from 'next/navigation'

// import { publicApi } from '@/api/config/publicApi.ts'
// import Loader from '@/components/loader/index.tsx'

// import useSignupStore from '@/store/SignupStore.ts'

// function SocialRedirectPage({ params }: { params: { service: string } }) {
//   const setType = useSignupStore((state) => state.setType)

//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ['social'],
//     queryFn: async () => {
//       const response = await publicApi.post('/api/auth/log-in/social', {
//         social: params.service,
//         code: searchParams.get('code'),
//       })

//       return response.data
//     },
//   })

//   if (isLoading) {
//     return <Loader />
//   }

//   if (isError) {
//     return <div>Error...</div>
//   }

//   if (!isLoading && data) {
//     if (data.nickname.includes('_')) {
//       setType('social')
//       router.push('/signup/profile')
//     } else {
//       router.push('/main')
//     }
//   }
// }

// export default SocialRedirectPage
