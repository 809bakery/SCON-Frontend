/* eslint-disable react/destructuring-assignment */
import Image from 'next/image'

import ChatCard from '@/app/scontalk/[id]/_components/ChatCard.tsx'
import { ChatChunkType } from '@/app/scontalk/[id]/page.tsx'

export default function ChatChunk({ chats }: { chats: ChatChunkType }) {
  return (
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
            isOvener={chat.isOvener}
          />
        ))}
      </div>
    </div>
  )
}
