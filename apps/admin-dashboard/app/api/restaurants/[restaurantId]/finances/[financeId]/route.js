import { NextResponse } from "next/server";
import {getRestaurantTransactionById} from "../../../../../../src/restaurants/service";
import { error } from "../../../../../../src/common/errorHandler";

export async function GET(__, {params}){
  try {
    const {financeId} = await params;
    if(!financeId){
      return NextResponse.json({error: "finance ID is required"},{status: 400})
    }

    const transaction = await getRestaurantTransactionById(financeId)
    if(!transaction){
      return NextResponse.json({error: "transaction not found"},{status: 404})
    }

    return NextResponse.json({transaction}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurant transaction")
    
  }
  
}