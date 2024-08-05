import { StaticImageData } from 'next/image'

import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile4.jpg'

type UserType = {
  email: string
  nickname: string
  image: string | StaticImageData
  isOvener: boolean
  isAuthorized: boolean
}

export const DUMMY_USER: UserType = {
  email: 'contact@scon.io',
  nickname: '스코니',
  image: DummyOvenProfile4,
  isOvener: true,
  isAuthorized: false,
}
