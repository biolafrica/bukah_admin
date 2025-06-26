import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const error = {

  handleServerError(err, context) {
    console.error(`Unexpected error ${context}:`, err.message || err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  },

  handleServerErrorWithZod(err, context) {
    if (err instanceof ZodError) {
      console.error(`Validation error ${context}:`, err.errors)
      return NextResponse.json(
        { error: err.message || "Internal Server Error"},
        { status: 400 }
      )
    }

    return this.handleServerError(err, context)
  }

}




