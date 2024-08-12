/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { DUMMY_CAROUSEL_DATA } from '@/constants/carousel/index.ts'
import DotIndicatorSVG from '@/static/svg/indicator-icon.svg'

export default function Carousel() {
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [currentImg, setCurrentImg] = useState(0)
  const carouselRef = useRef(null)
  const [imageHeight, setImageHeight] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  const router = useRouter()

  useEffect(() => {
    const updateHeight = () => {
      if (imageRef.current) {
        setImageHeight(imageRef.current.offsetHeight)
      }
    }

    window.addEventListener('resize', updateHeight)
    updateHeight()

    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImg(
        (prevImg) => (prevImg + 1) % (DUMMY_CAROUSEL_DATA.length + 1),
      )
    }, 2500)

    if (currentImg === DUMMY_CAROUSEL_DATA.length) {
      setTimeout(() => {
        setTransitionEnabled(false)
        setCurrentImg(0)
      }, 500)

      setTimeout(() => {
        setTransitionEnabled(true)
      }, 550)
    }

    return () => clearTimeout(timer)
  }, [currentImg])

  return (
    <div className="flex flex-col items-center w-full">
      <div
        style={{ height: `calc(${imageHeight}px + 48px)` }}
        className="relative overflow-hidden w-full"
      >
        <div
          ref={carouselRef}
          style={{
            left: `-${currentImg * 100}%`,
            transition: transitionEnabled ? 'left 0.5s ease-out' : 'none',
          }}
          className="relative flex h-full w-full transition-all duration-500"
        >
          {DUMMY_CAROUSEL_DATA.map((item) => (
            <div
              role="presentation" // aria-label
              key={item.CarouselId}
              className="relative h-full w-full shrink-0 cursor-pointer"
              onClick={() => router.push(item.link)}
            >
              <Image
                ref={imageRef}
                className="pointer-events-none"
                alt={`carousel-image-${item.CarouselId}`}
                layout="responsive"
                width={540}
                height={409}
                src={item.image}
              />
            </div>
          ))}

          {DUMMY_CAROUSEL_DATA.map((item) => (
            <div
              key={item.CarouselId}
              className="relative h-full w-full shrink-0"
            >
              <Image
                className="pointer-events-none"
                alt={`carousel-image-${item.CarouselId}`}
                layout="responsive"
                width={540}
                height={384}
                src={item.image}
              />
            </div>
          ))}
          <div
            key={DUMMY_CAROUSEL_DATA[0].CarouselId}
            className="relative h-full w-full shrink-0"
          >
            <Image
              className="pointer-events-none"
              alt={`carousel-image-${DUMMY_CAROUSEL_DATA[0].CarouselId}`}
              layout="responsive"
              width={540}
              height={384}
              src={DUMMY_CAROUSEL_DATA[0].image}
            />
          </div>
        </div>
        <div className="w-full absolute  bottom-0 mt-3 flex justify-center">
          <div className="flex h-8 w-32 space-x-3">
            {DUMMY_CAROUSEL_DATA.map((_, index) => (
              <div
                key={index}
                role="presentation"
                onClick={() => setCurrentImg(index)}
                className="w-4 h-4 flex justify-center items-center cursor-pointer"
              >
                <DotIndicatorSVG
                  width={currentImg === index ? 16 : 12}
                  height={currentImg === index ? 16 : 12}
                  fill={currentImg === index ? '#FFC90D' : '#A6A6B1'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
