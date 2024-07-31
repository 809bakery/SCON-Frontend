import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import { StageList } from '@/constants/search/index.ts'

export default function MyStageList() {
  return (
    <div className="py-10 px-7">
      <div className="w-full h-full flex flex-col gap-8">
        {StageList.map((stage) => (
          <StageCard
            title={stage.title}
            location={stage.location}
            time={stage.time}
            image={stage.image}
          />
        ))}
      </div>
    </div>
  )
}
