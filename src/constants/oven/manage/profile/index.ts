import { StaticImageData } from 'next/image'

import DummyStageImage1 from '@/static/img/dummy/search/dummy-jururu-stage1.jpg'
import DummyStageImage2 from '@/static/img/dummy/search/dummy-jururu-stage2.jpg'

type OvenProfileType = {
  title: string
  image: string | StaticImageData
  detail: string
  startDate: string
  endDate: string
  status: 'Ready' | 'Progress' | 'Done'
  createdAt: string
  location: string
  subTitle: string
}

export const DUMMY_OVEN_PROFILE: OvenProfileType[] = [
  {
    title: '주르르 솔로 콘서트 ‘Ju. Taime’',
    image: DummyStageImage1,
    detail: '',
    startDate: '2022-05-30T11:30:00',
    endDate: '2022-06-30T15:30:00',
    status: 'Done',
    createdAt: '2021-07-26T15:58:53',
    location: 'VRChat RURUCINEMA',
    subTitle: '',
  },
  {
    title: '이세계 페스티벌',
    image: DummyStageImage2,
    detail: '',
    startDate: '2024-07-22T11:30:00',
    endDate: '2024-07-25T15:30:00',
    status: 'Done',
    createdAt: '2024-06-20T15:58:06',
    location: '인천광역시 송도 달빛축제공원',
    subTitle: '',
  },
  {
    title: '주르르 솔로 콘서트 ‘Ju. Taime’',
    image: DummyStageImage1,
    detail: '',
    startDate: '2024-08-09T11:30:00',
    endDate: '2024-08-30T15:30:00',
    status: 'Progress',
    createdAt: '2024-07-26T15:58:53',
    location: 'VRChat RURUCINEMA',
    subTitle: '',
  },
]
