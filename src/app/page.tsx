import { fetchWeather } from "@/app/lib/weather";
import { fetchNews } from "@/app/lib/news";
import { WeatherData } from "@/app/lib/types";
import { NewsArticle } from "@/app/lib/types";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import StatsBar from "@/app/components/StatsBar";
import WeatherWidget from "@/app/components/WeatherWidget";
import NewsGrid from "@/app/components/NewsGrid";

export const revalidate = 300; // ISR: refresh every 5 minutes

async function getData(): Promise<{
  weather: WeatherData | null;
  weatherError?: string;
  articles: NewsArticle[];
  newsError?: string;
}> {
  const [weatherResult, newsResult] = await Promise.allSettled([
    fetchWeather(),
    fetchNews(),
  ]);

  return {
    weather: weatherResult.status === "fulfilled" ? weatherResult.value : null,
    weatherError:
      weatherResult.status === "rejected"
        ? "Unable to load weather data. Please try again later."
        : undefined,
    articles: newsResult.status === "fulfilled" ? newsResult.value : [],
    newsError:
      newsResult.status === "rejected"
        ? "Unable to load news articles. Please try again later."
        : undefined,
  };
}

export default async function DashboardPage() {
  const { weather, weatherError, articles, newsError } = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick stats */}
        <StatsBar />

        {/* Main layout: weather sidebar + news grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 items-start">
          {/* Weather column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">Weather</h2>
            </div>
            <WeatherWidget weather={weather} error={weatherError} />
          </div>

          {/* News column */}
          <NewsGrid articles={articles} error={newsError} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
