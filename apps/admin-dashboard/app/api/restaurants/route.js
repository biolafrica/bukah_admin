import {getRestaurants} from "../../../src/restaurants/service"
import { makeUnfilteredGetListHandler } from "../../../src/common/routeHelpers";
import { querySchema } from "../../../src/restaurants/schema";

export const GET = makeUnfilteredGetListHandler(
  getRestaurants,
  "fetching restaurants",
  querySchema.getRestaurants
  
)