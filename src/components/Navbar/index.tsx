'use client'

import { usePathname } from 'next/navigation'

import NavbarWithGoback from '@/components/Navbar/NavbarWithGoback.tsx'
import NavbarWithoutGoback from '@/components/Navbar/NavbarWithoutGoback.tsx'

export default function Navbar() {
  const pathname = usePathname()
  const domainList = pathname.split('/').filter(Boolean)
  if (domainList[0] === 'menu') {
    return null
  }
  if (domainList[0] === 'main') {
    return <NavbarWithoutGoback />
  }
  return <NavbarWithGoback nameList={domainList} />
}
