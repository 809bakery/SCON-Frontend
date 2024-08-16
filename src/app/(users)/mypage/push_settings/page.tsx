'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import { getTokenHandler } from '@/firebase/firebasedb.ts'
import IndicatorSVG from '@/static/svg/indicator-icon.svg'

export default function PushSettings() {
  const [token, setToken] = useState('')
  const { data: status } = useQuery({
    queryKey: ['push-status'],
    queryFn: async () => {
      const response = await privateApi.get('/api/notification/status')
      return response.data
    },
  })

  const queryClient = useQueryClient()
  const { mutate: postPushFn } = useMutation({
    mutationFn: async () => {
      if (status?.status === 'NONE') {
        await handleToken()
        await privateApi.post('/api/notification/regist', { token })
      } else {
        await privateApi.patch('/api/notification/toggle')
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push-status'] })
    },
  })

  const postPush = () => {
    postPushFn()
  }

  const getToken = async () => {
    const tk = await getTokenHandler()
    // eslint-disable-next-line no-console
    setToken(tk)
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
    <>
      <div className="flex flex-col divide-y divide-solid">
        <div className="px-12 py-6 flex justify-between">
          <span className="text-xl font-bold leading-7">알림 수신</span>
          <div
            role="presentation"
            className={`flex h-[2.5rem] border border-border rounded-[1.25rem] px-1 items-center cursor-pointer ${status?.status === 'ACTIVE' ? 'bg-primary' : ''}`}
            onClick={postPush}
          >
            <div className="w-16 h-8">
              <IndicatorSVG
                fill={status?.status === 'ACTIVE' ? '#FFFFFF' : '#E5E5ED'}
                className={`w-8 h-8 rounded-full bg-white transition-all duration-300 ease-in-out ${status?.status === 'ACTIVE' ? 'translate-x-full' : 'translate-x-0'}`}
              />
            </div>
          </div>
        </div>
        <div className="px-12 py-6 flex flex-col">
          <span className="text-xl font-bold leading-7">알림 내용</span>
        </div>
      </div>
      <div className="w-full border-t border-b border-lightgray-1 divide-y divide-lightgray-1">
        <li className="px-[3.75rem] py-[.625rem] text-base font-medium leading-6 text-disabled">
          예매한 스테이지 시작 1시간 전 알림
        </li>
        <li className="px-[3.75rem] py-[.625rem] text-base font-medium leading-6 text-disabled">
          팔로우한 오븐의 커뮤니티 새 글
        </li>
      </div>
    </>
  )
}
