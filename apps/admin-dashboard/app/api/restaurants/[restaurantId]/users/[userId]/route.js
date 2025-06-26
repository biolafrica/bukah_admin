import { error } from "../../../../../../src/common/errorHandler";
import { getRestaurantUserById } from "../../../../../../src/restaurants/service";
import { NextResponse } from "next/server";

export async function GET(__, {params}){
  try {
    const {userId} = await params;
    if(!userId){
      return NextResponse.json({error: "user ID is required"}, {status: 400})
    }

    const user = await getRestaurantUserById(userId)
    if(!userId){
      return NextResponse.json({error: "user not found"},{status: 404})
    }

    return NextResponse.json({user}, {status: 201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurant user")
    
  }
  
}