import {getRestaurantCustomers} from "../../../../../src/restaurants/service";
import { makeGetListHandler } from "../../../../../src/common/routeHelpers";

export const GET = makeGetListHandler(
  getRestaurantCustomers,
  "fetching restaurants customers"
)