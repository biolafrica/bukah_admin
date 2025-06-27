import { schemaBodyParser } from "../../../../src/common/schemaParse";
import { error } from "../../../../src/common/errorHandler";
import { repos } from "../../../../src/common/repos";
import { updatePlanSchema } from "../../../../src/plans/schema";
import { NextResponse } from "next/server";


export async function GET(__, {params}){
  try {
    const {planId} = await params;
    if(!planId)return NextResponse.json({error : 'plan ID is required'}, {status : 400})

    const plan = await repos.plan.findById(planId)
    if(!plan)return NextResponse.json({error : "plan not found"}, {status : 404})

    return NextResponse.json({plan},{status : 201})

  } catch (err) {
    return error.handleServerError(err, "fetching plan")
  }

}


export async function PUT (request, {params}){
  try {
    const {planId} = await params;
    if(!planId)return NextResponse.json({error : 'plan ID is required'}, {status : 400})

      
    const dto = await schemaBodyParser(request, updatePlanSchema)
    const data = await repos.plan.update(planId, dto)

    return NextResponse.json({data}, {status: 201})
    
  } catch (err) {
    return error.handleServerErrorWithZod(err, "error updating plan")
  }
}
