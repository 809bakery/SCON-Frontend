import toast from 'react-hot-toast'

import TicketArrowDownSVG from '@/static/svg/ticket/ticket-arrow-down-icon.svg'
import TicketArrowUpSVG from '@/static/svg/ticket/ticket-arrow-up-icon.svg'

import useTicketPurchaseStore from '@/store/PurchaseTicketStore.ts'

function TicketCounter() {
  const setHeadCountState = useTicketPurchaseStore(
    (state) => state.setHeadCount,
  )

  const headCount = useTicketPurchaseStore((state) => state.headCount)
  const handleCountUp = () => {
    if (headCount >= 4) {
      toast.error('1인 당 최대 4매까지만 예매 가능합니다.')
      return
    }

    setHeadCountState(headCount + 1)
  }

  const handleCountDown = () => {
    if (headCount <= 1) {
      return
    }

    setHeadCountState(headCount - 1)
  }
  return (
    <div className="w-20 flex aspect-square border-border border">
      <div className="flex-1 flex items-center justify-center text-[#363232] text-3xl font-bold border-r border-border">
        {headCount}
      </div>
      <div className="flex-1 flex flex-col">
        <button
          type="button"
          onClick={handleCountUp}
          className="flex-1 border-b border-border flex items-center justify-center"
        >
          {' '}
          <TicketArrowUpSVG className="w-3 h-5 cursor-pointer" />
        </button>
        <button
          type="button"
          onClick={handleCountDown}
          className="flex-1 flex items-center justify-center"
        >
          {' '}
          <TicketArrowDownSVG className="w-3 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

export default TicketCounter
