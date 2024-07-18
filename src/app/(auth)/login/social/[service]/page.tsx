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
        router.push('/signup/basic')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        router.push('/')
      })
  }

  login()
}

export default SocialRedirectPage
