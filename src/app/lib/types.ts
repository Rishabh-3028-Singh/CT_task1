export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  high: number;
  low: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  body: string;
  userId: number;
  category: string;
  readTime: number;
}
