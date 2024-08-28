'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import { Droplet, Eye, Gauge, Thermometer } from 'lucide-react'
import React from 'react'

function Pressure() {
  const { forecastData } = useGlobalContext()

  if (!forecastData || !forecastData?.main || !forecastData?.main?.pressure) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { pressure } = forecastData?.main

  const pressureText = (pressureProp: number) => {
    if (pressureProp < 1000) return 'Very low pressure'
    if (pressureProp >= 1000 && pressureProp < 1015) return 'Low pressure. Expect weather changes.'
    if (pressureProp >= 1015 && pressureProp < 1025) return 'Normal pressure. Expect weather changes.'
    if (pressureProp >= 1025 && pressureProp < 1040) return 'High pressure. Expect weather changes.'
    if (pressureProp >= 1040) return 'Very high pressure. Expect weather changes.'
    return 'Unavailable: Pressure data not available'
  }

  return (
    <div
      className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'
    >
      <div className="top">
        <h2 className='flex items-center gap-2 font-medium'>
          <Gauge /> Pressure
        </h2>
        <p className='pt-4 text-2xl'>
          {pressure} hpa
        </p>
      </div>
      <p className='text-sm'>{pressureText(pressure)}</p>
    </div>
  )
}

export default Pressure