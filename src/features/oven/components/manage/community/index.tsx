import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import CommunityContentCard from '@/app/oven/detail/[name]/_components/CommunityContentCard.tsx'
import Loader from '@/components/loader/index.tsx'
import PhotoSVG from '@/static/svg/oven/oven-photo-icon.svg'

interface CommunityType {
  ovenCommunityId: number
  nickname: string
  profile: string
  content: string
  image: string
  bestCount: number
  expectCount: number
  congratulationCount: number
  tearCount: number
  cheerCount: number
  createdAt: string
  reaction: string
}

function OvenCommunity() {
  const [comment, setComment] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [imageFile, setImageFile] = useState<File | string>()
  const segement = usePathname().split('/')[2]

  const queryClient = useQueryClient()

  const { data: loginUser } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  const { mutate: createCommunity } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('ovenId', segement)
      formData.append('content', comment)
      if (imageFile) formData.append('image', imageFile)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const response = await privateApi.post(
        '/api/oven/community',
        formData,
        config,
      )

      return response.data
    },
    onError: () => {
      toast.error('글 등록에 실패했습니다.')
    },
    onSuccess: () => {
      toast.success('글이 등록되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['list_oven_community', segement],
      })
      setComment('')
      setImage('')
    },
  })

  const loaderRef = useRef(null)
  const {
    data: communityList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['list_oven_community', segement],
    queryFn: async ({ pageParam = null }) => {
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''
      const response = await privateApi.get(
        `/api/oven/community?ovenId=${segement}${cursorParam}`,
      )
      return response.data
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursor === -1 ? null : lastPage.cursor
    },
    initialPageParam: null,
    select: (data) => (data?.pages ?? []).flatMap((page) => page.content),
  })

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    })

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [hasNextPage, fetchNextPage])

  const submitContent = () => {
    if (!comment) {
      toast.error('내용 입력은 필수입니다.')
      return
    }
    createCommunity()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="p-7 bg-[#FAFAFA]">
      {/* 글 남기기 */}
      <div className="bg-white flex flex-col gap-y-3 border border-border rounded-xl p-5">
        <h3 className="font-bold">커뮤니티 글 남기기</h3>
        <div className="flex items-center gap-x-2">
          {loginUser && (
            <Image
              width={34}
              height={34}
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
      <div className="w-full flex flex-col gap-3 py-14">
        {isLoading ? (
          <div className="w-full px-5 py-20 bg-gray-200 rounded-xl shrink-0 animate-pulse">
            {' '}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {communityList?.map((data: CommunityType) => (
              <CommunityContentCard
                key={data?.ovenCommunityId}
                communityId={data?.ovenCommunityId}
                content={data?.content}
                image={data?.image}
                bestCount={data?.bestCount}
                expectCount={data?.expectCount}
                congratulationCount={data?.congratulationCount}
                tearCount={data?.tearCount}
                cheerCount={data?.cheerCount}
                createdAt={data?.createdAt}
                nickname={data?.nickname}
                profile={data?.profile}
                reaction={data?.reaction}
              />
            ))}
          </div>
        )}

        <div ref={loaderRef}>{isFetchingNextPage && <Loader />}</div>
      </div>
    </div>
  )
}

export default OvenCommunity
