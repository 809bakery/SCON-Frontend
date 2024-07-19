import AllStage from '@/features/event/components/stage/AllStage.tsx'
import MyStage from '@/features/event/components/stage/MyStage.tsx'
import RecommendStage from '@/features/event/components/stage/RecommendStage.tsx'

export default function StageContainer() {
  return (
    <div className="flex flex-col gap-8">
      <MyStage />
      <RecommendStage />
      <AllStage />
    </div>
  )
}
