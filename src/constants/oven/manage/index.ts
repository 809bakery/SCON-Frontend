import { StaticImageData } from 'next/image'

import DummyOvenProfile from '@/static/img/dummy/oven/dummy-oven-profile.jpg'

type OvenInfoType = {
  ovenId: number
  ovenName: string
  ovenDetail: string
  leader: string
  wishCategory: string[]
  headCount: number
  image: string | StaticImageData
  followCount: number
  createdAt: string
}

export const DUMMY_OVEN_INFO: OvenInfoType = {
  ovenId: 3,
  ovenName: '이세계 아이돌',
  ovenDetail: 'ROUNDNESS 전부 10으로 맞춰줘. 이세돌 리와인드 렛츠고ㅋㅋ',
  leader: '주르르',
  wishCategory: ['PERFORMANCE', 'ETC'],
  headCount: 10,
  image: DummyOvenProfile,
  followCount: 0,
  createdAt: '2024.08.04',
}
