'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { formatNumber } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import { UserRound, UsersRound } from 'lucide-react'
import React from 'react'

export default function Population() {
  const { fiveDayForecast } = useGlobalContext()
  const { city } = fiveDayForecast

  if (!fiveDayForecast || !city) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  return (
    <div
      className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <UsersRound size={15} />
          Population
        </h2>
        <p className='pt-4 text-2xl'>
          {formatNumber(city.population)}
        </p>
      </div>
      <p className='text-sm'>Latest UN population data for {city.name}.</p>
    </div>
  )
}
