import {getRestaurantCustomerById} from "../../../../../../src/restaurants/service";
import { makeGetByIdHandler } from "../../../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getRestaurantCustomerById,
  "customerId",
  "fetching restaurant customer"
)