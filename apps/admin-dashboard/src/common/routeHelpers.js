import { NextResponse } from "next/server"
import { error } from "./errorHandler"
import { schemaUrlParser } from "./schemaParse"

export function makeGetListHandler(fetcher, contextMessage, schema) {
  return async function GET(request, { params }) {
    const { restaurantId } = await params
    if (!restaurantId) {
      return NextResponse.json(
        { error: 'restaurant ID is required' },
        { status: 400 }
      )
    }

    try {
      const raw = schemaUrlParser(request)
      const dto = schema.parse(raw)

      const data   = await fetcher(restaurantId, dto)
      return NextResponse.json({ data }, { status: 200 })
    } catch (err) {
      return error.handleServerError(err, contextMessage)
    }
  }
}


export function makeGetByIdHandler(fetcher, paramName, contextMsg) {
  return async function GET(_, { params }) {
    const ids = await params
    const id = ids[paramName]
    if (!id) {
      return NextResponse.json(
        { error: `${paramName} is required` },
        { status: 400 }
      )
    }

    try {
      const entity = await fetcher(id)
      if (!entity) {
        return NextResponse.json(
          { error: `${paramName.replace(/Id$/, '')} not found` },
          { status: 404 }
        )
      }
  
      const key = paramName.replace(/Id$/, '')
      return NextResponse.json({ [key]: entity }, { status: 200 })
    } catch (err) {
      return error.handleServerError(err, contextMsg)
    }
  }
}

export function makeUnfilteredGetListHandler(fetcher, contextMessage, schema){
  return async function GET(request) {

    try {
      const raw = schemaUrlParser(request)
      const dto = schema.parse(raw)
      
      const data   = await fetcher(dto)
      return NextResponse.json({ data }, { status: 200 })
    } catch (err) {
      return error.handleServerError(err, contextMessage)
    }

  }

}