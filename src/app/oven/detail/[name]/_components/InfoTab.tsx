import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import InfoField from '@/app/oven/detail/[name]/_components/InfoField.tsx'
import { StageType } from '@/constants/search/index.ts'
import DummyStageProfile1 from '@/static/img/dummy/search/dummy-jururu-stage1.jpg'
import DummyStageProfile2 from '@/static/img/dummy/search/dummy-jururu-stage2.jpg'

const INTRODUCE = '르르땅을 좋아하는 성재 ‘u’'

export const DummyStageList: StageType[] = [
  {
    id: 1,
    title: '주르르 솔로 콘서트 ‘Ju. Taime’',
    location: 'VRChat RURUCINEMA',
    time: '2022. 05. 15',
    image: DummyStageProfile1,
  },
  {
    id: 2,
    title: '릴파 솔로 콘서트 ‘Going Out’',
    location: '경희대학교 평화의 전당',
    time: '2024. 7. 12 ~ 7. 13',
    image: DummyStageProfile2,
  },
]

export default function InfoTab() {
  return (
    <div className="w-full px-7 py-9 flex flex-col items-center">
      {/* 자기소개 */}
      <div
        className={`${INTRODUCE ? 'w-[30rem]' : 'w-[28.75rem] text-disabled'} border border-border rounded-xl p-5 text-center text-base font-medium`}
      >
        <span>{INTRODUCE || '아직 작성된 자기소개가 없습니다.'}</span>
      </div>
      {/* 기본정보 */}
      <div className="w-full flex flex-col gap-7 mt-8">
        <h2 className="font-bold leading-8 text-2xl">기본정보</h2>
        <div className="w-full flex flex-col border border-border rounded-xl px-6 py-3 text-base font-medium leading-8">
          <InfoField label="팔로우" data="2123k" />
          <InfoField label="오븐 개시일" data="2021. 05. 16" />
          <InfoField label="스테이지 분야" data="공연, 소모임, 기타" />
        </div>
      </div>
      {/* 스테이지 */}
      <div className="w-full flex flex-col gap-7 mt-10">
        <h2 className="font-bold leading-8 text-2xl">스테이지</h2>
        <div className="w-full h-full flex flex-col gap-8">
          {/* 등록한 스테이지가 없는 경우 */}
          {/* {isStageListEmpty && (
        <div className="w-full h-[16.25rem] rounded-xl border-0.5 border-border flex items-center justify-center text-base font-medium text-disabled">
          등록된 스테이지가 없습니다.
        </div>
      )} */}
          {DummyStageList &&
            DummyStageList.map((stage) => (
              <StageCard
                key={stage.id}
                title={stage.title}
                location={stage.location}
                time={stage.time}
                image={stage.image}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
