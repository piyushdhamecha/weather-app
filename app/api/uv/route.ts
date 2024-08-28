import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const lat = 40.7128
    const lon = -74.006

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`

    const response = await axios.get(url)

    return NextResponse.json(response.data)
  } catch (error) {
    console.log('Error fetching uv data')

    return new Response('Error fetching uv data', {
      status: 500
    })
  }
}