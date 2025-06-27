import { getRestaurantTransactions} from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "@/apps/admin-dashboard/src/common/routeHelpers";

export const GET = makeGetListHandler(
  getRestaurantTransactions,
  "fetching restaurants transactions" 
)