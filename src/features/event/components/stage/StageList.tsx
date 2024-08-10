import { useQuery } from '@tanstack/react-query'

import { privateApi } from '@/api/config/privateApi.ts'
import { DUMMY_POSTER_DATA } from '@/constants/dummy.ts'
import Card from '@/features/event/components/stage/Card/index.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

interface StageListProps {
  category: StageCategory
  setCategory: (cat: StageCategory) => void
}

export default function StageList({ category, setCategory }: StageListProps) {
  useQuery({
    queryKey: ['list_my'],
    queryFn: async () => {
      const response = await privateApi.get('/api/event/main/liked-events')
      return response.data
    },
  })

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }

  return (
    <>
      <div className="w-full flex space-x-4 justify-start text-xl mt-5">
        <button
          type="button"
          onClick={() => handleClick('all')}
          className={`${category === 'all' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => handleClick('performance')}
          className={`${category === 'performance' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          공연
        </button>
        <button
          type="button"
          onClick={() => handleClick('lecture')}
          className={`${category === 'lecture' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          강연
        </button>
        <button
          type="button"
          onClick={() => handleClick('club')}
          className={`${category === 'club' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          소모임
        </button>
        <button
          type="button"
          onClick={() => handleClick('etc')}
          className={`${category === 'etc' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          기타
        </button>
      </div>
      <div className="mt-9 flex flex-wrap items-center justify-between gap-y-8 gap-x-3">
        {DUMMY_POSTER_DATA.map((data) => {
          return (
            <Card
              key={data.title}
              title={data.title}
              location={data.location}
              sDate={data.startDate}
              content={data.content}
              posterUrl={data.posterUrl}
            />
          )
        })}
      </div>
    </>
  )
}
