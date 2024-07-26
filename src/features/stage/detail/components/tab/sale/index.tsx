import { useEffect, useState } from 'react'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import { SCON_RESERVE_DATA } from '@/constants/stage/sale/index.ts'
import StageDetailCard from '@/features/stage/detail/components/card/index.tsx'

function StageTabSale() {
  const [cost, setCost] = useState<string>()
  useEffect(() => {
    parseCost()
  })
  const parseCost = () => {
    setCost(DUMMY_STAGE_DETAIL.cost.toLocaleString('ko-KR'))
  }
  return (
    <div className="w-full px-7 py-5 flex flex-col gap-y-5">
      <StageDetailCard title="티켓 가격" content={`전좌석 ${cost}원`} />
      <StageDetailCard
        title="티켓 수령 안내"
        content={SCON_RESERVE_DATA.info}
      />
      <StageDetailCard
        title="예매 유의사항"
        content={SCON_RESERVE_DATA.caution}
      />
      <StageDetailCard
        title="예매 취소 안내"
        content={SCON_RESERVE_DATA.cancelInfo}
      />
      <StageDetailCard
        title="판매자 정보"
        content={`${DUMMY_STAGE_DETAIL.oven.ovenName}\n@${DUMMY_STAGE_DETAIL.oven.accountName}`}
      />
    </div>
  )
}

export default StageTabSale
