import AllStageList from '@/app/stage/list/[type]/_components/AllStageList.tsx'
import MyStageList from '@/app/stage/list/[type]/_components/MyStageList.tsx'
import PickStageList from '@/app/stage/list/[type]/_components/PickStageList.tsx'

interface StageListPageProps {
  params: { type: string }
}

export default function StageListPage({ params }: StageListPageProps) {
  const listType: string = params?.type
  return (
    <>
      {listType === 'all' && <AllStageList />}
      {listType === 'my' && <MyStageList />}
      {listType === 'pick' && <PickStageList />}
    </>
  )
}
