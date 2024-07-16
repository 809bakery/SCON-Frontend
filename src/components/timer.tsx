'use client'

import { memo, useEffect, useState } from 'react'

const Timer = memo(() => {
  const MINUTES_IN_MS = 3 * 60 * 1000
  const INTERVAL = 1000
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS)

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    '0',
  )
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL)
    }, INTERVAL)

    if (timeLeft <= 0) {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [timeLeft])

  return (
    <div className="w-[5rem]  text-2xl font-medium text-warning min-w-max">
      {minutes} : {second}
    </div>
  )
})

export default Timer
