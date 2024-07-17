'use client'

import { useEffect, useState } from 'react'

import A2HSLogoSVG from '@/static/svg/a2hs-icon.svg'

import type { BeforeInstallPromptEvent } from '@/types/pwa.d.ts'

function A2HSModal() {
  const [a2hs, setA2hs] = useState<BeforeInstallPromptEvent | undefined>(
    undefined,
  )

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setA2hs(e)
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        // eslint-disable-next-line no-console
        .then((reg) => console.log('service worker registered', reg))
        // eslint-disable-next-line no-console
        .catch((err) => console.log('service worker not registered', err))
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  const installApp = async () => {
    if (a2hs) {
      a2hs.prompt()
      a2hs.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          // eslint-disable-next-line no-console
          console.log('User accepted the A2HS prompt')
        } else {
          // eslint-disable-next-line no-console
          console.log('User dismissed the A2HS prompt')
        }
        setA2hs(undefined)
      })
    }
  }

  return (
    <div
      className={`${a2hs ? '' : 'hidden'} w-full h-[100dvh] fixed flex items-end justify-center bg-[#4C4C4C] bg-opacity-80`}
    >
      <div className="w-full max-w-[600px] px-7 py-8 flex flex-col justify-center items-center rounded-t-3xl bg-white bottom-0 z-50">
        <A2HSLogoSVG className="w-40 h-40" />
        <div className="w-full text-xl">
          <p className="text-3xl py-8 text-center">
            SCON 바로가기를 추가하시겠어요?
          </p>

          <div className="gap-x-5 flex justify-between items-center">
            <button
              onClick={() => setA2hs(undefined)}
              type="button"
              className="py-6 flex-1 flex items-center justify-center bg-[#E5E5ED] rounded-xl text-[#6B6E78]"
            >
              취소
            </button>

            <button
              onClick={installApp}
              type="button"
              className="py-6 flex-1 flex items-center justify-center bg-[#FFC90D] rounded-xl"
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default A2HSModal
