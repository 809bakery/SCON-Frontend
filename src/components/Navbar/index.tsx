'use client'

import { usePathname } from 'next/navigation'

import NavbarWithGoback from '@/components/Navbar/NavbarWithGoback.tsx'
import NavbarWithoutGoback from '@/components/Navbar/NavbarWithoutGoback.tsx'

export const DOMAIN_NAME_MAPPING: {
  [key: string]: string
} = {
  login: '로그인',
  email: '이메일 로그인',
  find: '아이디 · 비밀번호',
  signup: '회원가입',
  search: '검색',
  detail: '오븐 둘러보기',
}

export default function Navbar() {
  const pathname = usePathname()
  const domainList = pathname.split('/').filter(Boolean)
  const lastDomain = decodeURIComponent(domainList[domainList.length - 1])

  // domainList에 detail이 있을 때
  if (domainList.includes('detail') && lastDomain !== 'detail') {
    return <NavbarWithGoback name={lastDomain} />
  }
  if (domainList[0] === 'menu') {
    return null
  }
  if (domainList[0] === 'main') {
    return <NavbarWithoutGoback />
  }
  return <NavbarWithGoback nameList={domainList} />
}
