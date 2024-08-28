'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius, unixToDay, unixToTime } from '@/app/utils/misc'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar } from 'lucide-react'
import React from 'react'

function FiveDayForecast() {
  const { fiveDayForecast } = useGlobalContext()
  const { city, list } = fiveDayForecast

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const processData = (dailyData: {
    main: { temp_min: number, temp_max: number }
    dt: number
  }[]) => {
    let minTemp = Number.MAX_VALUE
    let maxTemp = Number.MIN_VALUE

    dailyData.forEach(({ main: { temp_min, temp_max }, dt }) => {
      if (temp_min < minTemp) {
        minTemp = temp_min
      }

      if (temp_max > maxTemp) {
        maxTemp = temp_max
      }
    })

    return {
      minTemp,
      maxTemp,
      day: unixToDay(dailyData[0].dt)
    }
  }

  const groupedData = list.reduce((result: any, item: any) => {
    const shortDateString = item.dt_txt.substring(0, 10)

    if (result.hasOwnProperty(shortDateString)) {
      return {
        ...result,
        [shortDateString]: [
          ...result[shortDateString],
          item
        ]
      }
    } else {
      return {
        ...result,
        [shortDateString]: [item]
      }
    }
  }, {})

  const dailyForecast: any = []

  Object.keys(groupedData).forEach((key, i) => {
    dailyForecast.push(processData(groupedData[key]))
  })

  return (
    <div className='pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div>
        <h2 className='flex items-center gap-2 font-medium'>
          <Calendar /> 5-Day forecast for {city.name}
        </h2>
        <div className='forecast-list pt-3'>
          {dailyForecast.map((item: any, i: number) => (
            <div key={i} className='daily-forecast py-4 flex flex-col justify-evenly border-b-2'>
              <p className='text-xl min-w-[3.5rem]'>{item.day}</p>
              <p className='text-sm flex justify-between'>
                <span>(low)</span>
                <span>(high)</span>
              </p>
              <div className='flex-1 flex items-center justify-between gap-4'>
                <p className='font-bold'>
                  {kelvinToCelsius(item.minTemp)}&deg;C
                </p>
                <div className='temperature flex w-full h-2 rounded-lg'></div>
                <p className='font-bold'>
                  {kelvinToCelsius(item.maxTemp)}&deg;C
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FiveDayForecast