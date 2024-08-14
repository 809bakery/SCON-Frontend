import { useQuery } from '@tanstack/react-query'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import { SCON_RESERVE_DATA } from '@/constants/stage/sale/index.ts'
import StageDetailCard from '@/features/stage/detail/components/card/index.tsx'

function StageTabSale({ id }: { id: string }) {
  const { data: loginUser } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', id],
    queryFn: async () => {
      let response
      if (loginUser) {
        response = await privateApi.get(`/api/event/${id}`)
      } else {
        response = await publicApi.get(`/api/event/${id}`)
      }
      // eslint-disable-next-line no-console
      console.log(response.data)
      return response.data
    },
  })

  const { data: ovenInfo } = useQuery({
    queryKey: ['ovenInfo', stageDetail?.eventResponseDto?.ovenId],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/oven/${stageDetail?.eventResponseDto?.ovenId}`,
      )
      return response.data
    },
  })
  return (
    <div className="w-full px-7 py-5 flex flex-col gap-y-5">
      <StageDetailCard
        title="티켓 가격"
        content={`전좌석 ${stageDetail?.eventResponseDto?.cost}원`}
      />
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
        content={`${stageDetail?.eventResponseDto?.ovenName}\n@${ovenInfo?.leader}`}
      />
    </div>
  )
}

export default StageTabSale
