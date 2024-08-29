'use client'

import Navbar from "./Components/Navbar";
import Temperature from "./Components/Temperature/Temperature";
import AirPollution from "./Components/AirPollution/AirPollution";
import Sunset from "./Components/Sunset/Sunset";
import Wind from "./Components/Wind/Wind";
import DailyForecast from "./Components/DailyForecast/DailyForecast";
import UvIndex from "./Components/UvIndex/UvIndex";
import Population from "./Components/Population/Population";
import FeelsLike from "./Components/FeelsLike/FeelsLike";
import Humidity from "./Components/Humidity/Humidity";
import Visibility from "./Components/Visibility/Visibility";
import Pressure from "./Components/Pressure/Pressure";
import defaultStates from "./utils/defaultStates";
import FiveDayForecast from "./Components/FiveDayForecast/FiveDayForecast";
import dynamic from "next/dynamic";
import { useGlobalContext } from "./context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

const Mapbox = dynamic(() => import("./Components/Mapbox/Mapbox"), {
  ssr: false,
});


export default function Home() {
  const { setActiveCityCoords, isAllDataFetched } = useGlobalContext()

  const renderContent = () => {
    if (!isAllDataFetched) {
      return (
        <div className="flex flex-col gap-4 mt-3">
          <Skeleton className='h-[3rem] w-full' />
          <Skeleton className='h-[38rem] w-full' />
        </div>
      )
    }

    return (
      <>
        <Navbar />
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />
            <FiveDayForecast />
          </div>
          <div className="flex flex-col w-full">
            <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <AirPollution />
              <Sunset />
              <Wind />
              <DailyForecast />
              <UvIndex />
              <Population />
              <FeelsLike />
              <Humidity />
              <Visibility />
              <Pressure />
            </div>
            <div className="mapbox-con mt-4 flex gap-4">
              <Mapbox />
              <div className="states flex flex-col gap-3 flex-1">
                <h2 className="flex items-center gap-2 font-medium">
                  Top Large Cities
                </h2>
                <div className="flex flex-col gap-4">
                  {defaultStates.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                        onClick={() => setActiveCityCoords([item.lat, item.lon])}
                      >
                        <p className="px-6 py-4">{item.name}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="py-4 flex justify-center pb-8">
          <p className="footer-text text-sm flex items-center gap-1">
            Made by Piyush Dhamecha
          </p>
        </footer>
      </>
    )
  }
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[6rem] m-auto min-h-screen">
      {renderContent()}
    </main>
  );
}
