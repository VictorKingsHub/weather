"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  // ✅ async function for weather data
  const fetchWeather = async (): Promise<WeatherResponse> => {
    const res = await axios.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=Aba&appid=${apiKey}&units=metric`
    );
    return res.data;
  };

  const { isLoading, isError, data, error } = useQuery<WeatherResponse>({
    queryKey: ["weather", "Aba"],
    queryFn: fetchWeather,
  });

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black text-gray-700 dark:text-white">
        Loading weather data...
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-100 text-red-800">
        Error: {(error as Error).message}
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black text-gray-800 dark:text-white">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Weather in {data?.name}</h1>
        <p className="text-lg capitalize">{data?.weather[0].description}</p>
        <p className="text-3xl font-semibold">{data?.main.temp}°C</p>
        <p className="text-sm text-gray-500">Humidity: {data?.main.humidity}%</p>
        <p className="text-sm text-gray-500">Wind: {data?.wind.speed} m/s</p>
      </div>
    </div>
  );
}
