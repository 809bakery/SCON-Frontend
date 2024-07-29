import { StaticImageData } from 'next/image'

import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile3.jpg'
import DummyOvenProfile5 from '@/static/img/dummy/search/dummy-oven-profile4.jpg'
import DummyOvenProfile6 from '@/static/img/dummy/stage/dummy-oven-profile6.jpg'

type CommentType = {
  caution: string
}
export const SCON_COMMENT_DATA: CommentType = {
  caution:
    '게시판 운영 규정에 어긋난다고 판단되는 글은 사전 통보 없이 블라인드 처리될 수 있습니다. 특히 티켓의 매매 및 양도 글은 발견 즉시 임의 삭제되며 개인 정보의 경우 악용될 우려가 있으므로 게시를 삼가하시기 바랍니다.',
}

// -------------

type ReserveCommentType = {
  content: ContentType[]
  page: PageType
}

type ContentType = {
  eventBoardId: number
  memberId: number
  profile: string | StaticImageData
  nickname: string
  content: string
  createdAt: string
  isWrite: boolean
  // 아직 추가되지 않은 키
  liked: number
}

type PageType = {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

export const DUMMY_COMMENT_DATA: ReserveCommentType = {
  content: [
    {
      eventBoardId: 61,
      memberId: 1,
      nickname: '르르땅 fan',
      profile: DummyOvenProfile6,
      content:
        '게시판 운영 규정에 어긋난다고 판단되는 글은 사전 통보 없이 블라인드 처리될 수 있습니다. 특히 티켓의 매매 및 양도 글은 발견 즉시 임의 삭제되며 개인 정보의 경우 악용될 우려가 있으므로 게시를 삼가하시기 바랍니다.ㅇㅍㄴ ㄴㅊ ㅌㅍㅍㅌ츄 ㅊ튵ㅊ',
      createdAt: '2024-07-25T00:58:18.991033',
      isWrite: true,
      liked: 1234,
    },
    {
      eventBoardId: 62,
      memberId: 2,
      nickname: '유니',
      profile: DummyOvenProfile4,
      content:
        '게시판 운영 규정에 어긋난다고 판단되는 글은 사전 통보 없이 블라인드 처리될 수 있습니다. 특히 티켓의 매매 및 양도 글은 발견 즉시 임의 삭제되며 개인 정보의 경우 악용될 우려가 있으므로 게시를 삼가하시기 바랍니다.ㅇㅍㄴ ㄴㅊ ㅌㅍㅍㅌ츄 ㅊ튵ㅊ',
      createdAt: '2024-07-25T00:58:18.991033',
      isWrite: false,
      liked: 234,
    },
    {
      eventBoardId: 63,
      memberId: 2,
      nickname: '릴파fan',
      profile: DummyOvenProfile5,
      content:
        '오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리너구리.  오류가 아니라 의도된 기능입니다. 못 고치는게 아닙니다. 내 코드는 오리',
      createdAt: '2024-07-25T00:58:18.991033',
      isWrite: false,
      liked: 453,
    },
  ],
  page: {
    size: 5,
    number: 0,
    totalElements: 3,
    totalPages: 1,
  },
}
