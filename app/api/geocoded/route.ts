import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY

    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get('search')


    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`

    const response = await axios.get(url)

    return NextResponse.json(response.data)
  } catch (error) {
    console.log('Error fetching geocoded data')

    return new Response('Error fetching geocode data', {
      status: 500
    })
  }
}