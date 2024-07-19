'use client'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

function SocialRedirectPage({ params }: { params: { service: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const login = async () => {
    axios
      .post(`${process.env.ROOT_API_URL}/api/auth/log-in/social/`, {
        social: params.service,
        code: searchParams.get('code'),
      })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res)
        // eslint-disable-next-line no-alert
        alert('로그인 성공🍪🍪')
        router.push('/signup/basic')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        // eslint-disable-next-line no-alert
        alert(
          `아직 소셜 로그인은 준비 중입니다🍪\n ${params.service}의 ${searchParams.get('code')}코드는 확인되었어요!\n 로그인 페이지로 돌아갈게요`,
        )
        router.push('/login')
      })
  }

  login()
}

export default SocialRedirectPage
