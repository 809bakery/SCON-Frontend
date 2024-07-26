import { useEffect, useState } from 'react'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import { DAY_MAP } from '@/constants/stage/info/index.ts'
import StageDetailCollapseCard from '@/features/stage/detail/components/card/collapse/index.tsx'
import StageDetailCard from '@/features/stage/detail/components/card/index.tsx'

function StageTabInfo() {
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    parseDate()
  })

  const parseDate = () => {
    let tempDate = ''
    DUMMY_STAGE_DETAIL.content.forEach((content) => {
      tempDate += new Date(content.time).toLocaleDateString('ko-KR')
      tempDate += `(${DAY_MAP[new Date(content.time).getDay()]})`
      tempDate += ` ${content.time.split('T')[1].slice(0, 5)}`
      tempDate += '\n'
    })
    setDate(tempDate)
  }
  return (
    <div className="w-full px-7 py-5 flex flex-col gap-y-5">
      <StageDetailCard
        title="주최 오븐"
        content={DUMMY_STAGE_DETAIL.oven.ovenName}
      />
      <StageDetailCard title="스테이지 일시" content={date} />
      <StageDetailCard
        title="스테이지 장소"
        content={DUMMY_STAGE_DETAIL.location}
      />
      <StageDetailCard
        title="관람시간"
        content={`${DUMMY_STAGE_DETAIL.runningTime}분`}
      />
      <StageDetailCard
        title="티켓 가격"
        content={`전좌석 ${DUMMY_STAGE_DETAIL.cost.toLocaleString('ko-kr')}원`}
      />
      <StageDetailCollapseCard
        title="상세 정보"
        image={DUMMY_STAGE_DETAIL.image}
      />
    </div>
  )
}

export default StageTabInfo
