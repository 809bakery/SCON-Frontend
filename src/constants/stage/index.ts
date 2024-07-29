import { StaticImageData } from 'next/image'

import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile3.jpg'
import DummyStageDetailPoster from '@/static/img/dummy/stage/dummy-stage-poster.png'

type StageDetailType = {
  id: number
  oven: OvenType
  location: string
  title: string
  category: string
  detail: string
  image: string | StaticImageData
  headCount: number
  episodeAmount: number
  cost: number
  runningTime: number
  createdAt: string | null
  content: ContentType[]
}

type OvenType = {
  ovenId: number
  ovenName: string
  ovenDetail: string | null
  account: string
  accountName: string
  bankName: string
  image: string | StaticImageData
  followCount: number
  createdAt: string
}

type ContentType = {
  id: number
  episodeNumber: number
  time: string
  status: string
}

export const DUMMY_STAGE_DETAIL: StageDetailType = {
  id: 1,
  oven: {
    ovenId: 2,
    ovenName: '릴파',
    ovenDetail: null,
    account: '2024',
    accountName: 'lilpa',
    bankName: '왁두은행',
    image: DummyOvenProfile4,
    followCount: 0,
    createdAt: '2023-02-15T10:30:00',
  },
  location: '서울 경희대학교 평화의 전당',
  title: 'LILPACON : Going Out',
  category: 'PERFORMANCE',
  detail: '',
  image: DummyStageDetailPoster,
  headCount: 100,
  episodeAmount: 3,
  cost: 93000,
  runningTime: 120,
  createdAt: null,
  content: [
    {
      id: 1,
      episodeNumber: 1,
      time: '2024-07-12T19:00:00',
      status: 'Ready',
    },
    {
      id: 2,
      episodeNumber: 2,
      time: '2024-07-13T20:00:00',
      status: 'Ready',
    },
    {
      id: 3,
      episodeNumber: 3,
      time: '2024-07-13T22:30:00',
      status: 'Ready',
    },
  ],
}

// -------------------

type TagType = {
  text: string
  classnames: string
}

export const DUMMY_TAGS: TagType[] = [
  {
    text: '예매중',
    classnames: 'bg-primary text-black',
  },
  {
    text: '인기',
    classnames: 'bg-warning text-white',
  },
  {
    text: '예매마감',
    classnames: 'bg-[#E5E5ED] text-[#6B6E78]',
  },
  {
    text: '최신등록',
    classnames: 'bg-primary text-white',
  },
  {
    text: '공연임박',
    classnames: 'bg-[#4AB3FF] text-white',
  },
]
