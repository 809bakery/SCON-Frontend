'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

// eslint-disable-next-line import/extensions
import { privateApi } from '@/api/config/privateApi.ts'
import { getTokenHandler } from '@/firebase/firebasedb.ts'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step4SVG from '@/static/svg/progress/progress-step4.svg'
import AlarmSVG from '@/static/svg/push-alarm-icon.svg'

function PushStep() {
  const router = useRouter()
  const [token, setToken] = useState('')

  const postPush = async () => {
    await handleToken()
    postPushFn()
  }

  const { mutate: postPushFn } = useMutation({
    mutationFn: async () => {
      await privateApi.post('/api/notification/regist', { token })
    },
  })

  const getToken = async () => {
    const tk = await getTokenHandler()
    // eslint-disable-next-line no-console
    setToken(tk)
  }
  const handleToken = async () => {
    if (!('Notification' in window)) {
      toast.error('푸시 알림을 지원하지 않는 브라우저입니다.')
      router.push('/signup/join')
      return
    }
    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          // eslint-disable-next-line no-console
          toast.promise(getToken(), {
            loading: '푸시 알림을 허용 중...',
            success: '푸시 알림이 허용되었습니다.',
            error: (err) =>
              `푸시 알림을 허용하는 중 오류가 발생했습니다. ${err}`,
          })
          router.push('/signup/join')
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }
  return (
    <div className="px-7 pt-14 pb-20 flex flex-col">
      {/* 로고 */}
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step4SVG className="w-80" />
      </div>
      <div className="flex-1 pt-32 pb-48 flex flex-col gap-y-10 items-center justify-center">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-primary">
          <AlarmSVG className="w-14 h-14" />
        </div>
        <h3 className="text-4xl font-bold">푸시 알림 받기</h3>
        <div className="flex flex-col text-2xl items-center justify-center">
          <p>알림을 허용하면</p>
          <p>스콘의 다양한 정보를 빠르게 확인할 수 있어요!🍰</p>
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <button
          type="button"
          onClick={postPush}
          className="text-2xl py-7 flex items-center justify-center bg-primary rounded-xl"
        >
          알림 받기
        </button>
        <button
          type="button"
          onClick={() => router.push('/signup/join')}
          className="text-disabled text-xl underline"
        >
          다음에 할게요.
        </button>
      </div>
    </div>
  )
}

export default PushStep
