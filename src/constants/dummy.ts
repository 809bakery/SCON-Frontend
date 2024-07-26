import { StaticImageData } from 'next/image'

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

type OvenDetail = {
  ovenId: number
  ovenName: string
  image: string | StaticImageData
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
