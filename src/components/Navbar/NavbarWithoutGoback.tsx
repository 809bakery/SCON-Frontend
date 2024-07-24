/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useRouter } from 'next/navigation'

import AlarmSVG from '@/static/svg/navbar/nav-alarm-icon.svg'
import LogoSVG from '@/static/svg/navbar/nav-logo-icon.svg'
import MenuSVG from '@/static/svg/navbar/nav-menu-icon.svg'
import SearchSVG from '@/static/svg/navbar/nav-search-icon.svg'

export default function NavbarWithoutGoback() {
  const router = useRouter()

  const handleAlarmClick = () => {}

  const handleLogoClick = () => {
    router.push('/main')
  }

  const handleSearchClick = () => {
    router.push('/search')
  }

  const handleMenuClick = () => {
    router.push('/menu')
  }

  return (
    <div className="w-full h-[60px] flex items-center relative px-7 border-b-0.5 border-border">
      {/* 왼쪽 div */}
      <div className="w-full flex justify-start absolute left-7 cursor-pointer">
        <div role="presentation" id="alarm" onClick={handleAlarmClick}>
          <AlarmSVG />
        </div>
      </div>

      {/* 가운데 div */}
      <div className="w-full flex justify-center absolute left-1/2 -translate-x-1/2 cursor-pointer">
        <div role="presentation" id="alarm" onClick={handleLogoClick}>
          <LogoSVG />
        </div>
      </div>

      {/* 오른쪽 div */}
      <div className="w-full flex gap-2 justify-end absolute right-7 cursor-pointer">
        <div role="presentation" id="alarm" onClick={handleSearchClick}>
          <SearchSVG />
        </div>
        <div role="presentation" id="alarm" onClick={handleMenuClick}>
          <MenuSVG />
        </div>
      </div>
    </div>
  )
}
