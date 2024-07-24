import Link from 'next/link'

import BackSVG from '@/static/svg/arrow-left-icon.svg'

interface NavbarWithGobackProps {
  nameList: string[]
}

const DOMAIN_NAME_MAPPING: {
  [key: string]: string
} = {
  login: '로그인',
  email: '이메일 로그인',
  find: '아이디 · 비밀번호',
  signup: '회원가입',
  search: '검색',
  detail: '오븐 상세',
}

const getNameFromDomainMapping = (nameList: string[]) => {
  const index = nameList.length >= 2 ? 1 : 0
  return (
    DOMAIN_NAME_MAPPING[nameList[index]] || DOMAIN_NAME_MAPPING[nameList[0]]
  )
}

export default function NavbarWithGoback({ nameList }: NavbarWithGobackProps) {
  const name = getNameFromDomainMapping(nameList)

  return (
    <div className="abolute top-0 w-full h-[60px] relative flex items-center justify-center py-[14px] border-b border-[#d6d5d5] text-center text-[#565551]">
      <Link href="/login" className="absolute left-7 cursor-pointer">
        <BackSVG className="w-8 h-8 min-w-[24px] min-h-[24px]" />
      </Link>
      <span className="font-bold text-[1.5rem]">{name}</span>
    </div>
  )
}
