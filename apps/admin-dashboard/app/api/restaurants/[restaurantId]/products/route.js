import { NextResponse } from "next/server";
import * as service from "../../../../../src/restaurants/service"
import { error } from "@/apps/admin-dashboard/src/common/errorHandler";

export async function GET(__, {params}){
  try {
    const {restaurantId} = await params;
    if(!restaurantId){
      return NextResponse.json({error: "restaurant ID is required"},{status : 400})
    }

    const data = await service.getRestaurantProducts(restaurantId)

    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurants products")
  }
  
}