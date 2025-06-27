import { error } from "../../../src/common/errorHandler";
import { repos } from "../../../src/common/repos";
import { schemaBodyParser } from "../../../src/common/schemaParse";
import { createPlanSchema } from "../../../src/plans/schema";
import { NextResponse } from "next/server";

export async function POST (request){
  try {
    const dto = await schemaBodyParser(request, createPlanSchema)
  
    const data = await repos.plan.create(dto)

    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "error creating plan")
  }
}

export async function GET(){
  try {
    const data = await repos.plan.findAll()
    return NextResponse.json({data}, {status:201})
    
  } catch (err) {
    return error.handleServerError(err, "fetching plans")
  }
}