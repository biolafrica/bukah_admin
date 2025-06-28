import {getRestaurantCustomers} from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";
import { querySchema } from "../../../../../src/restaurants/schema";


export const GET = makeGetListHandler(
  getRestaurantCustomers,
  "fetching restaurants customers",
  querySchema.getCustomers
)