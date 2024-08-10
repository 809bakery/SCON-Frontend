import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface TabProps {
  name: string
  label: string
  tabCount: number
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

export default function Tab({
  name,
  label,
  activeTab,
  tabCount,
  setActiveTab,
}: TabProps) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (params.get('tab') !== activeTab) {
      params.set('tab', activeTab)
      params.delete('keyword')
      params.delete('sort')
    }

    replace(`${pathname}?${params.toString()}`)
  }, [activeTab, pathname, replace, searchParams])

  return (
    <div
      role="presentation"
      style={{ width: `calc(100% / ${tabCount})` }}
      className={`text-2xl flex justify-center items-center py-5 box-border cursor-pointer ${activeTab === name ? 'font-bold border-b-[.3125rem] border-primary' : 'font-medium  border-b-0.5 border-border text-disabled'}`}
      onClick={() => handleChangeTab(name)}
    >
      <span>{label}</span>
    </div>
  )
}
