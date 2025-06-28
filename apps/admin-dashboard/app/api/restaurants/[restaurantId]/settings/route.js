import { NextResponse } from "next/server"
import { error } from "../../../../../src/common/errorHandler"
import { getRestaurantSetings } from "../../../../../src/restaurants/service"

export async function GET(__, { params }) {
  try {
    const { restaurantId } = await params
    if (!restaurantId)return NextResponse.json({ error: 'restaurant ID is required' },{ status: 400 })
    
    const data = await getRestaurantSetings(restaurantId)
    return NextResponse.json({ data }, { status: 200 })

  } catch (err) {
    return error.handleServerError(err, "error fetching restaurant settings")
  }
}