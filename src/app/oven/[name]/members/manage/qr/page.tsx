'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
// eslint-disable-next-line import/no-extraneous-dependencies
import { OnResultFunction, QrReader } from 'react-qr-reader'

import { privateApi } from '@/api/config/privateApi.ts'

function QRReaderPage() {
  const param = useParams()
  const [data, setData] = useState('')
  const [rtcConst, setRtcConst] = useState('environment')

  const [modal, setModal] = useState<boolean>(false)

  const queryClinet = useQueryClient()
  const { mutate: enterQRcode } = useMutation({
    mutationFn: async (code: string) => {
      const response = await privateApi.post('/api/qr/check', { QR: code })
      return response.data
    },

    onSuccess: () => {
      queryClinet.invalidateQueries({
        queryKey: ['reservedMemberList', param.name],
      })
      toast.success('입장 등록이 완료되었습니다.')
    },

    onError: () => {
      toast.error('유효하지 않은 QR 코드입니다.')
    },
  })

  const handleScan: OnResultFunction = (result, error) => {
    if (result) {
      setData(result?.getText())
      setModal(true)
    }

    if (error) {
      // eslint-disable-next-line no-console
      console.info(error)
    }
  }

  const enterUser = () => {
    enterQRcode(data)
    setModal(false)
    setData('')
  }

  const handleConstraints = () => {
    setRtcConst(rtcConst === 'environment' ? 'user' : 'environment')
  }

  return (
    <div className="relative w-full h-[81.25rem] flex flex-col items-center overflow-hidden">
      <div className="absolute w-full h-[81.25rem] z-20" />
      <QrReader
        videoId="scanner"
        constraints={{ facingMode: rtcConst, aspectRatio: { ideal: 1 } }}
        scanDelay={250}
        onResult={handleScan}
        videoContainerStyle={{
          position: 'relative',
          top: '0',
          left: '0',
          padding: '0',
          width: '81.25rem',
          height: '81.25rem',
          display: modal ? 'none' : 'block',
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        ViewFinder={() => (
          <div className="w-full absolute top-1/4 z-40 flex flex-col items-center justify-center gap-y-8">
            <button
              type="button"
              onClick={handleConstraints}
              className="py-4 flex items-center justify-center bg-primary text-xl rounded-xl w-80"
            >
              카메라 전환
            </button>
            <div className="w-80 h-80 flex items-center justify-center border-8 border-primary rounded-xl bg-white bg-opacity-50" />
            <span className="text-white text-xl text-center">
              사각 테두리 안에
              <br />
              QR 코드 ( 모바일 티켓 )을 스캔해주세요
            </span>
          </div>
        )}
      />

      <div
        className={`${modal ? '' : 'hidden'} w-full px-10 h-[100dvh] fixed z-50 left-0 top-0 flex items-center justify-center bg-[#4C4C4C] bg-opacity-80`}
      >
        <div className="w-full rounded-xl max-w-[500px] pt-8 flex flex-col justify-center items-center bg-white bottom-0">
          <div className="w-full text-xl">
            <p className="text-3xl py-8 text-center border-b border-border">
              입장 등록하시겠습니까?
            </p>

            <div className="gap-x-5 flex justify-between items-center">
              <button
                onClick={() => setModal(false)}
                type="button"
                className="py-8 border-r border-border flex-1 flex items-center justify-center text-warning"
              >
                아니오
              </button>

              <button
                type="button"
                onClick={enterUser}
                className="py-8 flex-1 flex items-center justify-center rounded-xl"
              >
                추가하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRReaderPage
