'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { unixToTime } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import { LucideSunset } from 'lucide-react'
import React from 'react'

export default function Sunset() {
  const { forecastData } = useGlobalContext()

  if (!forecastData || !forecastData?.sys || !forecastData?.sys?.sunset) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const times = forecastData.sys.sunset
  const timezone = forecastData?.timezone

  const sunsetTime = unixToTime(times, timezone)
  const sunriseTime = unixToTime(forecastData.sys.sunrise, timezone)

  return (
    <div className="sunset pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <LucideSunset size={15} />
          Sunset
        </h2>
        <p className='pt4 text-2xl'>{sunsetTime}</p>
      </div>
      <p className='text-sm'>Sunrise: {sunriseTime}</p>
    </div>
  )
}
