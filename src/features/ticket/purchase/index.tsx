import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
/* eslint-disable import/no-extraneous-dependencies */
import toast from 'react-hot-toast'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import TicketWrapperCard from '@/features/ticket/card/index.tsx'
import TicketCounter from '@/features/ticket/purchase/count/index.tsx'
import TicketChargeSVG from '@/static/svg/ticket/ticket-charge-icon.svg'

import useTicketPurchaseStore from '@/store/PurchaseTicketStore.ts'

interface TicketPurchaseProps {
  setIsCalendar: (value: number | undefined) => void
  id: number
}

declare const window: typeof globalThis & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IMP: any
}

function TicketPurchase(props: TicketPurchaseProps) {
  const router = useRouter()
  const params = useParams()

  const headCountState = useTicketPurchaseStore((state) => state.headCount)
  const subEventId = useTicketPurchaseStore((state) => state.subEventId)

  const { setIsCalendar, id } = props

  const queryClient = useQueryClient()
  const { mutate: createOrder } = useMutation({
    mutationFn: async () => {
      const formData = new FormData()
      formData.append('ovenId', stageDetail.eventResponseDto.ovenId.toString())
      formData.append('headCount', headCountState.toString())
      formData.append(
        'cost',
        (stageDetail.eventResponseDto.cost * headCountState + 500).toString(),
      )

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await privateApi.post(
        `/api/event/reserve/${subEventId}`,
        formData,
        config,
      )
      localStorage.removeItem('ticketPurchaseState')
      return response.data
    },

    onSuccess: () => {
      toast.success('결제가 완료되었습니다.')
      queryClient.invalidateQueries({ queryKey: ['reserve-stage-list'] })
      router.push(`/ticket/${id}/success`)
    },

    onError: (err) => {
      console.error(err)
    },
  })
  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', params.id],
    queryFn: async () => {
      let response
      if (loginUser) {
        response = await privateApi.get(`/api/event/${params.id}`)
      } else {
        response = await publicApi.get(`/api/event/${params.id}`)
      }
      return response.data
    },
  })

  const { data: loginUser } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  // eslint-disable-next-line consistent-return
  const handlePurchase = async () => {
    const { IMP } = window
    IMP.init(process.env.NEXT_PUBLIC_MERCHANT_ID)

    IMP.request_pay(
      {
        pg: 'tosspayments',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        name: stageDetail.eventResponseDto.title,
        amount: stageDetail.eventResponseDto.cost * headCountState + 500,
        buyer_email: loginUser.email,
        buyer_name: loginUser.nickname,
        buyer_tel: '010-1234-1234',
        buyer_addr: '서울특별시 강남구 테헤란로 212',
        buyer_postcode: '06220',
        m_redirect_url: `http://www.809bakery.com/ticket/${id}/success`,
        confirm_url: `http://www.809bakery.com/ticket/${id}/success`,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (res: any) => {
        try {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { error_msg } = res
          if (error_msg) {
            toast.error('결제 취소')
            return
          }
          createOrder()
        } catch (error) {
          toast.error('결제 실패')
        }
      },
    )
  }

  return (
    <div className="flex flex-col gap-y-3">
      {/* title */}
      <div className="p-3 flex items-center justify-between">
        <span className="font-bold">🍪 티켓 예매진행중</span>
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
              {stageDetail.eventResponseDto.cost.toLocaleString('ko-kr')}
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
          <span className="text-disabled">{loginUser.email}</span>
        </TicketWrapperCard>

        {/* <TicketWrapperCard classnames="px-4 py-2 bg-[#E5E5ED]">
          <p className="text-[#A6A6B1]">생년월일인데 이거 안받잖아</p>
          <span className="text-disabled">980113</span>
        </TicketWrapperCard> */}

        <TicketWrapperCard classnames="px-4 py-2">
          <p className="text-[#A6A6B1]">예매자 이름</p>
          <input
            className="w-full text-disabled outline-none"
            defaultValue={loginUser.nickname}
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
              {(
                stageDetail.eventResponseDto.cost * headCountState
              ).toLocaleString('ko-kr')}
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
              {(
                stageDetail.eventResponseDto.cost * headCountState +
                500
              ).toLocaleString('ko-kr')}
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
