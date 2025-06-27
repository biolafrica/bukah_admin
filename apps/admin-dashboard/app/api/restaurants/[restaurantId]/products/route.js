import { makeGetListHandler } from "../../../../../src/common/routeHelpers";
import { getRestaurantProducts } from "../../../../../src/restaurants/service";

export const GET = makeGetListHandler(
  getRestaurantProducts,
  "fetching restaurants products"
)