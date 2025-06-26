import { NextResponse } from "next/server";
import * as service from "../../../../../src/restaurants/service"

export async function GET(__, {params}){
  try {
    const {restaurantId} = await params;
    if(!restaurantId){
      return NextResponse.json({error: "restaurant ID is required"},{status : 400})
    }

    const data = await service.getRestaurantProducts(restaurantId)

    return NextResponse.json({data}, {status:201})
    
  } catch (error) {
    return NextResponse.json({error: error.message || "Internal Server Error"}, {status: 500})
    
  }
  
}