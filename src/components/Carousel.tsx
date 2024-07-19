/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import DotIndicatorSVG from '@/static/svg/indicator-icon.svg'

const CarouselImages = [
  {
    id: 1,
    url: '/images/carouselImage.jpg',
  },
  {
    id: 2,
    url: '/images/carouselImage.jpg',
  },
  {
    id: 3,
    url: '/images/carouselImage.jpg',
  },
  {
    id: 4,
    url: '/images/carouselImage.jpg',
  },
  {
    id: 5,
    url: '/images/carouselImage.jpg',
  },
]

export default function Carousel() {
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [currentImg, setCurrentImg] = useState(0)
  const carouselRef = useRef(null)
  const [imageHeight, setImageHeight] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (imageRef.current) {
        setImageHeight(imageRef.current.offsetHeight)
      }
    }

    window.addEventListener('resize', updateHeight)

    // 초기 높이 설정
    updateHeight()

    // 이벤트 리스너 정리
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImg((prevImg) => (prevImg + 1) % (CarouselImages.length + 1))
    }, 2500)

    // 마지막 이미지에서 첫 번째 이미지로 넘어갈 때의 처리
    if (currentImg === CarouselImages.length) {
      setTimeout(() => {
        // 애니메이션 없이 즉시 첫 번째 이미지로 이동
        setTransitionEnabled(false)
        setCurrentImg(0)
      }, 500) // 애니메이션 지속 시간 이후 실행

      // 애니메이션을 다시 활성화
      setTimeout(() => {
        setTransitionEnabled(true)
      }, 550) // 애니메이션 지속 시간 이후 실행
    }

    return () => clearTimeout(timer)
  }, [currentImg])

  return (
    <div className="flex flex-col items-center w-full">
      {/* Carousel container */}
      <div
        style={{ height: `calc(${imageHeight}px + 48px)` }}
        className="relative overflow-hidden w-full rounded-md"
      >
        {/* Image container */}
        <div
          ref={carouselRef}
          style={{
            left: `-${currentImg * 100}%`,
            transition: transitionEnabled ? 'left 0.5s ease-out' : 'none',
          }}
          className="relative flex h-full w-full transition-all duration-500"
        >
          <div
            key={CarouselImages[CarouselImages.length - 1].id}
            className="relative h-full w-full shrink-0"
          >
            <Image
              ref={imageRef}
              className="pointer-events-none"
              alt={`carousel-image-${CarouselImages[CarouselImages.length - 1].id}`}
              layout="responsive"
              width={544}
              height={409}
              src={
                CarouselImages[CarouselImages.length - 1].url ||
                'https://random.imagecdn.app/500/500'
              }
            />
          </div>
          {/* Map through data to render images */}
          {CarouselImages.map((item) => (
            <div key={item.id} className="relative h-full w-full shrink-0">
              <Image
                className="pointer-events-none"
                alt={`carousel-image-${item.id}`}
                layout="responsive"
                width={544}
                height={384}
                src={item.url || 'https://random.imagecdn.app/500/500'}
              />
            </div>
          ))}
          <div
            key={CarouselImages[0].id}
            className="relative h-full w-full shrink-0"
          >
            <Image
              className="pointer-events-none"
              alt={`carousel-image-${CarouselImages[0].id}`}
              layout="responsive"
              width={544}
              height={384}
              src={
                CarouselImages[0].url || 'https://random.imagecdn.app/500/500'
              }
            />
          </div>
        </div>
        {/* Navigation buttons */}
        <div
          // style={{ bottom: `calc(409px - ${imageHeight}px)` }}
          className="w-full absolute  bottom-0 mt-3 flex justify-center"
        >
          <div className="flex h-8 w-32 space-x-3">
            <div
              role="presentation"
              onClick={() => setCurrentImg(0)}
              className="w-4 h-4 flex justify-center items-center cursor-pointer transition-all duration-500"
            >
              <DotIndicatorSVG
                width={currentImg % 5 === 0 ? 16 : 12}
                height={currentImg % 5 === 0 ? 16 : 12}
                fill={currentImg % 5 === 0 ? '#FFC90D' : '#999999'}
              />
            </div>
            <div
              role="presentation"
              onClick={() => setCurrentImg(1)}
              className="w-4 h-4 flex justify-center items-center cursor-pointer"
            >
              <DotIndicatorSVG
                width={currentImg === 1 ? 16 : 12}
                height={currentImg === 1 ? 16 : 12}
                fill={currentImg === 1 ? '#FFC90D' : '#999999'}
              />
            </div>
            <div
              role="presentation"
              onClick={() => setCurrentImg(2)}
              className="w-4 h-4 flex justify-center items-center cursor-pointer"
            >
              <DotIndicatorSVG
                width={currentImg === 2 ? 16 : 12}
                height={currentImg === 2 ? 16 : 12}
                fill={currentImg === 2 ? '#FFC90D' : '#999999'}
              />
            </div>
            <div
              role="presentation"
              onClick={() => setCurrentImg(3)}
              className="w-4 h-4 flex justify-center items-center cursor-pointer"
            >
              <DotIndicatorSVG
                width={currentImg === 3 ? 16 : 12}
                height={currentImg === 3 ? 16 : 12}
                fill={currentImg === 3 ? '#FFC90D' : '#999999'}
              />
            </div>
            <div
              role="presentation"
              onClick={() => setCurrentImg(4)}
              className="w-4 h-4 flex justify-center items-center cursor-pointer"
            >
              <DotIndicatorSVG
                width={currentImg === 4 ? 16 : 12}
                height={currentImg === 4 ? 16 : 12}
                fill={currentImg === 4 ? '#FFC90D' : '#999999'}
              />
            </div>
          </div>
        </div>

        {/* <button
          disabled={currentImg === 0}
          onClick={() => setCurrentImg((prev) => prev - 1)}
          className={`border px-4 py-2 font-bold ${currentImg === 0 && 'opacity-50'}`}
        >
          {'<'}
        </button>
        <button
          disabled={currentImg === CarouselImages.length - 1}
          onClick={() => setCurrentImg((prev) => prev + 1)}
          className={`border px-4 py-2 font-bold ${currentImg === CarouselImages.length - 1 && 'opacity-50'}`}
        >
          {'>'}
        </button> */}
      </div>
    </div>
  )
}
