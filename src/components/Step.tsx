'use client'

/* eslint-disable react/jsx-no-useless-fragment */
import { usePathname } from 'next/navigation'

interface StepProps {
  name: string
  children: React.ReactNode
}

export default function Step({ name, children }: StepProps) {
  const pathname = usePathname()

  if (pathname.includes(name)) {
    return <>{children}</>
  }
  return null
}
