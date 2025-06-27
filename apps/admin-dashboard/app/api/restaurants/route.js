import { NextResponse } from "next/server";
import {getRestaurants} from "../../../src/restaurants/service"
import { error } from "../../../src/common/errorHandler";
import { schemaUrlParser } from "../../../src/common/schemaParse";

export async function GET(request){
  try {
    const raw = schemaUrlParser(request)
    const {searchTerm, range} = raw;

    const data = await getRestaurants({searchTerm,range})

    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching restaurants")
    
  }
  
}