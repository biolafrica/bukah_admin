import { error, handleRestaurantIdParam } from "../../../../../src/common/errorHandler";
import { getRestaurantUsers } from "../../../../../src/restaurants/service";
import { NextResponse } from "next/server";

export async function GET(__, {params}){
  try {
    const {restaurantId} = await params;
    if(!restaurantId){
      return NextResponse.json({error: "restaurant ID is required"},{status : 400})
    }

    const data = await getRestaurantUsers(restaurantId)

    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurants users")
  }
  
}