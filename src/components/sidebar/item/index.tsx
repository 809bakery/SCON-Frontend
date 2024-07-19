import { useRouter } from 'next/navigation'

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
      // eslint-disable-next-line no-alert
      alert('준비 중 입니다🍪')
    }
  }

  return (
    <button
      type="button"
      onClick={handleUrl}
      className="px-14 py-7 font-extrabold text-xl border-b border-[#F2F3F7] text-start cursor-pointer"
    >
      <p>{text}</p>
    </button>
  )
}
export default SideBarMenu
