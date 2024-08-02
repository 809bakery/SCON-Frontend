import { StaticImageData } from 'next/image'

import DummyTicketPoster from '@/static/img/dummy/ticket/dummy-ticket-poster.jpg'

type StageType = {
  rNum: string
  title: string
  category: string
  ovenName: string
  image: string | StaticImageData
  location: string
  episodeNumber: number
  reservedDate: string
  stageDate: string
  runningTime: number
  status: string
  cost: number
}

export const DUMMY_RESERVED_STAGE: StageType[] = [
  {
    title: 'LILPACON : Going Out',
    category: 'Concert',
    ovenName: 'LILPACON',
    image: DummyTicketPoster,
    location: '경희대학교 평화의 전당',
    episodeNumber: 1,
    reservedDate: '2024-07-11T00:58:18.991033',
    stageDate: '2024-07-13T18:00:00.991033',
    runningTime: 180,
    status: 'Ready',
    rNum: 'S1257091257',
    cost: 10000,
  },
  {
    title: 'LILPACON : Going Out',
    category: 'Concert',
    ovenName: 'LILPACON',
    image: DummyTicketPoster,
    location: '경희대학교 평화의 전당',
    episodeNumber: 1,
    reservedDate: '2024-07-11T00:58:18.991033',
    stageDate: '2024-07-13T18:00:00.991033',
    runningTime: 180,
    status: 'Ready',
    rNum: 'S22222456',
    cost: 10000,
  },
  {
    title: 'LILPACON : Going Out',
    category: 'Concert',
    ovenName: 'LILPACON',
    image: DummyTicketPoster,
    location: '경희대학교 평화의 전당',
    episodeNumber: 1,
    reservedDate: '2024-07-11T00:58:18.991033',
    stageDate: '2024-07-13T18:00:00.991033',
    runningTime: 180,
    status: 'End',
    rNum: 'S123456789',
    cost: 10000,
  },
]
