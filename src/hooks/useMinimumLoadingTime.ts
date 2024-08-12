import { useEffect, useState } from 'react'

export const useMinimumLoadingTime = (isLoading: boolean, time: number) => {
  const [showLoading, setShowLoading] = useState(false)
  let startTime = Date.now()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    startTime = Date.now()
    let timeoutId: string | number | NodeJS.Timeout | undefined

    if (isLoading) {
      setShowLoading(true)
      timeoutId = setTimeout(() => {
        setShowLoading(isLoading)
      }, time)
    } else {
      const now = Date.now()
      const elapsedTime = now - startTime
      if (elapsedTime < time) {
        setTimeout(() => {
          setShowLoading(false)
        }, time - elapsedTime)
      } else {
        setShowLoading(false)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [isLoading])

  return showLoading
}
