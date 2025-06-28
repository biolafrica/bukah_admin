import { querySchema } from "../../../../../src/restaurants/schema";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";
import { getRestaurantProducts } from "../../../../../src/restaurants/service";

export const GET = makeGetListHandler(
  getRestaurantProducts,
  "fetching restaurants products",
  querySchema.getProduct
)