'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image, { StaticImageData } from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import Loader from '@/components/loader/index.tsx'
import { CATEGORY_MAP, CATEGORY_OBJ_MAP } from '@/constants/stage/info/index.ts'
import RequiredSVG from '@/static/svg/required-star.svg'
import SquareFillSVG from '@/static/svg/square-fill-icon.svg'
import SquareUnfillSVG from '@/static/svg/square-unfill-icon.svg'

function OvenSettingProfile() {
  const [ovenName, setOvenName] = useState<string>('')
  const [ovenDetail, setOvenDetail] = useState<string>('')
  const [wishCategory, setWishCategory] = useState<string[]>([])
  const [image, setImage] = useState<string | StaticImageData>('')
  const [imageFile, setImageFile] = useState<File | string>()

  const router = useRouter()
  const segment = usePathname().split('/')[2]

  const { isLoading, isFetching } = useQuery({
    queryKey: ['ovenInfo', segment],
    queryFn: async () => {
      const response = await privateApi.get(`/api/oven/${segment}`)
      if (response.data) {
        setOvenName(response.data.ovenName)
        setOvenDetail(response.data.ovenDetail)
        setWishCategory(response.data.wishCategory)
        setImage(response.data.image)
      }

      return response.data
    },
    staleTime: 0,
  })

  const queryClient = useQueryClient()

  const { mutate: submitProfile } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('ovenName', ovenName)
      formData.append('ovenDetail', ovenDetail)
      formData.append('wishCategory', wishCategory.join(','))
      if (imageFile) formData.append('image', imageFile)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const response = await privateApi.patch(
        `/api/oven/${segment}`,
        formData,
        config,
      )

      return response.data
    },

    onSuccess: () => {
      toast.success('프로필이 저장되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['ovenInfo', segment] })
      router.push(`/oven/${segment}`)
    },

    onError: () => {
      toast.error('프로필 저장에 실패했습니다.')
    },
  })

  const saveProfile = () => {
    if (!ovenName) {
      toast.error('오븐명은 필수 입력 사항입니다.')
      return
    }

    if (wishCategory.length === 0) {
      toast.error('스테이지 분야는 필수 입력 사항입니다.')
      return
    }

    submitProfile()
  }

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e

    if (files?.length === 0) {
      return
    }

    const file = files?.[0]
    setImageFile(file)
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file as Blob)
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }: any = finishedEvent
      setImage(result)
    }
  }

  const handleCheck = (category: string) => {
    if (wishCategory.includes(category)) {
      setWishCategory(wishCategory.filter((v) => v !== category))
    } else {
      setWishCategory([...wishCategory, category])
    }
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="flex flex-col relative">
      <div className="h-[12.5rem] bg-primary bg-opacity-50" />
      {/* profile */}
      <div className="absolute left-[50%] top-[12.5rem] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
        <label htmlFor="oven-profile-file" className="cursor-pointer">
          <Image
            src={image}
            alt="oven-profile"
            width={200}
            height={200}
            className="w-52 h-52 rounded-xl"
          />
        </label>
        <input
          type="file"
          name="oven-profile-file"
          id="oven-profile-file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImage}
        />
      </div>

      <div className="py-32 px-7 flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-3">
          <label
            htmlFor="oven-manage-profile-ovenname"
            className="flex items-start gap-x-1 text-2xl cursor-pointer"
          >
            <span>오븐명</span>
            <RequiredSVG className="w-3 h-3" />
          </label>
          <input
            id="oven-manage-profile-ovenname"
            type="text"
            className="px-8 border border-border rounded-xl text-2xl py-5 w-full focus:outline-none"
            value={ovenName}
            onChange={(e) => setOvenName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-3">
          <label
            htmlFor="oven-manage-profile-ovenname"
            className="text-2xl cursor-pointer"
          >
            한 줄 소개
          </label>
          <input
            id="oven-manage-profile-ovendetail"
            type="text"
            className="px-8 border border-border rounded-xl text-2xl py-5 w-full focus:outline-none"
            value={ovenDetail}
            onChange={(e) => setOvenDetail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-3">
          <div className="flex items-start gap-x-1 text-2xl cursor-pointer">
            <span>스테이지 분야</span>
            <RequiredSVG className="w-3 h-3" />
          </div>
          <div className="flex justify-between items-center gap-x-6 gap-y-3 flex-wrap">
            {CATEGORY_MAP.map((category) => (
              // 공연', '강연', '소모임', '기타
              <button
                key={category}
                type="button"
                onClick={() => handleCheck(category)}
                className="w-[45%] px-7 py-4 flex items-center gap-x-7 text-disabled border border-border rounded-xl"
              >
                <div id="oven-delete-checkbox">
                  {wishCategory.includes(category) ? (
                    <SquareFillSVG className="w-8 h-8" />
                  ) : (
                    <SquareUnfillSVG className="w-8 h-8" />
                  )}
                </div>

                <span className="text-black">{CATEGORY_OBJ_MAP[category]}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={saveProfile}
          className={`mt-40 py-7 text-2xl bg-[#E5E5ED] text-disabled rounded-xl flex items-center justify-center ${ovenName && wishCategory.length && '!bg-primary !text-black'} `}
        >
          저장하기
        </button>
      </div>
    </div>
  )
}

export default OvenSettingProfile
