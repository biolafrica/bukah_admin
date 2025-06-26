import { NextResponse } from "next/server";
import {getRestaurantProductById} from "../../../../../../src/restaurants/service";
import { error } from "../../../../../../src/common/errorHandler";

export async function GET(__, {params}){
  try {
    const {productId} = await params;
    if(!productId){
      return NextResponse.json({error: "product ID is required"},{status: 400})
    }

    const product = await getRestaurantProductById(productId)
    if(!product){
      return NextResponse.json({error: "product not found"},{status: 404})
    }

    return NextResponse.json({product}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurant product")
    
  }
  
}