import { makeGetListHandler } from "@/apps/admin-dashboard/src/common/routeHelpers";
import { getRestaurantProducts } from "@/apps/admin-dashboard/src/restaurants/service";

export const GET = makeGetListHandler(
  getRestaurantProducts,
  "fetching restaurants products"
)