import { schemaUrlParser } from "../../../../../src/common/schemaParse";
import { error,} from "../../../../../src/common/errorHandler";
import { getRestaurantUsers } from "../../../../../src/restaurants/service";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
  try {
    const {restaurantId} = await params;
    if(!restaurantId){
      return NextResponse.json({error: "restaurant ID is required"},{status : 400})
    }

    const raw = schemaUrlParser(request)
    const {searchTerm, isActive, branchId, role} = raw;

    const data = await getRestaurantUsers(restaurantId, {searchTerm, isActive, branchId, role})

    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurants users")
  }
  
}