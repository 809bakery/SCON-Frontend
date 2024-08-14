import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import ExitSVG from '@/static/svg/exit-icon.svg'
import MyOvenSVG from '@/static/svg/my-oven-icon.svg'
import NotificationSVG from '@/static/svg/notification-setting-icon.svg'
import PasswordResetSVG from '@/static/svg/password-reset-icon.svg'
import ProfileSettingSVG from '@/static/svg/profile-setting-icon.svg'
import TermSVG from '@/static/svg/terms-icon.svg'

interface MypageTapProps {
  text?: string
  url?: string
  ex_link?: string
  color?: string
  toastMsg?: string
  icon?: string
}

export default function MypageTap({
  text,
  url,
  ex_link,
  color,
  toastMsg,
  icon,
}: MypageTapProps) {
  const router = useRouter()

  const handleUrl = () => {
    if (toastMsg) {
      toast(toastMsg as string, { icon: '🍪' })
      return
    }
    if (url) {
      router.push(url)
    } else if (ex_link) {
      window.open(ex_link, '_blank')
    } else {
      // eslint-disable-next-line no-alert
      alert('준비 중 입니다🍪')
    }
  }

  return (
    <div
      role="presentation"
      className="flex items-center gap-3 pl-10 cursor-pointer"
      style={{ color: color ? `${color}` : '#000' }}
      onClick={handleUrl}
    >
      {icon === 'exit' && <ExitSVG className="w-20 h-20" />}
      {icon === 'my-oven' && <MyOvenSVG className="w-20 h-20" />}
      {icon === 'notification-setting' && (
        <NotificationSVG className="w-20 h-20" />
      )}
      {icon === 'profile-setting' && (
        <ProfileSettingSVG className="w-20 h-20" />
      )}
      {icon === 'password-reset' && <PasswordResetSVG className="w-20 h-20" />}
      {icon === 'term' && <TermSVG className="w-20 h-20" />}

      <span className="text-xl font-medium">{text}</span>
    </div>
  )
}
