import { StaticImageData } from 'next/image'

import DummyOvenProfile1 from '@/static/img/dummy/search/dummy-oven-profile1.jpg'
import DummyOvenProfile2 from '@/static/img/dummy/search/dummy-oven-profile2.jpg'
import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile4.jpg'
import DummyOvenProfile7 from '@/static/img/dummy/search/dummy-oven-profile7.jpg'
import DummyOvenProfile8 from '@/static/img/dummy/search/dummy-oven-profile8.jpg'

type UserType = {
  userId: number
  email: string
  nickname: string
  image: string | StaticImageData
  role: string
}

export const DUMMY_INVITED_USERS: UserType[] = [
  {
    userId: 2,
    email: 'jingbuga@wakenter.wakgood',
    nickname: '징버거',
    image: DummyOvenProfile2,
    role: 'MEMBER',
  },
  {
    userId: 3,
    email: 'viichan@wakenter.wakgood',
    nickname: '비챤',
    image: DummyOvenProfile8,
    role: 'MEMBER',
  },
  {
    userId: 11,
    email: 'aine@wakenter.wakgood',
    nickname: '아이네',
    image: DummyOvenProfile1,
    role: 'MEMBER',
  },
  {
    userId: 31,
    email: 'lilpa@wakenter.wakgood',
    nickname: '릴파',
    image: DummyOvenProfile4,
    role: 'MEMBER',
  },
  {
    userId: 21,
    email: 'gosegu@wakenter.wakgood',
    nickname: '고세구',
    image: DummyOvenProfile7,
    role: 'MEMBER',
  },
]
