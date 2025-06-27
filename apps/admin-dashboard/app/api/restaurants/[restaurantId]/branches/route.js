import { getRestaurantBranches } from "@/apps/admin-dashboard/src/restaurants/service";
import { makeGetListHandler } from "@/apps/admin-dashboard/src/common/routeHelpers";

export const GET = makeGetListHandler(
  getRestaurantBranches,
  "fetching restaurants branches" 
)