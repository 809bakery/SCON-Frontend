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
  mypage: '마이페이지',
  profile: '프로필 변경',
  password_reset: '비밀번호 변경',
  leave: '회원 탈퇴',
  info: '회원 정보',
  push_settings: '알림 설정',
  scontalk: '스콘톡',
}

export default function Navbar() {
  const pathname = usePathname()
  const domainList = pathname.split('/').filter(Boolean)
  const lastDomain = decodeURIComponent(domainList[domainList.length - 1])
  if (domainList.includes('scontalk') && lastDomain !== 'scontalk') {
    return null
  }

  if (domainList.includes('detail') && lastDomain !== 'detail') {
    return <NavbarWithGoback name={lastDomain} />
  }
  if (domainList.includes('list') && lastDomain !== 'list') {
    let name
    if (lastDomain === 'all') {
      name = '전체 스테이지'
    } else if (lastDomain === 'my') {
      name = '민정’s 스테이지'
    } else if (lastDomain === 'pick') {
      name = 'SCON’S PICK'
    }
    return <NavbarWithGoback name={name} />
  }
  if (domainList[0] === 'menu') {
    return null
  }
  if (domainList[0] === 'main') {
    return <NavbarWithoutGoback />
  }
  return <NavbarWithGoback nameList={domainList} />
}
