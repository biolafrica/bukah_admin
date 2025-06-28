import {getRestaurants} from "../../../src/restaurants/service"
import { makeUnfilteredGetListHandler } from "../../../src/common/routeHelpers";

export const GET = makeUnfilteredGetListHandler(
  getRestaurants,
  "fetching restaurants"
)