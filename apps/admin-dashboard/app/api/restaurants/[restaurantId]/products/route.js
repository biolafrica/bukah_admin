import { NextResponse } from "next/server";
import * as service from "../../../../../src/restaurants/service"
import { error } from "../../../../../src/common/errorHandler";
import { schemaUrlParser } from "../../../../../src/common/schemaParse";

export async function GET(request, {params}){
  try {
    const {restaurantId} = await params;
    if(!restaurantId){
      return NextResponse.json({error: "restaurant ID is required"},{status : 400})
    }

    const raw = schemaUrlParser(request)
    const {searchTerm, categoryId, branchId} = raw;
  
    const data = await service.getRestaurantProducts(restaurantId,{searchTerm, categoryId, branchId})
    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurants products")
  }
  
}