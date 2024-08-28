"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { kelvinToCelsius } from "@/app/utils/misc";
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudOff,
  CloudRainIcon,
  CloudSnow,
  Cloudy,
  Navigation,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

export default function Temperature() {
  const { forecastData } = useGlobalContext();
  const { main, timezone, name, weather } = forecastData;

  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  if (!forecastData || !weather) {
    return <div>Loading...</div>;
  }

  const { main: weatherMain, description } = weather[0];

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

  const temp = kelvinToCelsius(main?.temp);
  const minTemp = kelvinToCelsius(main?.temp_min);
  const maxTemp = kelvinToCelsius(main?.temp_max);

  return (
    <div
      className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
          justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <p className="flex justify-between items-center">
        <span className="font-medium">{currentDay}</span>
        <span className="font-medium">{localTime}</span>
      </p>
      <p className="font-bold flex gap-1 pt-1">
        <span>{name}</span>
        <span>
          <Navigation />
        </span>
      </p>
      <p className="py-10 text-9xl font-bold self-center">{temp}&deg;</p>
      <div>
        <div>
          <span>{getIcon()}</span>
          <p className="pt-3 capitalize text-lg font-medium">{description}</p>
        </div>
        <p className="flex items-center gap-2 pt-2">
          <span>Low: {minTemp}&deg;</span>
          <span>High: {maxTemp}&deg;</span>
        </p>
      </div>
    </div>
  );
}
