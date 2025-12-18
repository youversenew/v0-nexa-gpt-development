import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get("lat") || "39.0"
  const lon = searchParams.get("lon") || "65.0"

  try {
    // Using Open-Meteo free API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`,
    )

    const data = await response.json()

    return NextResponse.json({
      temperature: data.current?.temperature_2m || 21,
      wind_speed: data.current?.wind_speed_10m || 18,
      condition: getWeatherCondition(data.current?.weather_code || 0),
      location: "Uzbekistan",
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({
      temperature: 21,
      wind_speed: 18.12,
      condition: "Partly Cloudy",
      location: "Uzbekistan, Guzar",
    })
  }
}

function getWeatherCondition(code: number): string {
  if (code === 0) return "Clear"
  if (code <= 3) return "Partly Cloudy"
  if (code <= 48) return "Foggy"
  if (code <= 67) return "Rainy"
  if (code <= 77) return "Snowy"
  if (code <= 99) return "Stormy"
  return "Unknown"
}
