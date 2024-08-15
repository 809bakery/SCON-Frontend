import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import { DAY_MAP } from '@/constants/stage/info/index.ts'
import StageDetailCollapseCard from '@/features/stage/detail/components/card/collapse/index.tsx'
import StageDetailCard from '@/features/stage/detail/components/card/index.tsx'
import { getAccessToken } from '@/utils/cookie/index.ts'

interface ContentType {
  id: number
  episodeNumber: number
  time: string
  reserveTime: string
  status: 'Done' | 'Progress' | 'Ready'
}

function StageTabInfo({ id }: { id: string }) {
  const [date, setDate] = useState<string>('')
  const { data: loginUser } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
    enabled: !!getAccessToken(),
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
      return response.data
    },
  })
  useEffect(() => {
    parseDate()
  })

  const parseDate = () => {
    let tempDate = ''
    stageDetail?.eventResponseDto?.content.forEach((content: ContentType) => {
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
        content={stageDetail?.eventResponseDto?.ovenName}
      />
      <StageDetailCard title="스테이지 일시" content={date} />
      <StageDetailCard
        title="스테이지 장소"
        content={stageDetail?.eventResponseDto?.location}
      />
      <StageDetailCard
        title="관람시간"
        content={`${stageDetail?.eventResponseDto?.runningTime}분`}
      />
      <StageDetailCard
        title="티켓 가격"
        content={`전좌석 ${stageDetail?.eventResponseDto?.cost.toLocaleString('ko-kr')}원`}
      />
      <StageDetailCollapseCard
        title="상세 정보"
        image={stageDetail?.eventResponseDto?.detailImage}
      />
    </div>
  )
}

export default StageTabInfo
