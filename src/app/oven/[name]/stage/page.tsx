'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import { DAY_MAP } from '@/constants/stage/info/index.ts'
import OvenManageCard from '@/features/oven/components/manage/stage/card/index.tsx'

interface OvenType {
  id: number
  title: string
  image: string
  detail: string
  startDate: string
  endDate: string
  status: string
  createdAt: string
  location: string
  subTitle: string
  content: ContentType[]
}

interface ContentType {
  id: number
  episodeNumber: number
  time: string
  reserveTime: string
  status: string
}

function OvenSettingStage() {
  const router = useRouter()
  const param = useParams()
  const parseDate = (startDate: string) => {
    const date = new Date(startDate).toLocaleDateString('ko-kr')
    const day = DAY_MAP[new Date(startDate).getDay()]
    return `${date} (${day})`
  }

  const { data: ovenList } = useQuery({
    queryKey: ['ovenList', param.name],
    queryFn: async () => {
      const response = await privateApi.get(`/api/event/oven/${param.name}`)
      return response.data
    },
  })

  return (
    <div className="py-10 px-7 flex flex-col gap-y-4">
      {ovenList?.map(
        (stage: OvenType) =>
          stage &&
          stage?.content?.map((content) => (
            <OvenManageCard
              key={stage.createdAt}
              className="px-8 py-5 flex flex-col gap-y-4 items-center"
            >
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl font-bold">{stage.title}</h3>
                <span className="">{content.episodeNumber}회차</span>
              </div>

              <Image
                src={stage.image}
                width={132}
                height={188}
                alt="stage-image"
                className="object-cover w-32 h-44 rounded-xl"
              />
              <span className="text-[#363232]">{`${stage.location} |  ${parseDate(stage.startDate)}`}</span>

              <div className="flex justify-between items-center gap-x-5 text-sm">
                <button
                  type="button"
                  onClick={() => router.push(`/stage/detail/${stage.id}`)}
                  className="py-2 px-6 border border-primary rounded-xl"
                >
                  상세 정보 조회
                </button>
                <a
                  href={`/oven/${content.id}/members/manage/qr`}
                  className="py-2 px-6 border border-primary rounded-xl"
                >
                  QR 리더기
                </a>
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/oven/${content.id}/members/manage`)
                  }
                  className="py-2 px-6 border border-primary rounded-xl"
                >
                  예매자 명단 확인
                </button>
              </div>
            </OvenManageCard>
          )),
      )}
    </div>
  )
}

export default OvenSettingStage
