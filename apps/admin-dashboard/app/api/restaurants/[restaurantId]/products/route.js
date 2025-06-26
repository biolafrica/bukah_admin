import { NextResponse } from "next/server";
import * as service from "../../../../../src/restaurants/service"
import { error } from "../../../../../src/common/errorHandler";

export async function GET(request, {params}){
  try {
    const {restaurantId} = await params;
    if(!restaurantId){
      return NextResponse.json({error: "restaurant ID is required"},{status : 400})
    }

    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const {searchTerm, categoryId, branchId} = raw;
    console.log(searchTerm)

    const data = await service.getRestaurantProducts(restaurantId,{searchTerm, categoryId, branchId})

    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurants products")
  }
  
}