import { getRestaurantBranches } from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";
import { querySchema } from "../../../../../src/restaurants/schema";

export const GET = makeGetListHandler(
  getRestaurantBranches,
  "fetching restaurants branches",
  querySchema.getBranches


)