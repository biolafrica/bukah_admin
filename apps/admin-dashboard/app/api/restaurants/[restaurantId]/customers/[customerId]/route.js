import { NextResponse } from "next/server";
import {getRestaurantCustomerById} from "../../../../../../src/restaurants/service";
import { error } from "../../../../../../src/common/errorHandler";

export async function GET(__, {params}){
  try {
    const {customerId} = await params;
    if(!customerId){
      return NextResponse.json({error: "customer ID is required"},{status: 400})
    }

    const customer = await getRestaurantCustomerById(customerId)
    if(!customer){
      return NextResponse.json({error: "customer not found"},{status: 404})
    }

    return NextResponse.json({customer}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurant customer")
    
  }
  
}