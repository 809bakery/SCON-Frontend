import Image from 'next/image'
import { useState } from 'react'

import { BANK_LIST } from '@/constants/oven/bank/index.ts'
import CloseSVG from '@/static/svg/sidebar/sidebar-close.svg'

interface BankModalProps {
  isModal: boolean
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
  setProfileBankName: React.Dispatch<React.SetStateAction<string>>
}

function BankModal(props: BankModalProps) {
  const { isModal, setIsModal, setProfileBankName } = props
  const [tab, setTab] = useState<number>(0)

  const selectBank = (name: string) => {
    setProfileBankName(name)
    setIsModal(false)
  }
  return (
    <div
      className={`w-full h-[100dvh] top-0 left-0 fixed flex flex-col justify-end items-center z-[-10] ${isModal && 'bg-black bg-opacity-50 !z-10'}`}
    >
      <div
        className={`${isModal ? 'h-[35rem]' : 'h-[0dvh]'} max-w-[598px] w-full bg-white rounded-t-xl transition-all duration-100 ease-in-out`}
      >
        {/* header */}
        <div className="py-9 relative flex items-center justify-center">
          <span className="text-3xl">은행 선택</span>
          <div className="w-8 h-8 absolute right-9">
            <button
              type="button"
              onClick={() => setIsModal(!isModal)}
              aria-label="close"
            >
              <CloseSVG className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* tab */}
        <div className="px-24 flex items-center justify-center gap-x-32 border-b border-border text-xl">
          <button
            className={`flex-1 py-5 flex items-center justify-center border-white border-b-4 ${tab === 0 && '!border-primary font-bold text-black'} `}
            type="button"
            onClick={() => setTab(0)}
          >
            은행
          </button>
          <button
            type="button"
            className={`flex-1 py-5 flex items-center justify-center border-white border-b-4 ${tab === 1 && '!border-primary font-bold text-black'}`}
            onClick={() => setTab(1)}
          >
            증권
          </button>
        </div>

        {/* item */}
        {tab === 0 ? (
          <div className="h-[25rem] px-8 pt-8 pb-[12.5rem] overflow-y-scroll flex flex-wrap gap-5 items-center">
            {BANK_LIST.map((bank) => (
              <button
                type="button"
                onClick={() => selectBank(bank.bankName)}
                key={bank.bankName}
                className="w-[30%] p-5 flex flex-col gap-y-5 items-center shrink-0 aspect-square rounded-xl bg-[#f9f9f9]"
              >
                <Image
                  src={bank.bankImage}
                  alt={bank.bankName}
                  className="w-14 h-14 object-cover"
                />
                <span className="text-xl">{bank.bankName}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className=" h-[25rem] px-8 pt-8 pb-[12.5rem] flex items-center justify-center text-2xl overflow-y-scroll">
            증권은 준비 중 입니다.
          </div>
        )}
      </div>
    </div>
  )
}

export default BankModal
