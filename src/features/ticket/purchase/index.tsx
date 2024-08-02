/* eslint-disable import/no-extraneous-dependencies */
import PortOne from '@portone/browser-sdk/v2'
import { useParams, useRouter } from 'next/navigation'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import TicketWrapperCard from '@/features/ticket/card/index.tsx'
import TicketCounter from '@/features/ticket/purchase/count/index.tsx'
import TicketChargeSVG from '@/static/svg/ticket/ticket-charge-icon.svg'

interface TicketPurchaseProps {
  stage: ContentType
  setIsCalendar: (value: number | undefined) => void
}

interface ContentType {
  id: number
  episodeNumber: number
  time: string
  status: string
}

function TicketPurchase(props: TicketPurchaseProps) {
  const router = useRouter()
  const params = useParams()
  const { stage, setIsCalendar } = props
  const parseDate = (time: string) => {
    const hour =
      new Date(time).getHours() < 12
        ? new Date(time).getHours()
        : new Date(time).getHours() - 12
    const min = new Date(time).getMinutes()

    const meridiem = new Date(time).getHours() < 12 ? '오전' : '오후'

    return `${new Date(time).toLocaleDateString('ko-kr')} ${meridiem} ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
  }

  // eslint-disable-next-line consistent-return
  const handlePurchase = async () => {
    const res = await PortOne.requestPayment({
      // Store ID 설정
      storeId: 'store-6d7f6515-9cf2-482f-bfe6-fb3684a48014',
      // 채널 키 설정
      channelKey: 'channel-key-8e1647ad-6dda-4c67-881f-09c3be369c18',
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: 'SCON: 스테이지 티켓 예매하기',
      totalAmount: DUMMY_STAGE_DETAIL.headCount,
      currency: 'CURRENCY_KRW',
      payMethod: 'CARD',
      redirectUrl: `localhost:3000/ticket/${params.id}/success`,
    })
    if (res && res.code != null) {
      return alert('결제가 실패했습니다.')
    }

    router.push(`/ticket/${params}/success`)
  }

  return (
    <div className="flex flex-col gap-y-3">
      {/* title */}
      <div className="p-3 flex items-center justify-between">
        <span className="font-bold">
          🍪{parseDate(stage?.time)} 티켓 예매진행중
        </span>
        <button
          type="button"
          className="bg-primary text-white rounded-xl py-2 px-3"
          onClick={() => setIsCalendar(undefined)}
        >
          날짜 다시 선택
        </button>
      </div>

      {/* 티켓 매수 선택 */}
      <TicketWrapperCard classnames="p-5 flex justify-between items-center">
        <div className="flex flex-col gap-y-3">
          <p>티켓 매수를 선택해주세요</p>
          <div className="flex flex-col">
            <span>자유석</span>
            <span className="text-xl font-bold">
              {DUMMY_STAGE_DETAIL.cost.toLocaleString('ko-kr')}
            </span>
          </div>
        </div>
        <TicketCounter />
      </TicketWrapperCard>

      {/* 예매자 정보 입력 */}
      <TicketWrapperCard classnames="p-5 flex flex-col gap-y-3">
        <h3 className="font-bold">예매자 정보를 입력해주세요</h3>
        <TicketWrapperCard classnames="px-4 py-2 bg-[#E5E5ED]">
          <p className="text-[#A6A6B1]">이메일 주소</p>
          <span className="text-disabled">gkffhdnls13@gmail.com</span>
        </TicketWrapperCard>

        {/* <TicketWrapperCard classnames="px-4 py-2 bg-[#E5E5ED]">
          <p className="text-[#A6A6B1]">생년월일인데 이거 안받잖아</p>
          <span className="text-disabled">980113</span>
        </TicketWrapperCard> */}

        <TicketWrapperCard classnames="px-4 py-2">
          <p className="text-[#A6A6B1]">예매자 이름</p>
          <input
            className="w-full text-disabled outline-none"
            defaultValue={DUMMY_STAGE_DETAIL.oven.accountName}
          />
        </TicketWrapperCard>

        <TicketWrapperCard classnames="px-4 py-2">
          <p className="text-[#A6A6B1]">연락처</p>
          <input
            className="w-full text-disabled outline-none"
            defaultValue="010-1234-5678"
          />
        </TicketWrapperCard>
      </TicketWrapperCard>

      {/* 티켓 수령방법 */}
      <TicketWrapperCard classnames="p-5 flex flex-col gap-y-3">
        <h3 className="font-bold">티켓 수령 방법 선택</h3>
        <div className="flex gap-x-2">
          <div className="w-6 h-6 border-2 border-primary flex items-center justify-center p-1 rounded-full cursor-pointer">
            <input
              defaultChecked
              type="radio"
              className="w-full aspect-square appearance-none border-2 border-primary rounded-full checked:bg-primary checked:border-primary cursor-pointer"
              id="mobile"
              name="ticket"
              value="mobile"
            />
          </div>

          <label htmlFor="mobile" className="cursor-pointer">
            모바일 티켓 발급
          </label>
        </div>
      </TicketWrapperCard>

      {/* 결제 예정 금액 */}
      <TicketWrapperCard classnames="p-5 flex flex-col gap-y-3">
        <h3 className="font-bold">결제 예정 금액</h3>
        <div className="flex justify-between items-center px-4 py-5 rounded-xl border border-border">
          <div>
            <p className="text-[#A6A6B1]">티켓금액</p>
            <p className="text-disabled">
              {DUMMY_STAGE_DETAIL.cost.toLocaleString('ko-kr')}
            </p>
          </div>
          <div>
            <div className="flex text-[#A6A6B1]">
              <TicketChargeSVG className="w-6 h-6" />
              <span>수수료</span>
            </div>
            <p className="text-disabled">500</p>
          </div>
          <div>
            <p className="text-[#A6A6B1]">합계</p>
            <p className="text-disabled">
              {(DUMMY_STAGE_DETAIL.cost + 500).toLocaleString('ko-kr')}
            </p>
          </div>
        </div>
      </TicketWrapperCard>
      <button
        type="button"
        className="w-full bg-primary rounded-xl py-5 flex items-center justify-center text-xl"
        onClick={handlePurchase}
      >
        결제하기
      </button>
    </div>
  )
}

export default TicketPurchase
