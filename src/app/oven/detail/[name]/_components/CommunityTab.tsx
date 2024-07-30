'use client'

import CommunityContentCard from '@/app/oven/detail/[name]/_components/CommunityContentCard.tsx'

const content = [
  {
    ovenCommunityId: 1,
    content:
      '키보드는 어찌저찌 고쳐졌는데 말이죠 모니터도 갑자기 나가부러서…. ㅇㅅㅇ:;;;;\n포트 교체, 선 교체도 해봤는데 쩝…. 왕스트레스를 받아버려~~~!!!\n그래서 오늘은 개인적인 일도 다 마무리 하구 내일 뵙겠습니당 ㅜㅜ\n내일 봐용 이파리들 🥺🥺🥺',
    image: '',
    bestCount: 0,
    expectCount: 13,
    congratulationCount: 15,
    tearCount: 8,
    cheerCount: 4562,
    createdAt: '2024. 07. 23',
  },
  {
    ovenCommunityId: 2,
    content:
      '소통 하다가 히로아카 남은 2쿨 달리도록 할게용~~!!\n곧 키겠스무니다!',
    image: '/dummy/dummy-oven-detail-community2.png',
    bestCount: 0,
    expectCount: 13,
    congratulationCount: 15,
    tearCount: 8,
    cheerCount: 4562,
    createdAt: '2024. 07. 23',
  },
  {
    ovenCommunityId: 3,
    content:
      '행사 시간표와 공지사항 지키는 이파리들 멋있어요~~!\n\n오늘 커피차 중계 생방송은 오후 1시 예정이지만\n실시간으로 보고 쪼매 딜레이될 수도 있는?!!\n\n생방송 굿즈 추첨도 오늘 진행합니당!!!\n(생방송에서 채팅치시는 분들 중 추첨될 예정이라규~)\n\n그럼 다들 푹자고 봐용!!!',
    image: '/dummy/dummy-oven-detail-community1.jpg',
    bestCount: 0,
    expectCount: 13,
    congratulationCount: 15,
    tearCount: 8,
    cheerCount: 4562,
    createdAt: '2024. 07. 23',
  },
]

export default function CommunityTab() {
  return (
    <div className="flex flex-col gap-3 py-14 px-7">
      {content.map((data) => (
        <CommunityContentCard
          key={data.ovenCommunityId}
          content={data.content}
          image={data.image || ''}
          bestCount={data.bestCount || 0}
          expectCount={data.expectCount || 0}
          congratulationCount={data.congratulationCount || 0}
          tearCount={data.tearCount || 0}
          cheerCount={data.cheerCount || 0}
          createdAt={data.createdAt}
        />
      ))}
    </div>
  )
}
