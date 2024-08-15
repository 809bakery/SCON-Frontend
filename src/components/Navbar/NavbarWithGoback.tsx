import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import { DOMAIN_NAME_MAPPING } from '@/components/Navbar/index.tsx'
import BackSVG from '@/static/svg/arrow-left-icon.svg'

interface NavbarWithGobackProps {
  name?: string
  nameList?: string[]
  type?: string
}

const getNameFromDomainMapping = (nameList: string[]) => {
  const index = nameList.length >= 2 ? 1 : 0
  return (
    DOMAIN_NAME_MAPPING[nameList[index]] || DOMAIN_NAME_MAPPING[nameList[0]]
  )
}

export default function NavbarWithGoback({
  name,
  nameList,
  type,
}: NavbarWithGobackProps) {
  const router = useRouter()
  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', name],
    queryFn: async () => {
      const response = await publicApi.get(`/api/event/${name}`)
      return response.data
    },
    enabled: type === 'stage-datail',
  })

  const { data: chatList } = useQuery({
    queryKey: ['talk-history', name],
    queryFn: async () => {
      const response = await privateApi.get(`/api/chat/history/${name}`)
      return response.data
    },
    enabled: type === 'scontalk',
  })

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  let _name
  if (nameList) {
    _name = getNameFromDomainMapping(nameList)
  } else {
    _name = name
  }

  if (type) {
    _name = ''
  }

  if (stageDetail) {
    _name = stageDetail?.eventResponseDto.title
  }

  if (chatList) {
    _name = chatList?.title
  }

  return (
    <div className="top-0 z-10 w-full h-[60px] relative flex items-center justify-center py-[14px] border-b border-border text-center text-[#565551]">
      <div
        role="presentation"
        onClick={() => router.back()}
        className="absolute left-7 cursor-pointer"
      >
        <BackSVG className="w-8 h-8 min-w-[24px] min-h-[24px]" />
      </div>
      <span className="font-bold text-[1.5rem]">{_name}</span>
    </div>
  )
}
