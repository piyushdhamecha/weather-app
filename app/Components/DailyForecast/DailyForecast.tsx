'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { kelvinToCelsius } from '@/app/utils/misc'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { Cloud, CloudDrizzle, CloudLightning, CloudOff, CloudRainIcon, CloudSnow, Cloudy } from 'lucide-react'
import moment from 'moment'
import React from 'react'

export default function DailyForecast() {
  const { fiveDayForecast, forecastData } = useGlobalContext()

  const { weather } = forecastData
  const { city, list } = fiveDayForecast

  if (!fiveDayForecast || !city || !list || !forecastData || !weather) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const today = new Date()
  const todayString = today.toISOString().split('T')[0]

  const todaysForecast = list.filter((forecast: any) => forecast.dt_txt.startsWith(todayString))

  const { main: weatherMain } = weather[0]

  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return <CloudDrizzle />;

      case "Rain":
        return <CloudRainIcon />;

      case "Snow":
        return <CloudSnow />;

      case "Clear":
        return <Cloud />;

      case "Clouds":
        return <Cloudy />;

      case "Thunderstorm":
        return <CloudLightning />;

      default:
        return <CloudOff />;
    }
  };

  return (
    <div className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 
      dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2'>
      <div className='h-full flex gap-10 overflow-hidden'>
        {todaysForecast.length < 1
          ? (
            <div className='flex justify-center items-center w-full'>
              <h1 className='text-[2.5rem] line-through text-rose-500'>No data available!</h1>
            </div>
          ) : (
            <div className='w-full'>
              <Carousel>
                <CarouselContent>
                  {todaysForecast.map((item: any) => (
                    <CarouselItem key={item.dt} className='flex flex-col gap-4 cursor-grab basis-[8.5rem]'>
                      <p className="text-gray-100">
                        {moment(item.dt_txt).format("HH:mm")}
                      </p>
                      <p>{getIcon()}</p>
                      <p className='mt-4'>{kelvinToCelsius(item.main.temp)}&deg;C</p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          )
        }
      </div>
    </div>
  )
}
