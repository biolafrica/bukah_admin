import { querySchema } from "../../../../../src/restaurants/schema";
import { getRestaurantTransactions} from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";

export const GET = makeGetListHandler(
  getRestaurantTransactions,
  "fetching restaurants transactions",
  querySchema.getTransaction 
)