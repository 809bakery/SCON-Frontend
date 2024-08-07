'use client'

import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import ChatCard from '@/app/scontalk/[id]/_components/ChatCard.tsx'
import NavbarWithGoback from '@/components/Navbar/NavbarWithGoback.tsx'
import { ChatMessage, DUMMY_SCON_TALK_DETAIL } from '@/constants/dummy.ts'

export interface ExtendedChatMessage extends ChatMessage {
  isFirst?: boolean
  isEnd?: boolean
}

type ChatChunk = ExtendedChatMessage[]

const preprocessContent = (content: ChatMessage[]) => {
  const processed: ExtendedChatMessage[] = []
  let lastNickname: string | undefined = ''
  let lastTime: string = ''

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let lastProfile: string | StaticImageData = ''

  content.forEach((item) => {
    const currentTime = new Date(item.createdAt ?? new Date()).getMinutes()
    const newItem: ExtendedChatMessage = {
      ...item,
      profile: '',
      isFirst: false,
      isEnd: false,
    }

    if (
      item.nickname !== lastNickname ||
      new Date(lastTime).getMinutes() !== currentTime
    ) {
      if (lastNickname !== '' && processed.length > 0) {
        processed[processed.length - 1].isEnd = true
      }
      newItem.isFirst = true
      newItem.profile = item.profile
    } else {
      newItem.profile = ''
    }

    lastNickname = item.nickname
    lastProfile = item.profile
    lastTime = item.createdAt as string

    processed.push(newItem)
  })

  if (processed.length > 0) {
    processed[processed.length - 1].isEnd = true
  }

  return processed
}

const chunkMessages = (
  processedMessages: ExtendedChatMessage[],
): ChatChunk[] => {
  const chunks: ChatChunk[] = []
  let currentChunk: ChatChunk = []

  processedMessages.forEach((message) => {
    if (message.isFirst) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk)
      }
      currentChunk = []
    }

    currentChunk.push(message)

    if (message.isEnd) {
      chunks.push(currentChunk)
      currentChunk = []
    }
  })

  // 마지막 청크 처리
  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}

export default function SconTalkPage() {
  const messageEndRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState('')
  const [preprocessedContent, setPreprocessedContent] = useState<
    ExtendedChatMessage[]
  >(preprocessContent(DUMMY_SCON_TALK_DETAIL.content))
  const [chunkedContent, setChunkedContent] = useState<ChatChunk[]>(
    chunkMessages(preprocessedContent),
  )

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

  useEffect(() => {
    const content = chunkMessages(preprocessedContent)
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

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    const newChat = {
      id: message,
      content: message,
      nickname: '고세구',
      profile: '/dummy/dummy-default-profile.jpg',
      createdAt: formattedDate,
      isOvener: false,
    }
    setPreprocessedContent(preprocessContent([...preprocessedContent, newChat]))
    setMessage('')
    const element = elementRef.current
    if (element) {
      element.style.height = 'auto'
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-full fixed top-0 max-w-[598px] bg-white z-10">
        <NavbarWithGoback name="릴파 솔로 콘서트 ‘Going Out’" />
      </div>
      <div
        ref={contentRef}
        className="chat_bg w-full min-h-screen pt-[60px] px-7 pb-[7rem] "
      >
        <div className="w-full flex justify-center mt-6">
          <p className="max-w-max border border-border rounded-xl py-[.875rem] px-[.625rem] text-base leading-6 font-medium text-center mb-[4.125rem]">
            2024. 07. 12일 16시에 진행되는 릴파 솔로 콘서트 ‘Going Out’
            스콘톡입니다.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {chunkedContent.map((chats) => (
            <div
              className={`flex space-x-[.875rem] ${chats[0].isOvener ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              <Image
                src={chats[0].profile}
                width={60}
                height={60}
                alt="profile"
                className="w-[3.75rem] h-[3.75rem] object-cover object-center rounded-full"
              />
              <div
                className={`flex flex-col gap-2 relative ${chats[0].isOvener ? '' : 'items-end'}`}
              >
                <h3 className="text-sm leading-[1.375rem] font-bold flex">
                  {chats[0].isOvener && (
                    <div className="ovener_bg h-[1.375rem] px-2 mr-2 rounded-[.25rem] overflow-hidden">
                      오브너
                    </div>
                  )}
                  {chats[0].nickname}
                </h3>
                {chats.map((chat) => (
                  <ChatCard
                    key={chat.content}
                    content={chat.content}
                    isFirst={chat.isFirst}
                    createdAt={chat.createdAt}
                    isEnd={chat.isEnd}
                    profile={chat.profile}
                    isOvener={chat.isOvener}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div ref={messageEndRef} />

      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-[598px]  bg-_white fixed bottom-0 p-5 space-x-3 flex">
          <div className="w-full px-6 py-4 bg-lightgray-1 rounded-xl flex items-center">
            <textarea
              className="w-full h-auto text-base font-medium leading-6 bg-lightgray-1 focus:outline-none resize-none scrollbar-hide"
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
            className="bg-primary rounded-xl px-6 py-4 text-disabled text-xl font-medium leading-7 min-w-max"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  )
}
