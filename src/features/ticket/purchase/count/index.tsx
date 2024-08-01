import { useState } from 'react'

import TicketArrowDownSVG from '@/static/svg/ticket/ticket-arrow-down-icon.svg'
import TicketArrowUpSVG from '@/static/svg/ticket/ticket-arrow-up-icon.svg'

function TicketCounter() {
  const [count, setCount] = useState<number>(1)
  const handleCountUp = () => {
    if (count >= 4) {
      alert('1인 당 최대 4매까지만 예매 가능합니다.')
      return
    }

    setCount(count + 1)
  }

  const handleCountDown = () => {
    if (count <= 1) {
      return
    }

    setCount(count - 1)
  }
  return (
    <div className="w-20 flex aspect-square border-border border">
      <div className="flex-1 flex items-center justify-center text-[#363232] text-3xl font-bold border-r border-border">
        {count}
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
