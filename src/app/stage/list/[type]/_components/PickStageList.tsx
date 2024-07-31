import Image from 'next/image'

import DummyStagePickThumbnail from '@/static/img/dummy/stagelist/dummy-stage-pick-thumbnail.jpg'

const DummyStagePickList = [
  {
    title: 'PM에게 UX라이팅을 맡겨보아요',
    image: '/dummy/dummy-stage-pick0.jpg',
    ovenName: '오븐명',
    location: '스테이지 장소',
    time: '스테이지 일시',
  },
  {
    title: '에스파표 예술 구현한 ‘아마겟돈’과 함께 화끈한 여름',
    image: '/dummy/dummy-stage-pick1.jpg',
    ovenName: '에스파',
    location: '올림픽 경기장',
    time: '2024. 08. 01',
  },
  {
    title: 'BLACK PINK IN YOUR AREA!',
    image: '/dummy/dummy-stage-pick2.jpg',
    ovenName: '블랙핑크',
    location: '올림픽 경기장',
    time: '2024. 08. 01',
  },
  {
    title: '이홍기의 꿀 VOICE를 현장에서 리얼하게!',
    image: '/dummy/dummy-stage-pick3.jpg',
    ovenName: '이홍기',
    location: '올림픽 경기장',
    time: '2024. 08. 01',
  },
  {
    title: '당신의 `HERO`가 되어줄게!',
    image: '/dummy/dummy-stage-pick4.jpg',
    ovenName: '루시(LUCY)',
    location: '도쿄돔 부도칸 요코하마아레나 일본 좋은곳 다넣어 그냥 막 다 넣어',
    time: '2024. 08. 01 - 2024. 08. 13',
  },
]

export default function PickStageList() {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Image
          src={DummyStagePickThumbnail}
          width={600}
          height={280}
          alt="thumbnail"
          className="object-cover h-[17.5rem]"
        />
        <div className="absolute bottom-2 left-4 flex flex-col">
          <span className="text-2xl font-bold leading-8 text-white">
            강렬하게 마음을 두드리는 멜로디!
          </span>
          <span className="text-3xl font-bold leading-10 text-white">
            스콘의 추천 스테이지 10개 ✨
          </span>
        </div>
      </div>
      <div className="py-10 px-7 flex flex-col gap-5">
        {DummyStagePickList.map((stage) => (
          <div className="w-full rounded-xl border border-border">
            <Image
              src={stage.image}
              width={600}
              height={220}
              alt="thumbnail"
              className="object-cover rounded-t-xl w-full h-[13.75rem]"
            />
            <div className="flex flex-col gap-3 px-5 py-4">
              <div className="flex flex-col">
                <span className="text-base font-medium leading-6 text-disabled">
                  {stage.location}
                </span>
                <span className="text-2xl font-bold leading-8">
                  {stage.title}
                </span>
              </div>
              <span className="text-base font-medium leading-6 text-disabled">
                {stage.ovenName} | {stage.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
