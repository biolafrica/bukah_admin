import * as service from "../../../src/restaurants/service"
import { makeUnfilteredGetListHandler } from "../../../src/common/routeHelpers";
import {createRestaurant, querySchema } from "../../../src/restaurants/schema";
import { NextResponse } from "next/server";
import * as tenant from "../../../src/restaurants/tenantService";
import { schemaBodyParser } from "../../../src/common/schemaParse";



export const GET = makeUnfilteredGetListHandler(
  service.getRestaurants,
  "fetching restaurants",
  querySchema.getRestaurants
  
)

export async function POST(request){

  try {
    const dto = await schemaBodyParser(request, createRestaurant)

    const id = await tenant.createUserRow(dto.email)

    const restaurant = await tenant.createRestaurantRow(dto, id)

    await tenant.updateAuthUser(id, restaurant)

    await service.addRestaurantSettings({
      restaurant_id : restaurant,
      name: dto.name,
      email: dto.email,
      phone : dto.phone,
      address: dto.address,
      customer_notifications : tenant.defaultCustomerNotifications(),
      staff_notifications : tenant.defaultStaffNotifications()
    })

    await service.addRestaurantOwner({
      id,
      restaurant_id : restaurant,
      first_name : dto.first_name,
      last_name : dto.last_name,
      phone_number : dto.phone,
      email: dto.email,
      role : "owner",
      is_active: true
    })

    return NextResponse.json({restaurant},{status: 200})

  } catch (error) {
   
    console.error("Error in superadmin create restaurant:", error.message)
    return NextResponse.json({error: error.message || 'Internal Server Error'},{status: 500})
    
  }
}