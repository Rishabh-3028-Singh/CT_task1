"use client";

import { motion } from "framer-motion";
import { WeatherData } from "@/app/lib/types";

function WeatherIcon({ code, isDay }: { code: number; isDay: boolean }) {
  // Map WMO codes to emoji icons
  if (code === 0 || code === 1) return <span>{isDay ? "☀️" : "🌙"}</span>;
  if (code === 2) return <span>{isDay ? "⛅" : "🌤️"}</span>;
  if (code === 3) return <span>☁️</span>;
  if (code === 45 || code === 48) return <span>🌫️</span>;
  if (code >= 51 && code <= 55) return <span>🌦️</span>;
  if (code >= 61 && code <= 65) return <span>🌧️</span>;
  if (code >= 71 && code <= 75) return <span>❄️</span>;
  if (code >= 80 && code <= 82) return <span>🌦️</span>;
  if (code >= 95) return <span>⛈️</span>;
  return <span>🌡️</span>;
}

interface WeatherWidgetProps {
  weather: WeatherData | null;
  error?: string;
}

export default function WeatherWidget({ weather, error }: WeatherWidgetProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] text-center"
      >
        <span className="text-4xl mb-3">⚠️</span>
        <p className="text-white/60 text-sm">{error}</p>
      </motion.div>
    );
  }

  if (!weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-2xl p-6 min-h-[200px] flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-blue-400/40 border-t-blue-400 rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Fetching weather…</p>
        </div>
      </motion.div>
    );
  }

  const statItems = [
    { label: "Feels Like", value: `${weather.feelsLike}°C` },
    { label: "Humidity", value: `${weather.humidity}%` },
    { label: "Wind", value: `${weather.windSpeed} km/h` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative glass-card rounded-2xl overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 opacity-20 ${
          weather.isDay
            ? "bg-gradient-to-br from-yellow-300 via-orange-300 to-blue-400"
            : "bg-gradient-to-br from-indigo-800 via-blue-900 to-slate-900"
        }`}
      />

      <div className="relative p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-sm font-medium uppercase tracking-widest"
            >
              Current Weather
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mt-1"
            >
              {weather.city}, {weather.country}
            </motion.h2>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="text-5xl"
          >
            <WeatherIcon code={weather.weatherCode} isDay={weather.isDay} />
          </motion.div>
        </div>

        {/* Temperature display */}
        <div className="flex items-end gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="text-7xl font-thin text-white leading-none">
              {weather.temperature}°
            </span>
          </motion.div>
          <div className="pb-2">
            <p className="text-white/80 font-medium">{weather.weatherDescription}</p>
            <p className="text-white/50 text-sm">
              H: {weather.high}° / L: {weather.low}°
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {statItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white/5 rounded-xl p-3 text-center"
            >
              <p className="text-white/40 text-xs mb-1">{item.label}</p>
              <p className="text-white font-semibold text-sm">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
