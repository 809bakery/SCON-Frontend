type CarouselDataType = {
  CarouselId: number
  image: string // public 폴더의 이미지는 스트링 형식으로 불러올 수 있음
}

export const DUMMY_CAROUSEL_DATA: CarouselDataType[] = [
  {
    CarouselId: 1,
    image: '/images/carouselImage1.png', // public 폴더 기준으로 경로 지정
  },
  {
    CarouselId: 2,
    image: '/images/carouselImage2.png',
  },
  {
    CarouselId: 3,
    image: '/images/carouselImage3.png',
  },
  {
    CarouselId: 4,
    image: '/images/carouselImage4.png',
  },
]
