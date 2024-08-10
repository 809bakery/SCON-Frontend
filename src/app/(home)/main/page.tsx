'use client'

import A2HSModal from '@/components/a2hs/index.tsx'
import Carousel from '@/components/Carousel.tsx'
import Footer from '@/components/footer/index.tsx'
import StageContainer from '@/features/event/components/stage/index.tsx'

export default function Mainpage() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col  px-7 pt-10  pb-20 gap-20">
        <Carousel />
        <StageContainer />
      </div>
      <A2HSModal />
      <Footer />
    </div>
  )
}
