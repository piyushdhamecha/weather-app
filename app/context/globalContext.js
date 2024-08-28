'use client'
import axios from "axios"
import React, { createContext, useState, useContext, useEffect } from "react"

const GlobalContext = createContext()
const GlobalContextUpdate = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState({})
  const [airQuality, setAirQuality] = useState({})
  const [fiveDayForecast, setFiveDayForecast] = useState({})
  const [uvData, setUvData] = useState({})

  const fetchForecast = async () => {
    try {
      const response = await axios.get('api/weather')

      setForecastData(response.data)
    } catch (error) {
      console.log('Error fetching forecast data: ', error.message)
    }
  }

  const fetchAirQuality = async () => {
    try {
      const response = await axios.get('api/pollution')

      setAirQuality(response.data)
    } catch (error) {
      console.log('Error fetching air pollution data: ', error.message)
    }
  }

  const fetchFiveDayForecast = async () => {
    try {
      const response = await axios.get('api/fiveday')

      setFiveDayForecast(response.data)
    } catch (error) {
      console.log('Error fetching five day data: ', error.message)
    }
  }

  const fetchUvData = async () => {
    try {
      const response = await axios.get('api/uv')

      setUvData(response.data)
    } catch (error) {
      console.log('Error fetching uv data: ', error.message)
    }
  }

  useEffect(() => {
    fetchForecast()
    fetchAirQuality()
    fetchFiveDayForecast()
    fetchUvData()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        forecastData,
        airQuality,
        fiveDayForecast,
        uvData
      }}
    >
      <GlobalContextUpdate.Provider>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate)