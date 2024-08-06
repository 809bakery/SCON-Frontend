'use client'

import { getTokenHandler } from '@/firebase/firebasedb.ts'

function PushTestPage() {
  const getToken = async () => {
    const token = await getTokenHandler()
    // eslint-disable-next-line no-console
    console.log(token)
  }
  const handleToken = async () => {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-console
      alert('푸시 알림을 지원하지 않는 브라우저입니다.')
      return
    }
    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          // eslint-disable-next-line no-console
          getToken()
        } else {
          // eslint-disable-next-line no-console
          console.log('Unable to get permission to notify.')
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  }
  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        className="bg-primary px-4 py-8"
        onClick={handleToken}
      >
        푸시알림 수신
      </button>
    </div>
  )
}

export default PushTestPage
