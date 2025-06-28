import { getRestaurantUsers } from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";
import { querySchema } from "../../../../../src/restaurants/schema";

export const GET = makeGetListHandler(
  getRestaurantUsers,
  "fetching restaurants users",
  querySchema.getUsers
)