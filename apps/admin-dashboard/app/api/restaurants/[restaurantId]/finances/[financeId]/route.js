import {getRestaurantTransactionById} from "../../../../../../src/restaurants/service";
import { makeGetByIdHandler } from "../../../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getRestaurantTransactionById,
  "financeId",
  "fetching restaurant transaction"
)