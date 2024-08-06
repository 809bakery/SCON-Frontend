import Image, { StaticImageData } from 'next/image'

import ChatCard from '@/app/scontalk/[id]/_components/ChatCard.tsx'
import { ChatMessage, DUMMY_SCON_TALK_DETAIL } from '@/constants/dummy.ts'

export interface ExtendedChatMessage extends ChatMessage {
  isFirst?: boolean
  isEnd?: boolean
}

type ChatChunk = ExtendedChatMessage[]

const preprocessContent = (content: ChatMessage[]) => {
  const processed: ExtendedChatMessage[] = []
  let lastNickname = ''
  let lastTime = ''
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let lastProfile: string | StaticImageData = ''

  content.forEach((item) => {
    const currentTime = new Date(item.createdAt ?? '').getMinutes()
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
      newItem.profile = item.profile // 첫 요소에만 프로필 사진을 남깁니다.
    } else {
      newItem.profile = '' // 같은 닉네임의 연속된 메시지는 프로필 사진을 비웁니다.
    }

    lastNickname = item.nickname
    lastProfile = item.profile
    lastTime = item.createdAt // 여기를 수정했습니다.

    processed.push(newItem)
  })

  if (processed.length > 0) {
    processed[processed.length - 1].isEnd = true // 마지막 요소에 isEnd: true를 추가합니다.
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
      // 새 청크 시작
      if (currentChunk.length > 0) {
        // 이전 청크가 있다면, 청크 리스트에 추가
        chunks.push(currentChunk)
      }
      currentChunk = [] // 현재 청크 초기화
    }

    currentChunk.push(message) // 현재 메시지를 현재 청크에 추가

    if (message.isEnd) {
      // 청크의 끝이면, 현재 청크를 청크 리스트에 추가하고 새로운 청크를 시작
      chunks.push(currentChunk)
      currentChunk = [] // 현재 청크 초기화 (이 부분은 사실상 필요 없지만 명확성을 위해 남겨둠)
    }
  })

  // 마지막 청크 처리
  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }

  return chunks
}

// DUMMY_SCON_TALK_DETAIL.content를 전처리합니다.
const preprocessedContent = preprocessContent(DUMMY_SCON_TALK_DETAIL.content)
const chunkedContent = chunkMessages(preprocessedContent)

export default function SconTalkPage() {
  return (
    <div className="chat_bg w-full min-h-screen pt-[1.375rem] px-7">
      <div className="w-full flex justify-center">
        <p className="max-w-max border border-border rounded-xl py-[.875rem] px-[.625rem] text-base leading-6 font-medium text-center mb-[4.125rem]">
          2024. 07. 12일 16시에 진행되는 릴파 솔로 콘서트 ‘Going Out’
          스콘톡입니다.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {chunkedContent.map((chats) => (
          <div className="flex space-x-[.875rem]">
            <Image
              src={chats[0].profile}
              width={60}
              height={60}
              alt="profile"
              className="w-[3.75rem] h-[3.75rem] object-cover object-center rounded-full"
            />
            <div className="flex flex-col gap-2 relative">
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
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
