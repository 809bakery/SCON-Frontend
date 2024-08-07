'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { ExtendedChatMessage } from '@/app/scontalk/[id]/page.tsx'

export default function ChatCard({
  content,
  isFirst,
  createdAt,
  isEnd,
  isOvener,
}: ExtendedChatMessage) {
  const contentRef = useRef<HTMLParagraphElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)

  useLayoutEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const lineHeight = parseInt(
        window.getComputedStyle(contentRef.current).lineHeight,
        10,
      )
      const lines = contentHeight / lineHeight
      if (lines > 10) {
        setShowMoreButton(true)
      }
    }
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <div
      className={`max-w-[20rem] flex flex-col gap-3 text-base font-medium leading-6  ${isOvener ? '' : 'items-end'}`}
    >
      <div
        // eslint-disable-next-line no-nested-ternary
        className={`relative border border-border rounded-[1.25rem] bg-white ${isFirst ? (isOvener ? 'rounded-tl-none' : 'rounded-tr-none') : ''} px-[.625rem] py-3 max-w-max break-words`}
      >
        <p
          ref={contentRef}
          className={`leading-6 whitespace-pre-wrap ${!isExpanded ? 'overflow-hidden max-h-[15rem]' : ''}`}
        >
          {content}
        </p>
        {showMoreButton && (
          <div className="w-full border-t border-border  pt-2 px-[.625rem] mt-[.625rem]">
            <button
              type="button"
              onClick={toggleExpand}
              className="w-full text-disabled text-start text-xs font-bold flex justify-between items-center"
            >
              <span>{isExpanded ? '접기' : '펼치기'}</span>
              <span>&gt;</span>
            </button>
          </div>
        )}
        {isEnd && (
          <div
            className={`absolute bottom-0 ${isOvener ? '-right-[3.125rem]' : '-left-[3.125rem]'} font-medium leading-6 text-sm text-disabled`}
          >
            {createdAt?.toString().slice(-5)}
          </div>
        )}
      </div>
    </div>
  )
}
