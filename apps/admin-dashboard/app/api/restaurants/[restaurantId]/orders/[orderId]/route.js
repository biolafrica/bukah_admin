import { NextResponse } from "next/server";
import { error } from "../../../../../../src/common/errorHandler";
import { getRestaurantOrderById } from "../../../../../../src/restaurants/service";

export async function GET(__, {params}){
  try {
    const {orderId} = await params;
    if(!orderId){
      return NextResponse.json({error: "order ID is required"},{status: 400})
    }

    const order = await getRestaurantOrderById(orderId)
    if(!order){
      return NextResponse.json({error: "order not found"},{status: 404})
    }

    return NextResponse.json({order}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurant order")
    
  }
  
}