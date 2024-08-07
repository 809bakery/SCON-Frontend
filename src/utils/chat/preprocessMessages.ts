import { ExtendedChatMessage } from '@/app/scontalk/[id]/page.tsx'
import { ChatMessage } from '@/constants/dummy.ts'

/**
 * 채팅 메시지 배열을 전처리하여 각 메시지에 추가 정보를 부여합니다.
 * 메시지의 시작과 끝을 표시하고, 프로필 이미지를 조건에 따라 할당합니다.
 *
 * @param {ChatMessage[]} messages - 원본 채팅 메시지 배열입니다.
 * @returns {ExtendedChatMessage[]} 전처리된 채팅 메시지 배열을 반환합니다.
 */
export default function preprocessMessages(
  messages: ChatMessage[],
): ExtendedChatMessage[] {
  const processedMessages: ExtendedChatMessage[] = []
  let lastNickname: string = ''
  let lastTime: string = ''

  messages.forEach((message) => {
    const newItem = createExtendedMessage(message)

    if (isNewMessageGroup(message, lastNickname, lastTime)) {
      markPreviousMessageEnd(processedMessages)
      newItem.isFirst = true
      newItem.profile = message.profile
    } else {
      newItem.profile = ''
    }

    lastNickname = message.nickname
    lastTime = message.createdAt

    processedMessages.push(newItem)
  })

  markLastMessageEnd(processedMessages)

  return processedMessages
}

/**
 * 새로운 메시지 그룹의 시작 여부를 판단합니다.
 *
 * @param {ChatMessage} message - 현재 메시지입니다.
 * @param {string} lastNickname - 이전 메시지의 닉네임입니다.
 * @param {string} lastTime - 이전 메시지의 생성 시간입니다.
 * @returns {boolean} 새로운 메시지 그룹의 시작 여부를 반환합니다.
 */
function isNewMessageGroup(
  message: ChatMessage,
  lastNickname: string,
  lastTime: string,
): boolean {
  const currentTime = new Date(message.createdAt ?? new Date()).getMinutes()
  return (
    message.nickname !== lastNickname ||
    new Date(lastTime).getMinutes() !== currentTime
  )
}

/**
 * 이전 메시지에 종료 표시를 합니다.
 *
 * @param {ExtendedChatMessage[]} processedMessages - 처리된 메시지 배열입니다.
 */
function markPreviousMessageEnd(
  processedMessages: ExtendedChatMessage[],
): void {
  if (processedMessages.length > 0) {
    processedMessages[processedMessages.length - 1].isEnd = true
  }
}

/**
 * 마지막 메시지에 종료 표시를 합니다.
 *
 * @param {ExtendedChatMessage[]} processedMessages - 처리된 메시지 배열입니다.
 */
function markLastMessageEnd(processedMessages: ExtendedChatMessage[]): void {
  if (processedMessages.length > 0) {
    processedMessages[processedMessages.length - 1].isEnd = true
  }
}

/**
 * 새로운 확장된 메시지 객체를 생성합니다.
 *
 * @param {ChatMessage} message - 현재 메시지입니다.
 * @param {string} lastNickname - 이전 메시지의 닉네임입니다.
 * @param {string} lastTime - 이전 메시지의 생성 시간입니다.
 * @returns {ExtendedChatMessage} 확장된 메시지 객체를 반환합니다.
 */
function createExtendedMessage(message: ChatMessage): ExtendedChatMessage {
  return {
    ...message,
    profile: '',
    isFirst: false,
    isEnd: false,
  }
}
