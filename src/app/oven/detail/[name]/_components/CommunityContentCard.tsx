/* eslint-disable no-nested-ternary */

'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import { getAccessToken } from '@/utils/cookie/index.ts'

interface CommunityContentCardProps {
  communityId: number
  content?: string
  image: string | null
  bestCount?: number
  expectCount?: number
  congratulationCount?: number
  tearCount?: number
  cheerCount?: number
  createdAt?: string
  nickname: string
  profile: string
  reaction: string
  refetchOvenCommunity?: () => void
}

export default function CommunityContentCard({
  communityId,
  content,
  image,
  bestCount,
  expectCount,
  congratulationCount,
  tearCount,
  cheerCount,
  createdAt,
  nickname,
  profile,
  reaction,
  refetchOvenCommunity,
}: CommunityContentCardProps) {
  const contentRef = useRef<HTMLSpanElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const [bestCountState, setBestCountState] = useState(false)
  const [expectCountState, setExpectCountState] = useState(false)
  const [congratulationCountState, setCongratulationCountState] =
    useState(false)
  const [tearCountState, setTearCountState] = useState(false)
  const [cheerCountState, setCheerCountState] = useState(false)

  const queryClient = useQueryClient()
  const segment = usePathname().split('/')[2]

  const { mutate: deleteReaction } = useMutation({
    mutationFn: async () => {
      const response = await privateApi.delete(
        `/api/oven/community/${communityId}/reaction`,
      )
      return response.data
    },
    onError: () => {
      toast.error('응답이 반영되지 않았습니다.')
    },
    onSuccess: () => {
      toast.success('응답이 성공적으로 반영되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['list_oven_community', segment],
      })
      refetchOvenCommunity?.()
    },
  })
  const { mutate: postReaction } = useMutation({
    mutationFn: async (res: string) => {
      const response = await privateApi.post(
        `/api/oven/community/${communityId}/reaction/${res}`,
      )
      return response.data
    },
    onError: () => {
      toast.error('응답이 반영되지 않았습니다.')
    },
    onSuccess: () => {
      toast.success('응답이 성공적으로 반영되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['list_oven_community', segment],
      })

      refetchOvenCommunity?.()
    },
  })

  useLayoutEffect(() => {
    setBestCountState(reaction === 'best')
    setExpectCountState(reaction === 'expect')
    setCongratulationCountState(reaction === 'congratulation')
    setTearCountState(reaction === 'tear')
    setCheerCountState(reaction === 'cheer')
  }, [reaction])

  // 응답 여부와 응답 타입을 state로 관리
  const [isResponsed, setIsResponsed] = useState(false)
  const [respondedType, setRespondedType] = useState<string | null>(null)
  // 응답 여부 업데이트 로직 추가
  useEffect(() => {
    setIsResponsed(
      bestCountState ||
        expectCountState ||
        congratulationCountState ||
        tearCountState ||
        cheerCountState,
    )

    if (bestCountState) {
      setRespondedType('best')
    }
    if (expectCountState) {
      setRespondedType('expect')
    }
    if (congratulationCountState) {
      setRespondedType('congratulation')
    }
    if (tearCountState) {
      setRespondedType('tear')
    }
    if (cheerCountState) {
      setRespondedType('cheer')
    }
  }, [
    bestCountState,
    expectCountState,
    congratulationCountState,
    tearCountState,
    cheerCountState,
  ])

  useEffect(() => {
    if (!isResponsed) {
      setRespondedType(null)
    }
  }, [isResponsed])

  useLayoutEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight,
        10,
      )
      const lines = contentHeight / lineHeight
      if (lines > 5) {
        setShowMoreButton(true)
      }
    }
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleSubmitResponse = (response: string) => {
    if (!getAccessToken()) {
      toast.error('로그인 후 이용해주세요.')
      return
    }
    // 이미 한 번 응답했고, 같은 응답이 아니면 return
    if (isResponsed && response !== respondedType) {
      // 알아서 삭제하고, 새로운 응답을 추가하는 리퀘스트 mutation
      postReaction(response)
      return
    }

    if (isResponsed && response === respondedType) {
      deleteReaction()
      setRespondedType(null)
      setIsResponsed(false)

      setBestCountState(false)
      setExpectCountState(false)
      setCongratulationCountState(false)
      setTearCountState(false)

      return
    }

    // 응답 타입 업데이트
    setRespondedType(response)

    switch (response) {
      case 'best':
        setBestCountState(!bestCountState)
        break
      case 'expect':
        setExpectCountState(!expectCountState)
        break
      case 'congratulation':
        setCongratulationCountState(!congratulationCountState)
        break
      case 'tear':
        setTearCountState(!tearCountState)
        break
      case 'cheer':
        setCheerCountState(!cheerCountState)
        break
      default:
        // eslint-disable-next-line no-console
        console.log('Unknown response')
    }

    // 새로운 응답을 추가하는 리퀘스트 mutation
    postReaction(response)
  }

  return (
    <div className="w-full border bg-white border-border rounded-xl px-5">
      {/* 기본정보 */}
      <div className="flex flex-col gap-4">
        <div className="pt-5 flex items-center">
          <Image
            src={profile}
            width={60}
            height={60}
            className="w-[5rem] h-[5rem] md:w-[4.5rem] md:h-[4.5rem] rounded-full"
            alt="profile"
          />
          <div className="ml-3 flex flex-col">
            <span className="font-bold text-xl leading-7">{nickname}</span>
            <span className="font-medium text-base leading-6 text-disabled">
              {createdAt}
            </span>
          </div>
        </div>
        {/* 본문 */}
        <span
          ref={contentRef}
          className={`whitespace-pre text-[#363A43] text-base font-medium leading-6 ${!isExpanded ? 'overflow-hidden max-h-[110px]' : ''}`}
        >
          {content}
        </span>
        {showMoreButton && (
          <button
            type="button"
            onClick={toggleExpand}
            className="text-disabled text-start max-w-max text-xs font-bold"
          >
            {isExpanded ? '간략히 보기' : '전체 보기'}
          </button>
        )}
        {image && (
          <Image
            src={image}
            alt="image"
            width={500}
            height={500}
            className="max-h-[31.25rem] object-contain"
          />
        )}
        <hr className="border-border" />
        <div className="flex justify-center items-center  pb-3 gap-6 text-xs font-bold leading-6">
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('best')}
            className={`flex flex-col cursor-pointer text-disabled ${bestCountState ? 'text-primary' : ''}`}
          >
            <span>😆 최고예요</span>
            <span className="text-center ">{bestCount}</span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('expect')}
            className={`flex flex-col cursor-pointer text-disabled ${expectCountState ? 'text-primary' : ''}`}
          >
            <span>😊 기대돼요</span>
            <span className="text-center "> {expectCount}</span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('congratulation')}
            className={`flex flex-col cursor-pointer text-disabled ${congratulationCountState ? 'text-primary' : ''}`}
          >
            <span>😚 축하해요</span>
            <span className="text-center "> {congratulationCount}</span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('tear')}
            className={`flex flex-col cursor-pointer text-disabled ${tearCountState ? 'text-primary' : ''}`}
          >
            <span>😭 눈물나요</span>
            <span className="text-center "> {tearCount}</span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('cheer')}
            className={`flex flex-col cursor-pointer text-disabled ${cheerCountState ? 'text-primary' : ''}`}
          >
            <span>😍 응원해요</span>
            <span className="text-center "> {cheerCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
