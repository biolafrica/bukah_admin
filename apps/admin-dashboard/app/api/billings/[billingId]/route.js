import { getBillingById } from "../../../../src/billings/service";
import { makeGetByIdHandler } from "../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getBillingById,
  "billingId",
  "fetching billing details"
)