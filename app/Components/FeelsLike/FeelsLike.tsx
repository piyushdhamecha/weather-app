'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import { Thermometer } from 'lucide-react'
import React from 'react'

function FeelsLike() {
  const { forecastData } = useGlobalContext()

  if (!forecastData || !forecastData?.main || !forecastData?.main?.feels_like) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { feels_like, temp_min, temp_max } = forecastData?.main

  const feelsLikeText = (feelsLike: number, minTemp: number, maxTemp: number) => {
    const avgTemp = (minTemp + maxTemp) / 2

    if (feelsLike < avgTemp - 5) {
      return 'Feels significantly colder then actual temperature.'
    }

    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return 'Feels close to the actual temperature.'
    }

    if (feelsLike > avgTemp + 5) {
      return 'Feels significantly warmer then actual temperature.'
    }

    return 'Temperature is typical for this range.'
  }

  return (
    <div
      className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'
    >
      <div className="top">
        <h2 className='flex items-center gap-2 font-medium'>
          <Thermometer /> Feels Like
        </h2>
        <p className='pt-4 text-2xl'>
          {kelvinToCelsius(feels_like)}&deg;
        </p>
      </div>
      <p className='text-sm'>{feelsLikeText(feels_like, temp_min, temp_max)}</p>
    </div>
  )
}

export default FeelsLike