import { NextResponse } from "next/server";
import * as service from "../../../src/restaurants/service"

export async function GET(request){
  try {
    const url = new URL(request.url)
    const raw = Object.fromEntries(url.searchParams.entries())
    const {searchTerm, range} = raw;

    const data = await service.getRestaurants({searchTerm,range})

    return NextResponse.json({data}, {status:201})
    
  } catch (error) {
    return NextResponse.json({error: error.message || "Internal Server Error"}, {status: 500})
    
  }
  
}