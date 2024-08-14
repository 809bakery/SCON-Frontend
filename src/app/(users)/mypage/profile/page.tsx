/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import { nicknameRegExp } from '@/constants/regex/index.ts'
import DefaultProfile from '@/static/img/dummy/profile/default-profile.jpg'
import Checked from '@/static/svg/checked-icon.svg'
import XMarkSVG from '@/static/svg/close-circle-icon.svg'
import Required from '@/static/svg/required-star.svg'
import UploadSVG from '@/static/svg/upload-icon.svg'

export default function Profile() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })
  const [nickname, setNickname] = useState<string>(user?.nickname ?? '')
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<
    string | null
  >(null)
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false)
  const [isNicknameCheckSuccess, setIsNicknameCheckSuccess] =
    useState<boolean>(false)
  const [imageFile, setImageFile] = useState<File | string>()
  const [imageUrl, setImageUrl] = useState<string | null>(user?.image ?? '')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { mutate: submitProfile } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('nickname', nickname)
      if (imageFile instanceof File) {
        formData.append('image', imageFile)
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const response = await privateApi.patch(
        `/api/user/edit/info`,
        formData,
        config,
      )

      return response.data
    },

    onSuccess: () => {
      toast.success('프로필이 저장되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
      router.push(`/mypage`)
    },

    onError: () => {
      toast.error('프로필 저장에 실패했습니다.')
    },
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const {
      target: { files },
    } = e

    if (files?.length === 0) {
      return
    }

    const file = files?.[0]
    setImageFile(file as File)
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as Blob)
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }: any = finishedEvent
      setImageUrl(result)
    }
    closeModal()
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // 모달 백그라운드 클릭 시 모달 닫기
  const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  const handleProfileImageChangeClick = () => {
    closeModal()
    fileInputRef.current?.click() // 파일 입력 요소를 클릭합니다.
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e
    setNickname(value)
    if (nicknameRegExp.test(value)) {
      setNicknameErrorMessage(null)
      setIsNicknameValid(true)
      setIsNicknameCheckSuccess(true)
    } else if (value.length === 0) {
      setNicknameErrorMessage(null)
      setIsNicknameValid(false)
      setIsNicknameCheckSuccess(false)
    } else {
      setNicknameErrorMessage('2~8자의 한글, 영문, 숫자만 입력 가능합니다.')
      setIsNicknameValid(false)
      setIsNicknameCheckSuccess(false)
    }
  }

  return (
    <>
      <div className="w-full px-7 pt-[100px]">
        {imageUrl ? (
          <div className="flex justify-center items-center mb-5">
            <div
              role="presentation"
              className="relative cursor-pointer"
              onClick={showModal}
            >
              <div className="relative w-40 h-40  rounded-full overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="profile"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <UploadSVG className="w-11 h-11 absolute bottom-0 right-0" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mb-5">
            <div
              role="presentation"
              className="relative w-40 h-40  rounded-full cursor-pointer"
              onClick={showModal}
            >
              <Image
                src={DefaultProfile}
                alt="profile"
                width={160}
                height={160}
                layout="fixed"
                className="rounded-full"
              />
              <UploadSVG className="w-11 h-11 absolute bottom-0 right-0" />
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          id="file-input"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        {/* 닉네임 입력 */}
        <div className="flex flex-col gap-4 mt-10">
          <label
            htmlFor="nickname"
            className="font-normal text-2xl flex space-x-1"
          >
            <span>닉네임</span>
            <Required />
          </label>
          <div className="flex flex-col gap-3">
            <div className="border-2 border-border  rounded-xl focus-within:border-primary flex justify-between px-4  py-6">
              <input
                id="nickname"
                type="text"
                name="nickname"
                autoComplete="off"
                placeholder="닉네임을 입력해주세요."
                onChange={onChange}
                value={nickname}
                className="w-full px-4 text-2xl rounded-xl outline-none font-medium leading-8"
              />
              <div className="flex space-x-2">
                {isNicknameValid && isNicknameCheckSuccess && (
                  <div className="min-w-min">
                    <Checked className="w-7 h-7" />
                  </div>
                )}
                {nickname.length > 0 && (
                  <XMarkSVG
                    onClick={() => {
                      setNickname('')
                      setNicknameErrorMessage(null)
                      setIsNicknameValid(false)
                      setIsNicknameCheckSuccess(false)
                    }}
                    className="w-7 h-7 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {nicknameErrorMessage && (
          <p className="whitespace-pre-wrap text-warning pl-4">
            {nicknameErrorMessage}
          </p>
        )}
        {isNicknameCheckSuccess && (
          <p className="whitespace-pre-wrap text-success pl-4">
            사용 가능한 닉네임입니다.
          </p>
        )}
        <button
          type="button"
          className="w-full py-7 text-2xl font-medium bg-primary rounded-xl mt-[11.25rem]"
          onClick={() => submitProfile()}
        >
          저장
        </button>
      </div>
      {isModalOpen && (
        <div
          role="presentation"
          className="w-full h-full  flex-col   bg-[rgba(76,76,76,0.8)] fixed top-0 left-0 z-50 flex justify-end items-center pb-20 gap-6"
          onClick={handleModalBackgroundClick}
        >
          <div
            role="presentation"
            className="w-[31.25rem] h-[10rem] divide-y divide-solid bg-white rounded-xl text-xl font-medium leading-7"
          >
            <label
              role="presentation"
              htmlFor="file-input"
              onClick={handleProfileImageChangeClick}
              className="w-full h-[5rem] flex items-center justify-center cursor-pointer"
            >
              <span>프로필 이미지 수정</span>
            </label>
            <button
              type="button"
              className="w-full h-[5rem]"
              onClick={() => {
                setImageUrl(null)
                closeModal()
              }}
            >
              기본 이미지로 변경
            </button>
          </div>
          <button
            type="button"
            className="w-[31.25rem] h-[5rem] bg-white rounded-xl text-warning text-xl font-medium leading-7"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      )}
    </>
  )
}
