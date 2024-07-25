'use client'

import Image from 'next/image'

import { DUMMY_STAGE_DETAIL, DUMMY_TAGS } from '@/constants/stage/index.ts'
import StageDetailTag from '@/features/stage/detail/components/tag/index.tsx'

function StageDetailPage() {
  return (
    <div className="w-full relative">
      {/* background image */}
      <div className="w-full h-[20.5625rem] overflow-hidden absolute z-[-1]">
        <Image
          src={DUMMY_STAGE_DETAIL.image}
          className="absolute translate-y-[-30%] opacity-50 overflow-hidden bg-center"
          alt="poster"
          width={600}
          height={329}
        />
      </div>

      {/* poster */}
      <div className="w-full pt-12 flex justify-center items-center">
        <Image
          src={DUMMY_STAGE_DETAIL.image}
          alt="poster"
          className="rounded-xl"
          width={229}
          height={334}
        />
      </div>

      {/* tags */}
      <div className="w-full pt-7 pb-5 flex items-center justify-center gap-x-3">
        {DUMMY_TAGS.map((tag) => (
          <StageDetailTag
            key={tag.text}
            text={tag.text}
            classnames={tag.classnames}
          />
        ))}
      </div>
      {/* info */}
    </div>
  )
}

export default StageDetailPage
