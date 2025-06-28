import { querySchema } from "../../../../../src/restaurants/schema";
import { getRestaurantOrders} from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";

export const GET = makeGetListHandler(
  getRestaurantOrders,
  "fetching restaurants orders",
  querySchema.getOrders 
)
