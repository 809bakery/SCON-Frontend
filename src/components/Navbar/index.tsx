/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useRouter } from 'next/navigation'

import LogoSVG from '@/static/svg/main-icon.svg'
import AlarmSVG from '@/static/svg/navbar/alarm-icon.svg'
import MenuSVG from '@/static/svg/navbar/menu-icon.svg'
import SearchSVG from '@/static/svg/navbar/search-icon.svg'

export default function Navbar() {
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
    <div className="w-full h-15 flex items-center relative px-7 border-b-0.5 border-border">
      {/* 왼쪽 div */}
      <div className="w-full flex justify-start absolute left-7 cursor-pointer">
        <div role="presentation" id="alarm" onClick={handleAlarmClick}>
          <AlarmSVG className="w-8 h-8" />
        </div>
      </div>

      {/* 가운데 div */}
      <div className="w-full flex justify-center absolute left-1/2 -translate-x-1/2 cursor-pointer">
        <div role="presentation" id="alarm" onClick={handleLogoClick}>
          <LogoSVG className="w-30 h-10" />
        </div>
      </div>

      {/* 오른쪽 div */}
      <div className="w-full flex justify-end absolute right-7 flex cursor-pointer">
        <div role="presentation" id="alarm" onClick={handleSearchClick}>
          <SearchSVG className="w-8 h-8 mr-2" />
        </div>
        <div role="presentation" id="alarm" onClick={handleMenuClick}>
          <MenuSVG className="w-8 h-8" />
        </div>
      </div>
    </div>
  )
}
