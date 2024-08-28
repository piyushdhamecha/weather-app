'use client'

import React, { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useGlobalContext } from '@/app/context/globalContext'

function FlyToActiveCity({ activeCityCoords }: { activeCityCoords: { lat: number, lon: number } }) {
  const map = useMap()

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLevel = 13
      const flyToOptions = {
        duration: 1.5,
      }

      map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLevel, flyToOptions)
    }
  }, [activeCityCoords, map])

  return null
}

function Mapbox() {
  const { forecastData } = useGlobalContext()
  const activeCityCoords = forecastData?.coord

  if (!forecastData || !forecastData.coord) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div className='flex-1 basis-[50%] border rounded-lg h-full'>
      <MapContainer
        center={[activeCityCoords?.lat, activeCityCoords?.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className='rounded-lg m-4'
        style={{ height: "calc(100% - 2rem)", width: 'calc(100% - 2rem)' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  )
}

export default Mapbox