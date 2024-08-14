'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Tab from '@/app/(home)/search/_components/Tab.tsx'
import { SearchTabList } from '@/constants/search/index.ts'

export default function Tabs() {
  const params = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>(
    params.get('tab') || 'oven',
  )

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
