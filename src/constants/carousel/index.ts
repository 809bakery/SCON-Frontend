type CarouselDataType = {
  CarouselId: number
  image: string // public 폴더의 이미지는 스트링 형식으로 불러올 수 있음
  link: string
}

export const DUMMY_CAROUSEL_DATA: CarouselDataType[] = [
  {
    CarouselId: 1,
    image: '/images/carouselImage1.png', // public 폴더 기준으로 경로 지정
    link: `${process.env.NEXT_PUBLIC_ROOT_URL}/oven/detail/이세계아이돌123`,
  },
  {
    CarouselId: 2,
    image: '/images/carouselImage2.png',
    // link: 'https://www.809bakery.com/oven/isegye',
    link: `${process.env.NEXT_PUBLIC_ROOT_URL}/oven/detail/이세계아이돌123`,
  },
  {
    CarouselId: 3,
    image: '/images/carouselImage3.png',
    link: `${process.env.NEXT_PUBLIC_ROOT_URL}/oven/detail/이세계아이돌123`,
  },
  {
    CarouselId: 4,
    image: '/images/carouselImage4.png',
    link: `${process.env.NEXT_PUBLIC_ROOT_URL}/oven/detail/이세계아이돌123`,
  },
]
