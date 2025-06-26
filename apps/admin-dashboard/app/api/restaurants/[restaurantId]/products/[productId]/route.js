import { NextResponse } from "next/server";
import * as service from "../../../../../../src/restaurants/service"

export async function GET(__, {params}){
  try {
    const {productId} = await params;
    if(!productId){
      return NextResponse.json({error: "product ID is required"},{status: 400})
    }

    const product = await service.getRestaurantProductById(productId)
    if(!productId){
      return NextResponse.json({error: "product not found"},{status: 404})
    }

    return NextResponse.json({product}, {status: 201})
    
  } catch (error) {
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500})
    
  }
  
}