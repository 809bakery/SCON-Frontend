import { StaticImageData } from 'next/image'

import HanaIcon from '@/static/img/bank/bank-hana-icno.png'
import KbICON from '@/static/img/bank/bank-kb-icon.png'
import NhICON from '@/static/img/bank/bank-nh-icon.png'
import ShinhanICON from '@/static/img/bank/bank-shinhan-icon.png'
import WooriICON from '@/static/img/bank/bank-woori-icon.png'

type BankType = {
  bankImage: string | StaticImageData
  bankName: string
}

export const BANK_LIST: BankType[] = [
  {
    bankImage: HanaIcon,
    bankName: '하나',
  },
  {
    bankImage: KbICON,
    bankName: '국민',
  },
  {
    bankImage: NhICON,
    bankName: '농협',
  },
  {
    bankImage: ShinhanICON,
    bankName: '신한',
  },
  {
    bankImage: WooriICON,
    bankName: '우리',
  },
]
