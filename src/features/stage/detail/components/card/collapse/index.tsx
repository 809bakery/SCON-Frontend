import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import DummyStageDetailInfo from '@/static/img/dummy/stage/dummy-stage-info.jpg'
import ArrowBottomSVG from '@/static/svg/arrow-bottom-icon.svg'
import ArrowTopSVG from '@/static/svg/arrow-top-icon.svg'

interface StageDetailCollapseCardProps {
  title: string
  // eslint-disable-next-line react/require-default-props
  image?: string | StaticImageData
}

function StageDetailCollapseCard(props: StageDetailCollapseCardProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const { title, image } = props
  return (
    <div
      className={`w-full relative p-5 flex flex-col gap-y-2 border border-border rounded-xl whitespace-pre-wrap ${isCollapsed && 'max-h-[31.25rem] overflow-hidden'}`}
    >
      <p className="font-bold">{title}</p>
      {image && (
        <Image src={DummyStageDetailInfo} alt="poster" className="w-full" />
      )}
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-3 absolute bottom-0 bg-white flex items-center justify-center outline-none"
        >
          <span className="text-2xl">펼치기</span>
          <ArrowBottomSVG className="w-8 h-8" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="py-3 flex items-center justify-center outline-none"
        >
          <span className="text-2xl">접기</span>
          <ArrowTopSVG className="w-8 h-8" />
        </button>
      )}
    </div>
  )
}

export default StageDetailCollapseCard
