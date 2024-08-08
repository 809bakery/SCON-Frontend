import {
  ChatChunkType,
  ExtendedChatMessage,
} from '@/app/scontalk/[id]/page.tsx'

/**
 * 배열을 특정 조건에 따라 여러 개의 청크로 분할합니다.
 *
 * @param {ExtendedChatMessage[]} items - 분할할 아이템 배열입니다.
 * @returns {ChatChunkType[]} 분할된 청크 배열을 반환합니다.
 */
export function splitMessagesIntoChunks(
  items: ExtendedChatMessage[],
): ChatChunkType[] {
  const chunks: ChatChunkType[] = []
  let currentChunk: ChatChunkType = []

  items.forEach((item) => {
    if (isFirstOfChunk(item)) {
      currentChunk = pushCurrentChunkAndReset(chunks, currentChunk)
    }

    currentChunk.push(item)

    if (isEndOfChunk(item)) {
      currentChunk = pushCurrentChunkAndReset(chunks, currentChunk)
    }
  })

  pushCurrentChunkIfNotEmpty(chunks, currentChunk)

  return chunks
}

/**
 * 새로운 청크를 시작해야 하는지 여부를 결정합니다.
 *
 * @param {ExtendedChatMessage} item - 현재 아이템입니다.
 * @returns {boolean} 새 청크의 시작 여부를 반환합니다.
 */
function isFirstOfChunk(item: ExtendedChatMessage): boolean {
  return item.isFirst
}

/**
 * 청크의 끝인지 여부를 결정합니다.
 *
 * @param {ExtendedChatMessage} item - 현재 아이템입니다.
 * @returns {boolean} 청크의 끝 여부를 반환합니다.
 */
function isEndOfChunk(item: ExtendedChatMessage): boolean {
  return item.isEnd
}

/**
 * 현재 청크를 청크 배열에 추가하고, 새로운 청크를 시작합니다.
 *
 * @param {ChatChunkType[]} chunks - 청크 배열입니다.
 * @param {ChatChunkType} currentChunk - 현재 청크입니다.
 * @returns {ChatChunkType} 새로운 빈 청크를 반환합니다.
 */
function pushCurrentChunkAndReset(
  chunks: ChatChunkType[],
  currentChunk: ChatChunkType,
): ChatChunkType {
  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }
  return []
}

/**
 * 현재 청크가 비어있지 않다면 청크 배열에 추가합니다.
 *
 * @param {ChatChunkType[]} chunks - 청크 배열입니다.
 * @param {ChatChunkType} currentChunk - 현재 청크입니다.
 */
function pushCurrentChunkIfNotEmpty(
  chunks: ChatChunkType[],
  currentChunk: ChatChunkType,
): void {
  if (currentChunk.length > 0) {
    chunks.push(currentChunk)
  }
}
