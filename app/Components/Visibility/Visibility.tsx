'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import { Droplet, Eye, Thermometer } from 'lucide-react'
import React from 'react'

function Visibility() {
  const { forecastData } = useGlobalContext()

  if (!forecastData || !forecastData?.visibility) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { visibility } = forecastData

  const visibilityText = (visibilityProps: number) => {
    const visibilityInKm = Math.round(visibilityProps / 1000)

    if (visibilityInKm > 10) {
      return 'Excellent: Clear and vast view'
    }

    if (visibilityInKm > 5) {
      return 'Good: Easily navigable'
    }

    if (visibilityInKm > 2) {
      return 'Moderate: Some limitations'
    }

    if (visibilityInKm <= 2) {
      return 'Poor: Restricted and unclear'
    }

    return 'Unavailable: Visibility data not available'
  }

  return (
    <div
      className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'
    >
      <div className="top">
        <h2 className='flex items-center gap-2 font-medium'>
          <Eye /> Humidity
        </h2>
        <p className='pt-4 text-2xl'>
          {Math.round(visibility / 1000)} km
        </p>
      </div>
      <p className='text-sm'>{visibilityText(visibility)}.</p>
    </div>
  )
}

export default Visibility