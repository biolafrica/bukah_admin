import { getBillingQuerySchema } from "../../../src/billings/schema"
import {getBillings } from "../../../src/billings/service"
import { makeUnfilteredGetListHandler } from "../../../src/common/routeHelpers"

export const GET = makeUnfilteredGetListHandler(
  getBillings,
  "fetching billings",
  getBillingQuerySchema
)