interface TabProps {
  name: 'oven' | 'stage'
  label: '오븐' | '스테이지'
  activeTab: 'oven' | 'stage'
  setActiveTab: (tab: 'oven' | 'stage') => void
}

export default function Tab({
  name,
  label,
  activeTab,
  setActiveTab,
}: TabProps) {
  const handleChangeTab = (tab: 'oven' | 'stage') => {
    setActiveTab(tab as 'oven' | 'stage')
  }

  return (
    <div
      role="presentation"
      className={`w-1/2 text-2xl flex justify-center items-center py-5 box-border cursor-pointer ${activeTab === name ? 'font-bold border-b-[.3125rem] border-primary' : 'font-medium  border-b-0.5 border-border text-disabled'}`}
      onClick={() => handleChangeTab(name)}
    >
      <span>{label}</span>
    </div>
  )
}
