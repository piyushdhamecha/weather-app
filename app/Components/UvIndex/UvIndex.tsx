'use client'

import { useGlobalContext } from '@/app/context/globalContext'
import { Skeleton } from '@/components/ui/skeleton'
import { Sun } from 'lucide-react'
import React from 'react'
import { UvProgress } from '../UvProgress/UvProgress'

export default function UvIndex() {
  const { uvData } = useGlobalContext()

  if (!uvData || !uvData.daily) {
    return <Skeleton className='h-[12rem] w-full' />
  }

  const { daily } = uvData
  const { uv_index_clear_sky_max, uv_index_max } = daily

  const uvIndexMax = uv_index_max[0].toFixed(0)

  const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
      return {
        text: "Low",
        description: 'No protection required.'
      }
    }

    if (uvIndex <= 5) {
      return {
        text: "Moderate",
        description: 'Stay in shade near midday.'
      }
    }

    if (uvIndex <= 7) {
      return {
        text: "High",
        description: 'Wear a hot and sunglasses'
      }
    }

    if (uvIndex <= 10) {
      return {
        text: "Very High",
        description: 'Apply sunscreen SPF 30+ every 2 hours.'
      }
    }

    return {
      text: 'Extreme',
      description: 'Avoid being outside.'
    }
  }

  const marginLeftPercentage = (uvIndexMax / 14) * 100

  return (
    <div
      className='pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none'
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          <Sun size={15} />
          Uv Index
        </h2>
        <div className='pt-4 flex flex-col gap-1'>
          <p className='text-2xl'>
            {uvIndexMax}
            <span className='text-sm'>
              ({uvIndexCategory(uvIndexMax).text})
            </span>
          </p>
          <UvProgress max={14} className="progress" value={marginLeftPercentage} />
        </div>
      </div>
      <p className='text-sm'>{uvIndexCategory(uvIndexMax).description}</p>
    </div>
  )
}
