'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import ChatChunk from '@/app/scontalk/[id]/_components/ChatChunk.tsx'
import NavbarWithGoback from '@/components/Navbar/NavbarWithGoback.tsx'
import { ChatMessage, DUMMY_SCON_TALK_DETAIL } from '@/constants/dummy.ts'
import preprocessMessages from '@/utils/chat/preprocessMessages.ts'
import { splitMessagesIntoChunks } from '@/utils/chat/splitMessagesIntoChunks.ts'
import { getAccessToken } from '@/utils/cookie/index.ts'
import getFormattedCurrentDate from '@/utils/date/getFormattedCurrentDate.ts'

export interface ExtendedChatMessage extends ChatMessage {
  isFirst: boolean
  isEnd: boolean
}

export type ChatChunkType = ExtendedChatMessage[]

interface SconTalkPageProps {
  params: {
    id: string
  }
}

export default function SconTalkPage({ params: { id } }: SconTalkPageProps) {
  const messageEndRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState('')
  const [preprocessedContent, setPreprocessedContent] = useState<
    ExtendedChatMessage[]
  >(preprocessMessages(DUMMY_SCON_TALK_DETAIL.content))
  const [chunkedContent, setChunkedContent] = useState<ChatChunkType[]>(
    splitMessagesIntoChunks(preprocessedContent),
  )

  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get(`/api/user/info`)
      return response.data
    },
    enabled: !!getAccessToken(),
  })

  const { data: chatList, isLoading } = useQuery({
    queryKey: ['talk-history', id],
    queryFn: async () => {
      const response = await privateApi.get(`/api/chat/history/${id}`)
      return response.data
    },
  })

  if (chatList) {
    console.log(chatList)
  }
  /*
    contentRef 요소의 자식 노드 또는 속성이 변경될 때,
    messageEndRef 요소로 스크롤하는 MutationObserver를 설정하여
    textarea의 높이를 자동 조절합니다.
  */
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          messageEndRef.current?.scrollIntoView()
        }
      })
    })

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style'],
      })
    }

    return () => observer.disconnect()
  }, [])

  // preprocessedContent가 변경될 때마다,
  // 메시지를 청크로 분할하여 상태를 업데이트합니다.
  useEffect(() => {
    const content = splitMessagesIntoChunks(preprocessedContent)
    setChunkedContent(content)
  }, [preprocessedContent])

  const handleResizeHeight = () => {
    const element = elementRef.current
    if (element) {
      element.style.height = 'auto'
      element.style.height = `${element.scrollHeight}px`
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newChat = {
      id: message,
      content: message,
      nickname: user?.nickname,
      profile: user?.image,
      createdAt: getFormattedCurrentDate(),
      isOvener: false,
    }
    setPreprocessedContent(
      preprocessMessages([...preprocessedContent, newChat]),
    )
    setMessage('')
    const element = elementRef.current
    if (element) {
      element.style.height = 'auto'
    }
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')

    return `${year}. ${month}. ${day}일 ${hour}시`
  }

  return (
    <div className="w-full h-full">
      <div className="w-full fixed top-0 max-w-[598px] bg-white z-10">
        <NavbarWithGoback name={id} type="scontalk" />
      </div>
      <div
        ref={contentRef}
        className="chat_bg w-full min-h-screen h-full pt-[60px] px-7 pb-[7rem]"
      >
        <div className="w-full flex justify-center">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="bg-gray-200 max-w-max border border-border rounded-xl py-[.875rem] px-[.625rem] mb-[4.125rem]">
                <div className="h-4  rounded w-[15rem]" />
              </div>
            </div>
          ) : (
            <p className="max-w-max border border-border rounded-xl py-[.875rem] px-[.625rem] text-base leading-6 font-medium text-center mb-[4.125rem]">
              {`${formatDate(chatList?.time)}에 진행되는 ${chatList?.title}
            스콘톡입니다.`}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {chunkedContent.map((chats, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ChatChunk key={index} chats={chats} />
          ))}
        </div>
      </div>
      <div ref={messageEndRef} />

      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-[598px]  bg-_white fixed bottom-0 p-5 space-x-3 flex items-end">
          <div className="w-full px-6 py-4 bg-lightgray-1 rounded-xl flex items-center">
            <textarea
              className="w-full h-auto my-[.125rem] text-base font-medium leading-6 bg-lightgray-1 focus:outline-none resize-none scrollbar-hide max-h-[6rem]"
              placeholder="메세지를 입력해주세요."
              value={message}
              rows={1}
              ref={elementRef}
              onChange={(e) => {
                handleResizeHeight()
                setMessage(e.target.value)
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-primary rounded-xl px-6 py-4 text-white text-xl font-medium leading-7 min-w-max"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  )
}
