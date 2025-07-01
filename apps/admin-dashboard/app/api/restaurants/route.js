import {getRestaurants} from "../../../src/restaurants/service"
import { makeUnfilteredGetListHandler } from "../../../src/common/routeHelpers";
import { createRestaurant, querySchema } from "../../../src/restaurants/schema";
import { createSupabaseServer } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";
import { schemaBodyParser } from "../../../src/common/schemaParse";



export const GET = makeUnfilteredGetListHandler(
  getRestaurants,
  "fetching restaurants",
  querySchema.getRestaurants
  
)

export async function POST(request){
  try {
    const dto = await schemaBodyParser(request, createRestaurant)
    const supabase = await createSupabaseServer();

    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email: dto.email,
      email_confirm: true,
      app_metadata: {role: "owner"}
    })

    if(userError){
      console.error("Error creating auth user:", userError)
      return NextResponse.json({error: "Auth user creation failed"}, {status:500})
    }

    return NextResponse.json({message: 'email sent successfully'},{status: 200})

    
  } catch (error) {
    console.error("Error in superadmin create restaurant:", error.message)
    return NextResponse.json({error: "Internal server error"},{status: 500})
    
  }
}