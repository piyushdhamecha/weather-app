'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { Skeleton } from '@/components/ui/skeleton'
import { LucideWind } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Compass from '../Compass/Compass'

export default function Wind() {
  const { forecastData } = useGlobalContext()

  if (!forecastData || !forecastData?.wind) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const windSpeed = forecastData?.wind?.speed
  const windDir = forecastData?.wind?.deg

  return (
    <div className="wind pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <h2 className="flex items-center gap-2 font-medium">
        <LucideWind size={15} />
        Wind
      </h2>
      <div className='compass relative flex items-center justify-center'>
        <Compass speed={windSpeed} deg={windDir} />
      </div>
    </div>
  )
}
