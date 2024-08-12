/* eslint-disable no-nested-ternary */
import Card from '@/features/event/components/stage/Card/index.tsx'
import { EventType } from '@/features/event/types/Event.ts'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

interface StageListProps {
  category?: StageCategory
  setCategory?: (cat: StageCategory) => void
  isLoading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: EventType[] | []
}

export default function StageList({
  category,
  setCategory,
  data: stageList,
  isLoading,
}: StageListProps) {
  const handleClick = (cat: StageCategory) => {
    if (setCategory) {
      setCategory(cat)
    }
  }

  stageList = Array.isArray(stageList) ? stageList.slice(0, 6) : []

  function isArrayEmpty<T>(arr: T[]): boolean {
    return !arr || arr.length === 0
  }

  return (
    <>
      <div className="w-full flex space-x-4 justify-start text-xl mt-5">
        <button
          type="button"
          onClick={() => handleClick('all' as StageCategory)}
          className={`${category === 'all' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => handleClick('performance' as StageCategory)}
          className={`${category === 'performance' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          공연
        </button>
        <button
          type="button"
          onClick={() => handleClick('lecture' as StageCategory)}
          className={`${category === 'lecture' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          강연
        </button>
        <button
          type="button"
          onClick={() => handleClick('club' as StageCategory)}
          className={`${category === 'club' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          소모임
        </button>
        <button
          type="button"
          onClick={() => handleClick('etc' as StageCategory)}
          className={`${category === 'etc' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          기타
        </button>
      </div>
      <div className="w-full mt-9 flex flex-wrap items-center justify-between gap-y-8 gap-x-3">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={`skeleton-${index}`}
                className="w-[30%] rounded-xl shrink-0 flex flex-col gap-y-3 cursor-pointer animate-pulse"
              >
                <div className="relative animate-pulse w-full h-[13.75rem] rounded-xl bg-gray-200" />
                <div className="w-full flex flex-col items-start justify-center gap-y-1 px-2">
                  <div className="w-full h-4 bg-gray-200 rounded" />
                  <div className="w-full h-3 bg-gray-200 rounded" />
                  <div className="w-full h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </>
        ) : isArrayEmpty(stageList) ? (
          <div className="w-full flex bg-yellow bg-opacity-40 justify-center items-center rounded-xl">
            <div className="flex flex-col items-center py-10 gap-5">
              <p className="font-medium text-base">
                아직 좋아요를 누른 스테이지가 없습니다.
              </p>
            </div>
          </div>
        ) : (
          <>
            {stageList.map((stage: EventType) => (
              <Card
                key={stage.id}
                title={stage.title}
                location={stage.location}
                sDate={stage.startDate}
                eDate={stage.endDate}
                posterUrl={stage.image}
              />
            ))}
            {Array.from(
              { length: (3 - (stageList.length % 3)) % 3 },
              (_, index) => (
                <div key={`empty-${index}`} className="w-[30%]" />
              ),
            )}
          </>
        )}
      </div>
    </>
  )
}
