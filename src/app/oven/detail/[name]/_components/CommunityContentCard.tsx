/* eslint-disable no-nested-ternary */

'use client'

import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface CommunityContentCardProps {
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
}

export default function CommunityContentCard({
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
    // 이미 한 번 응답했고, 같은 응답이 아니면 return
    if (isResponsed && response !== respondedType) return

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
            <span className="font-bold text-xl leading-7">
              {nickname || '주르르'}
            </span>
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
            <span className="text-center ">
              {bestCountState ? (bestCount ? bestCount + 1 : 1) : bestCount}
            </span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('expect')}
            className={`flex flex-col cursor-pointer text-disabled ${expectCountState ? 'text-primary' : ''}`}
          >
            <span>😊 기대돼요</span>
            <span className="text-center ">
              {expectCountState
                ? expectCount
                  ? expectCount + 1
                  : 1
                : expectCount}
            </span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('congratulation')}
            className={`flex flex-col cursor-pointer text-disabled ${congratulationCountState ? 'text-primary' : ''}`}
          >
            <span>😚 축하해요</span>
            <span className="text-center ">
              {congratulationCountState
                ? congratulationCount
                  ? congratulationCount + 1
                  : 1
                : congratulationCount}
            </span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('tear')}
            className={`flex flex-col cursor-pointer text-disabled ${tearCountState ? 'text-primary' : ''}`}
          >
            <span>😭 눈물나요</span>
            <span className="text-center ">
              {tearCountState ? (tearCount ? tearCount + 1 : 1) : tearCount}
            </span>
          </div>
          <div
            role="presentation"
            onClick={() => handleSubmitResponse('cheer')}
            className={`flex flex-col cursor-pointer text-disabled ${cheerCountState ? 'text-primary' : ''}`}
          >
            <span>😍 응원해요</span>
            <span className="text-center ">
              {cheerCountState ? (cheerCount ? cheerCount + 1 : 1) : cheerCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
