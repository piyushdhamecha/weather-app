import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY
    const lat = 40.7128
    const lon = -74.006

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const response = await axios.get(url)

    return NextResponse.json(response.data)
  } catch (error) {
    console.log('Error fetching fiveday data')

    return new Response('Error fetching fiveday data', {
      status: 500
    })
  }
}