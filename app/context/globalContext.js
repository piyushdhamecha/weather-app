'use client'
import axios from "axios"
import React, { createContext, useState, useContext, useEffect } from "react"
import { debounce, isEmpty } from 'lodash'
import defaultStates from "../utils/defaultStates"

const GlobalContext = createContext()
const GlobalContextUpdate = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [forecastData, setForecastData] = useState({})
  const [airQuality, setAirQuality] = useState({})
  const [fiveDayForecast, setFiveDayForecast] = useState({})
  const [uvData, setUvData] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [activeCityCoords, setActiveCityCoords] = useState([40.7128, -74.006])
  const [geoCodedList, setGeoCodedList] = useState(defaultStates)

  const [isAllDataFetched, setIsAllDataFetched] = useState(false)

  const fetchForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`api/weather?lat=${lat}&lon=${lon}`)

      setForecastData(response.data)
    } catch (error) {
      console.log('Error fetching forecast data: ', error.message)
    }
  }

  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`)

      setAirQuality(response.data)
    } catch (error) {
      console.log('Error fetching air pollution data: ', error.message)
    }
  }

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const response = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`)

      setFiveDayForecast(response.data)
    } catch (error) {
      console.log('Error fetching five day data: ', error.message)
    }
  }

  const fetchUvData = async (lat, lon) => {
    try {
      const response = await axios.get(`api/uv?lat=${lat}&lon=${lon}`)

      setUvData(response.data)
    } catch (error) {
      console.log('Error fetching uv data: ', error.message)
    }
  }

  const handleInput = (value) => {
    setInputValue(value)

    if (value === "") {
      setGeoCodedList(defaultStates)
    }
  }

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search)
    }, 500)

    if (inputValue) {
      debouncedFetch(inputValue)
    }

    return () => debouncedFetch.cancel()
  }, [inputValue])

  useEffect(() => {
    if (
      !isEmpty(forecastData)
      && !isEmpty(airQuality)
      && !isEmpty(fiveDayForecast)
      && !isEmpty(uvData)
    ) {
      setIsAllDataFetched(true)
    }
  }, [forecastData, airQuality, fiveDayForecast, uvData, setIsAllDataFetched])

  const fetchGeoCodedList = async (search) => {
    try {
      const response = await axios.get(`api/geocoded?search=${search}`)

      setGeoCodedList(response.data)
    } catch (error) {
      console.log('Error fetching geocoded list: ', error.message)
    }
  }

  useEffect(() => {
    fetchForecast(activeCityCoords[0], activeCityCoords[1])
    fetchAirQuality(activeCityCoords[0], activeCityCoords[1])
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1])
    fetchUvData(activeCityCoords[0], activeCityCoords[1])
  }, [activeCityCoords])

  return (
    <GlobalContext.Provider
      value={{
        forecastData,
        airQuality,
        fiveDayForecast,
        uvData,
        geoCodedList,
        inputValue,
        handleInput,
        fetchGeoCodedList,
        setActiveCityCoords,
        isAllDataFetched,
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