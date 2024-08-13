'use client'

import { useQuery } from '@tanstack/react-query'
import { StaticImageData } from 'next/image'

import { privateApi } from '@/api/config/privateApi.ts'
import OvenAddCard from '@/features/oven/components/card/add/index.tsx'
import OvenCard from '@/features/oven/components/card/index.tsx'

interface OvenType {
  ovenId: number
  ovenName: string
  image: string | StaticImageData
  ovenDetail: string
  followCount: number
}

function MyOvenPage() {
  const { data: OvenList } = useQuery({
    queryKey: ['user-oven-list'],
    queryFn: async () => {
      const response = await privateApi.get('/api/oven/list')
      return response.data
    },
  })

  return (
    <div className="px-5 pt-12 pb-10 flex flex-wrap justify-between items-center gap-x-3 gap-y-10">
      {OvenList?.map((data: OvenType) => (
        <OvenCard
          ovenId={data.ovenId}
          ovenName={data.ovenName}
          image={data.image}
          key={data.ovenId}
        />
      ))}
      <OvenAddCard />
    </div>
  )
}

export default MyOvenPage
