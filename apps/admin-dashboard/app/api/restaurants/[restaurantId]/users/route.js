import { getRestaurantUsers } from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";

export const GET = makeGetListHandler(
  getRestaurantUsers,
  "fetching restaurants users"
)