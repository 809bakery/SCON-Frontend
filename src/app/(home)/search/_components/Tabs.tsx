'use client'

import { useState } from 'react'

import Tab from '@/app/(home)/search/_components/Tab.tsx'
import { SearchTabList } from '@/constants/search/index.ts'

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<string>('oven')

  return (
    <>
      {SearchTabList.map((tab) => (
        <Tab
          key={tab.id}
          name={tab.name}
          label={tab.label}
          tabCount={SearchTabList.length}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </>
  )
}
