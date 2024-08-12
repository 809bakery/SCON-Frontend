import { StaticImageData } from 'next/image'

import { StageCategory } from '@/features/event/types/StageCategory.ts'
import DummyOvenProfile1 from '@/static/img/dummy/search/dummy-oven-profile1.jpg'
import DummyOvenProfile2 from '@/static/img/dummy/search/dummy-oven-profile2.jpg'
import DummyOvenProfile3 from '@/static/img/dummy/search/dummy-oven-profile3.jpg'
import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile4.jpg'
import DummyOvenProfile5 from '@/static/img/dummy/search/dummy-oven-profile5.jpg'
import DummyStageProfile1 from '@/static/img/dummy/search/dummy-stage-profile1.jpg'
import DummyStageProfile2 from '@/static/img/dummy/search/dummy-stage-profile2.jpg'
import DummyStageProfile3 from '@/static/img/dummy/search/dummy-stage-profile3.jpg'
import DummyStageProfile4 from '@/static/img/dummy/search/dummy-stage-profile4.jpg'

type TabType = {
  id: number
  name: string
  label: string
}

export type FilterType = {
  id: number
  name: string
  label: string
}

type OvenType = {
  id: number
  name: string
  recentStage: string[]
  image: string | StaticImageData
}

export type StageType = {
  id: number
  title: string
  location: string
  time: string
  image: string | StaticImageData
  category: StageCategory
}

export const SearchFilterList: FilterType[] = [
  {
    id: 1,
    name: 'sales',
    label: '판매많은순',
  },
  {
    id: 2,
    name: 'imminent',
    label: '공연임박순',
  },
  {
    id: 3,
    name: 'end',
    label: '마감된공연',
  },
]

export const OvenDetailFilterList: FilterType[] = [
  {
    id: 1,
    name: '',
    label: '인기순',
  },
  {
    id: 2,
    name: '',
    label: '가나다순',
  },
  {
    id: 3,
    name: '',
    label: '최신등록순',
  },
]

export const SearchTabList: TabType[] = [
  {
    id: 1,
    name: 'oven',
    label: '오븐',
  },
  {
    id: 2,
    name: 'stage',
    label: '스테이지',
  },
]

export const OvenDetailTabList: TabType[] = [
  {
    id: 1,
    name: 'info',
    label: '기본정보',
  },
  {
    id: 2,
    name: 'community',
    label: '커뮤니티',
  },
]

export const OvenList: OvenType[] = [
  {
    id: 1,
    name: '아이네',
    recentStage: ['이세계 페스티벌', '솔로 콘서트 ‘EVER PURPLE’'],
    image: DummyOvenProfile1,
  },
  {
    id: 2,
    name: '징버거',
    recentStage: ['이세계 페스티벌'],
    image: DummyOvenProfile2,
  },
  {
    id: 3,
    name: '아야츠노 유니',
    recentStage: ['2024 아야츠노 유니 홈파티', '2023 아야츠노 유니 생일파티'],
    image: DummyOvenProfile3,
  },
  {
    id: 4,
    name: '릴파',
    recentStage: ['이세계 페스티벌', '솔로 콘서트 ‘Going out’'],
    image: DummyOvenProfile4,
  },
  {
    id: 5,
    name: '결속밴드',
    recentStage: ['극장판 봇치 더 락! 곧 개봉함 많관부'],
    image: DummyOvenProfile5,
  },
]

export const StageList: StageType[] = [
  {
    id: 1,
    title: '하트스틸 이즈리얼 컴백 쇼케이스',
    location: '소환사의 협곡 바텀 라인',
    time: '2024. 7. 22 ~ 7. 25',
    image: DummyStageProfile1,
    category: StageCategory.club,
  },
  {
    id: 2,
    title: '릴파 솔로 콘서트 ‘Going Out’',
    location: '경희대학교 평화의 전당',
    time: '2024. 7. 12 ~ 7. 13',
    image: DummyStageProfile2,
    category: StageCategory.performance,
  },
  {
    id: 3,
    title: '유니’s BIRTHDAY 홈파티',
    location: '잠실 롯데시네마 7층',
    time: '2024. 7. 22 ~ 7. 25',
    image: DummyStageProfile3,
    category: StageCategory.performance,
  },
  {
    id: 4,
    title: '2024 발로란트 챔피언스 서울 결승전',
    location: '인스파이어 아레나',
    time: '2024. 8.25',
    image: DummyStageProfile4,
    category: StageCategory.etc,
  },
]
