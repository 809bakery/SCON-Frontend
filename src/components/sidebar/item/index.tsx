import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface SideBarMenuProps {
  text: string
  // eslint-disable-next-line react/require-default-props
  url?: string
}

function SideBarMenu(props: SideBarMenuProps) {
  const { text, url } = props

  const router = useRouter()

  const handleUrl = () => {
    if (url) {
      router.push(url)
    } else {
      toast('로그인이 필요해요', {
        icon: '🍪',
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleUrl}
      className="px-14 py-7 font-extrabold text-xl border-b #F2F3F7] text-start cursor-pointer"
    >
      <p>{text}</p>
    </button>
  )
}
export default SideBarMenu
