import {getRestaurants} from "../../../src/restaurants/service"
import { makeUnfilteredGetListHandler } from "../../../src/common/routeHelpers";
import {createRestaurant, querySchema } from "../../../src/restaurants/schema";
import { NextResponse } from "next/server";
import { createRestaurantRow, createUserRow} from "../../../src/restaurants/tenantService";
import { schemaBodyParser } from "../../../src/common/schemaParse";



export const GET = makeUnfilteredGetListHandler(
  getRestaurants,
  "fetching restaurants",
  querySchema.getRestaurants
  
)

export async function POST(request){

  try {
    const dto = await schemaBodyParser(request, createRestaurant)

    await createUserRow(dto.email)
    const restaurant = await createRestaurantRow(dto)

    return NextResponse.json({restaurant},{status: 200})

  } catch (error) {
   
    console.error("Error in superadmin create restaurant:", error.message)
    return NextResponse.json({error: error.message || 'Internal Server Error'},{status: 500})
    
  }
}