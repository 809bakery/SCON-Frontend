import { StaticImageData } from 'next/image'

import DummyStage2 from '@/static/img/dummy/search/dummy-jururu-stage1.jpg'
import DummyStage3 from '@/static/img/dummy/search/dummy-jururu-stage2.jpg'
import DummyOvenProfile1 from '@/static/img/dummy/search/dummy-oven-profile1.jpg'
import DummyOvenProfile10 from '@/static/img/dummy/search/dummy-oven-profile10.jpg'
import DummyOvenProfile2 from '@/static/img/dummy/search/dummy-oven-profile2.jpg'
import DummyOvenProfile3 from '@/static/img/dummy/search/dummy-oven-profile3.jpg'
import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile4.jpg'
import DummyOvenProfile5 from '@/static/img/dummy/search/dummy-oven-profile5.jpg'
import DummyOvenProfile6 from '@/static/img/dummy/search/dummy-oven-profile6.jpg'
import DummyOvenProfile7 from '@/static/img/dummy/search/dummy-oven-profile7.jpg'
import DummyOvenProfile8 from '@/static/img/dummy/search/dummy-oven-profile8.jpg'
import DummyOvenProfile9 from '@/static/img/dummy/search/dummy-oven-profile9.jpg'
import DummyStage1 from '@/static/img/dummy/ticket/dummy-ticket-poster.jpg'

type OvenDetail = {
  ovenId: number
  ovenName: string
  image: string | StaticImageData
}

export interface ChatMessage {
  nickname: string
  content: string
  profile: string | StaticImageData
  isOvener: boolean
  createdAt: string
}

export interface SconTalkDetail {
  content: ChatMessage[]
  time: string
  title: string
}

export const DUMMY_POSTER_DATA = [
  {
    title: '빅뱅 서울콘서트',
    location: '올림픽공원 내 체조경기장',
    startDate: '2015-04-25T18:00:00',
    isEnd: true,
    posterUrl: '/dummy/dummy-poster-bigbang.jpg',
    content: [
      {
        id: 1,
        episodeNumber: 1,
        time: '2015-04-25T18:00:00',
      },
      {
        id: 2,
        episodeNumber: 2,
        time: '2015-04-26T18:00:00',
      },
      {
        id: 3,
        episodeNumber: 3,
        time: '2015-04-27T18:00:00',
      },
    ],
  },
  {
    title: 'Yerin Baek Concert',
    location: 'SK Olympic Handball Gymnasium',
    startDate: '2023-06-19T20:00:00',
    posterUrl: '/dummy/dummy-poster-yerin.jpg',
    content: [
      {
        id: 1,
        episodeNumber: 1,
        time: '2023-06-20T18:00:00',
      },
      {
        id: 2,
        episodeNumber: 2,
        time: '2023-06-21T17:00:00',
      },
    ],
  },
  {
    title: 'NEWJEANS BUNNIES CAMP',
    location: 'TOKYO DOME',
    startDate: '2024-06-26T17:00:00',
    posterUrl: '/dummy/dummy-poster-newjeans.jpg',
    content: [
      {
        id: 1,
        episodeNumber: 1,
        time: '2024-06-27T19:00:00',
      },
    ],
  },
  {
    title: 'TEEN TROUBLES In Dirty Jersey',
    location: '블루스퀘어 마스터카드홀',
    startDate: '2022-10-08T10:00:00',
    posterUrl: '/dummy/dummy-poster-skirt.jpg',
    content: [
      {
        id: 1,
        episodeNumber: 1,
        time: '2022-10-09T10:00:00',
      },
    ],
  },
]

export const DUMMY_OVEN_DETAIL_DATA: OvenDetail[] = [
  { ovenId: 1, ovenName: '아이네', image: DummyOvenProfile1 },
  { ovenId: 2, ovenName: '징버거', image: DummyOvenProfile2 },
  { ovenId: 3, ovenName: '아야츠노 유니', image: DummyOvenProfile3 },
  { ovenId: 4, ovenName: '릴파', image: DummyOvenProfile4 },
  { ovenId: 5, ovenName: '주르르', image: DummyOvenProfile10 },
  { ovenId: 6, ovenName: '아라하시 타비', image: DummyOvenProfile6 },
  { ovenId: 7, ovenName: '고세구', image: DummyOvenProfile7 },
  { ovenId: 8, ovenName: '비챤', image: DummyOvenProfile8 },
  { ovenId: 9, ovenName: '시라유키 히나', image: DummyOvenProfile9 },
  { ovenId: 10, ovenName: '아이네', image: DummyOvenProfile1 },
  { ovenId: 11, ovenName: '징버거', image: DummyOvenProfile2 },
  { ovenId: 12, ovenName: '아야츠노 유니', image: DummyOvenProfile3 },
  { ovenId: 13, ovenName: '릴파', image: DummyOvenProfile4 },
  { ovenId: 14, ovenName: '결속밴드', image: DummyOvenProfile5 },
  { ovenId: 15, ovenName: '아라하시 타비', image: DummyOvenProfile6 },
  { ovenId: 16, ovenName: '고세구', image: DummyOvenProfile7 },
  { ovenId: 17, ovenName: '비챤', image: DummyOvenProfile8 },
  { ovenId: 18, ovenName: '시라유키 히나', image: DummyOvenProfile9 },
]

const now = new Date()

const twoDaysLater = new Date(
  now.getTime() + 2 * 24 * 60 * 60 * 1000,
).toISOString()

const twoDaysAgo = new Date(
  now.getTime() - 2 * 24 * 60 * 60 * 1000,
).toISOString()

export const DUMMY_SCONTALK_LIST = [
  {
    chatRoomId: '1',
    title: '릴파 솔로 콘서트 ‘Going Out’',
    time: now.toISOString(), // 공연 시간
    image: DummyStage1,
  },
  {
    chatRoomId: '2',
    title: '주르르 솔로 콘서트 ‘Ju. Taime’',
    time: twoDaysLater,
    image: DummyStage2,
  },
  {
    chatRoomId: '3',
    title: '이세계 페스티벌',
    time: twoDaysAgo,
    image: DummyStage3,
  },
]

export const DUMMY_SCON_TALK_DETAIL: SconTalkDetail = {
  content: [
    {
      nickname: '릴파',
      content: '울랄랄라',
      profile:
        'https://scon-bucket.s3.ap-northeast-2.amazonaws.com/profile_lilpa4.jpg',
      createdAt: '2024-08-16T09:30',
      isOvener: true,
    },
    {
      nickname: '릴파',
      content:
        '리라리라~~~ 리라리라~~~ 리라리라~~~~ 릴파에용 ㅎㅎㅎㅎㅎ우리 조금 있으면 만난다 어떡해 !!!!!!!!!! 너무 떨려!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 다들 호응 잘 해주실거죵????ㅠㅠㅠㅠ 후아후아후아 심호흡 심호흡 저의 첫 오프 콘서트인만큼 저도 엄청 긴장도 되구 막 >ㅁ< 다들 빨리 보구싶당 ㅎ헤헤 다들 조심히 와요',
      createdAt: '2024-08-16T09:30',
      profile:
        'https://scon-bucket.s3.ap-northeast-2.amazonaws.com/profile_lilpa4.jpg',
      isOvener: true,
    },
    {
      nickname: '주르르',
      content: `너무 신난당~^^ 기대돼요~~~`,
      createdAt: '2024-08-16T09:32',
      profile:
        'https://scon-bucket.s3.ap-northeast-2.amazonaws.com/profile_ruru.jpg',
      isOvener: true,
    },
    {
      nickname: '싸피 Sconee',
      content: `이날만을 기다렸어요 ㅠㅠ`,
      createdAt: '2024-08-16T09:33',
      profile:
        'https://scon-bucket.s3.ap-northeast-2.amazonaws.com/c2d94188-eecb-418c-a393-7a8b9e5742fa.jpg',
      isOvener: false,
    },
  ],
  time: '2023-11-05T16:00',
  title: '릴파 솔로 콘서트 ‘Going Out’',
}
