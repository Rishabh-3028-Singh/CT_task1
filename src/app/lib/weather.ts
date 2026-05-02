import { WeatherData } from "./types";

const WMO_CODES: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Icy Fog",
  51: "Light Drizzle",
  53: "Drizzle",
  55: "Heavy Drizzle",
  61: "Slight Rain",
  63: "Rain",
  65: "Heavy Rain",
  71: "Slight Snow",
  73: "Snow",
  75: "Heavy Snow",
  80: "Slight Showers",
  81: "Showers",
  82: "Heavy Showers",
  95: "Thunderstorm",
  96: "Thunderstorm with Hail",
  99: "Heavy Thunderstorm",
};

export function getWeatherDescription(code: number): string {
  return WMO_CODES[code] ?? "Unknown";
}

export async function fetchWeather(): Promise<WeatherData> {
  // Default location: New York City
  const lat = 40.7128;
  const lon = -74.006;

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&temperature_unit=celsius&wind_speed_unit=kmh&timezone=America%2FNew_York&forecast_days=1`;

  const response = await fetch(url, { next: { revalidate: 600 } });
  if (!response.ok) throw new Error("Weather API request failed");

  const data = await response.json();

  const current = data.current;
  const daily = data.daily;

  return {
    city: "New York",
    country: "US",
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,
    weatherDescription: getWeatherDescription(current.weather_code),
    isDay: current.is_day === 1,
    high: Math.round(daily.temperature_2m_max[0]),
    low: Math.round(daily.temperature_2m_min[0]),
  };
}
