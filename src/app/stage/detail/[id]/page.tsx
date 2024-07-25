'use client'

import Image from 'next/image'
import { useState } from 'react'

import { DUMMY_STAGE_DETAIL, DUMMY_TAGS } from '@/constants/stage/index.ts'
import StageTabComment from '@/features/stage/detail/components/tab/comment/index.tsx'
import StageTabExpect from '@/features/stage/detail/components/tab/expect/index.tsx'
import StageTabInfo from '@/features/stage/detail/components/tab/info/index.tsx'
import StageTabSale from '@/features/stage/detail/components/tab/sale/index.tsx'
import StageDetailTag from '@/features/stage/detail/components/tag/index.tsx'
import LikeOffSVG from '@/static/svg/stage/stage-like-off-icon.svg'
import LikeOnSVG from '@/static/svg/stage/stage-like-on-icon.svg'

function StageDetailPage() {
  const [tab, setTab] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)

  return (
    <div className="w-full relative pb-40">
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
      {/* tab */}
      <div className="w-full flex justify-between items-center">
        <button
          type="button"
          onClick={() => setTab(0)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 0 && 'font-bold !text-black !border-primary'}`}
        >
          스테이지 정보
        </button>
        <button
          type="button"
          onClick={() => setTab(1)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 1 && 'font-bold !text-black !border-primary'}`}
        >
          판매 정보
        </button>
        <button
          type="button"
          onClick={() => setTab(2)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 2 && 'font-bold !text-black !border-primary'}`}
        >
          기대평
        </button>
        <button
          type="button"
          onClick={() => setTab(3)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 3 && 'font-bold !text-black !border-primary'}`}
        >
          후기
        </button>
      </div>
      {tab === 0 && <StageTabInfo />}
      {tab === 1 && <StageTabSale />}
      {tab === 2 && <StageTabComment />}
      {tab === 3 && <StageTabExpect />}

      {/* footer */}
      <div className="w-full max-w-[598px] p-5 fixed bottom-0 flex gap-x-7 justify-between items-center bg-white">
        <button
          type="button"
          className="p-5"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? (
            <LikeOnSVG className="w-11 h-11" />
          ) : (
            <LikeOffSVG className="w-11 h-11" />
          )}
        </button>

        <button
          type="button"
          className="flex-1 bg-primary rounded-xl text-2xl py-5 flex items-center justify-center"
        >
          예매하기
        </button>
      </div>
    </div>
  )
}

export default StageDetailPage
