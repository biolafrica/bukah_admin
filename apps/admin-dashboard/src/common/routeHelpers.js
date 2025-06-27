import { NextResponse } from "next/server"
import { error } from "./errorHandler"
import { schemaUrlParser } from "./schemaParse"

export function makeGetListHandler(fetcher, contextMessage) {
  return async function GET(request, { params }) {
    const { restaurantId } = params
    if (!restaurantId) {
      return NextResponse.json(
        { error: 'restaurant ID is required' },
        { status: 400 }
      )
    }

    try {
      const parsed = schemaUrlParser(request)
      const data   = await fetcher(restaurantId, parsed)
      return NextResponse.json({ data }, { status: 200 })
    } catch (err) {
      return error.handleServerError(err, contextMessage)
    }
  }
}

export function makeGetByIdHandler(fetcher, paramName, contextMsg) {
  return async function GET(_, { params }) {
    const id = params[paramName]
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
      // drop the 'Id' suffix to name the JSON key
      const key = paramName.replace(/Id$/, '')
      return NextResponse.json({ [key]: entity }, { status: 200 })
    } catch (err) {
      return error.handleServerError(err, contextMsg)
    }
  }
}