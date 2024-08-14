import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import ExitSVG from '@/static/svg/exit-icon.svg'

interface MypageTapProps {
  text?: string
  url?: string
  ex_link?: string
  color?: string
  toastMsg?: string
}

export default function MypageTap({
  text,
  url,
  ex_link,
  color,
  toastMsg,
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
      <ExitSVG className="w-20 h-20" />
      <span className="text-xl font-medium">{text}</span>
    </div>
  )
}
