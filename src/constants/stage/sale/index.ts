import { StaticImageData } from 'next/image'

import DummyOvenProfile4 from '@/static/img/dummy/search/dummy-oven-profile3.jpg'

type ReserveInformationType = {
  info: string
  caution: string
  cancelInfo: string
  oven: OvenType
}

type OvenType = {
  ovenId: number
  ovenName: string
  ovenDetail: string | null
  account: string
  accountName: string
  bankName: string
  image: string | StaticImageData
  followCount: number
  createdAt: string
}

export const SCON_RESERVE_DATA: ReserveInformationType = {
  info: '‘스콘’을 통해 티켓을 예매하면 결제 완료 또는 승인 시 서비스 내에서 모바일 티켓 (QR형태)로 발급됩니다.\n티켓의 예매 확인은 예매 확인 페이지에서 가능하며, QR코드의 경우 공연 시작 1시간 전부터 확인이 가능합니다.\n입장시 QR코드를 안내 스태프에게 보여주시면 입장이 가능합니다.\n빠른 입장을 위해 QR코드를 미리 준비해주세요.',
  caution:
    '‘스콘’을 통해 티켓을 예매하면 결제 완료 또는 승인 시 서비스 내에서 모바일 티켓 (QR형태)로 발급됩니다.\n티켓의 예매 확인은 예매 확인 페이지에서 가능하며, QR코드의 경우 공연 시작 1시간 전부터 확인이 가능합니다.\n입장시 QR코드를 안내 스태프에게 보여주시면 입장이 가능합니다.\n빠른 입장을 위해 QR코드를 미리 준비해주세요.',
  cancelInfo:
    '마이페이지 내의 예매 확인에서 예매 취소가 가능합니다.\n\n취소일자에 따라 취소 수수료가 부과됩니다.\n예매일 기준보다 관람일 기준이 우선 적용됩니다.\n단, 예매 당일 밤 12시 이전 취소 시에는 취소수수료가 없습니다.\n\n예매 후 7일 이내 | 없음\n관람일 7일 전까지 | 티켓 금액의 10%\n관람일 6일전 - 3일전 | 티켓 금액의 20%\n관람일 2일전 | 티켓 금액의 30%',
  oven: {
    ovenId: 2,
    ovenName: '릴파',
    ovenDetail: null,
    account: '2024',
    accountName: 'admin',
    bankName: '왁두은행',
    image: DummyOvenProfile4,
    followCount: 0,
    createdAt: '2023-02-15T10:30:00',
  },
}
