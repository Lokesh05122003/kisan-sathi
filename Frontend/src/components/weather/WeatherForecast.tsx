import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, CloudDrizzle, CloudSnow } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_KEY = '0e071acd49c94353a7660044251904';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('Delhi');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`);
      const data = await res.json();

      const formatted = data.forecast.forecastday.map((day, idx) => ({
        date: day.date,
        day: idx === 0 ? 'Today' : idx === 1 ? 'Tomorrow' : day.date,
        temp: day.day.avgtemp_c,
        tempMin: day.day.mintemp_c,
        tempMax: day.day.maxtemp_c,
        humidity: day.day.avghumidity,
        windSpeed: day.day.maxwind_kph,
        condition: day.day.condition.text,
        icon: getIcon(day.day.condition.text),
        advice: getAdvice(day.day.condition.text, day.day.avgtemp_c)
      }));

      setWeatherData(formatted);
    } catch (err) {
      console.error('Weather API error:', err);
    }
  };

  const getIcon = (condition) => {
    const lc = condition.toLowerCase();
    if (lc.includes('clear')) return <Sun className="h-10 w-10 text-yellow-500" />;
    if (lc.includes('cloud')) return <Cloud className="h-10 w-10 text-gray-500" />;
    if (lc.includes('rain')) return <CloudRain className="h-10 w-10 text-blue-500" />;
    if (lc.includes('drizzle')) return <CloudDrizzle className="h-10 w-10 text-blue-400" />;
    if (lc.includes('snow')) return <CloudSnow className="h-10 w-10 text-cyan-300" />;
    return <Thermometer className="h-10 w-10 text-orange-500" />;
  };

  const getAdvice = (condition, temp) => {
    if (condition.toLowerCase().includes('rain')) return "Rain expected. Consider covering crops or delaying harvest.";
    if (temp > 30) return "High temperatures. Ensure crops are well hydrated.";
    return "Weather is suitable for most farming activities.";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" className="w-64" />
        <Button onClick={fetchWeather}>Get Forecast</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherData.map((day, index) => (
          <Card key={index} className="bg-white shadow-xl rounded-xl p-4">
            <CardHeader className="flex flex-col items-center">
              <CardTitle>{day.day}</CardTitle>
              <CardDescription>{day.date}</CardDescription>
              <div className="my-2">{day.icon}</div>
            </CardHeader>
            <CardContent className="space-y-1">
              <p><strong>Temp:</strong> {day.temp}°C</p>
              <p><strong>Min:</strong> {day.tempMin}°C / <strong>Max:</strong> {day.tempMax}°C</p>
              <p><Droplets className="inline h-4 w-4 mr-1" />Humidity: {day.humidity}%</p>
              <p><Wind className="inline h-4 w-4 mr-1" />Wind: {day.windSpeed} km/h</p>
              <p><strong>Advice:</strong> {day.advice}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
