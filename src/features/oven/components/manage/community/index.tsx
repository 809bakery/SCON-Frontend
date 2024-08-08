import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import CommunityContentCard from '@/app/oven/detail/[name]/_components/CommunityContentCard.tsx'
import { DUMMY_COMMUNITY_DATA } from '@/constants/oven/manage/community/index.ts'
import PhotoSVG from '@/static/svg/oven/oven-photo-icon.svg'

interface UserType {
  nickname: string
  email: string
  image: string | StaticImageData
  isOvener: boolean
}

function OvenCommunity() {
  const [comment, setComment] = useState<string>('')
  const [loginUser, setLoginUser] = useState<UserType>()
  const [image, setImage] = useState<string | StaticImageData>('')

  useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem('user')!))
  }, [])

  const submitContent = () => {
    if (!comment) {
      toast.error('내용을 입력해주세요.')
      return
    }

    toast.success('글이 등록되었습니다.')
    setComment('')
    setImage('')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e

    if (files?.length === 0) {
      return
    }

    const file = files?.[0]
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

  return (
    <div className="p-7">
      {/* 글 남기기 */}
      <div className="flex flex-col gap-y-3 border border-border rounded-xl p-5">
        <h3 className="font-bold">커뮤니티 글 남기기</h3>
        <div className="flex items-center gap-x-2">
          {loginUser && (
            <Image
              src={loginUser?.image}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="font-bold">{loginUser?.nickname}</span>
        </div>
        <textarea
          placeholder="글을 입력해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full min-h-[5.5rem] text-xs text-disabled rounded-xl border border-border p-4 resize-none outline-none"
        />
        <div className="flex justify-between items-end">
          {image ? (
            <Image
              src={image}
              alt="image"
              className="max-w-32 object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="flex-1 flex items-center gap-x-2 text-xs overflow-x-hidden">
              <PhotoSVG className="w-7 h-7" />
              <label
                htmlFor="oven-community-photo-input"
                className="cursor-pointer"
              >
                사진 첨부
              </label>
              <input
                type="file"
                name="oven-community-photo-input"
                id="oven-community-photo-input"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}
          <button
            type="button"
            onClick={submitContent}
            className="text-xs bg-primary rounded-xl px-5 py-1"
          >
            등록
          </button>
        </div>
      </div>

      {/* 글 목록 */}
      <div className="flex flex-col gap-3 py-14">
        {DUMMY_COMMUNITY_DATA.map((data) => (
          <CommunityContentCard
            key={data.ovenCommunityId}
            content={data.content}
            image={data.image || ''}
            bestCount={data.bestCount || 0}
            expectCount={data.expectCount || 0}
            congratulationCount={data.congratulationCount || 0}
            tearCount={data.tearCount || 0}
            cheerCount={data.cheerCount || 0}
            createdAt={data.createdAt}
            nickname={data.nickname}
            profile={data.profile}
          />
        ))}
      </div>
    </div>
  )
}

export default OvenCommunity
