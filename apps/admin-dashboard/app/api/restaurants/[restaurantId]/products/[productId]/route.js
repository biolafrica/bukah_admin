import {getRestaurantProductById} from "../../../../../../src/restaurants/service";
import { makeGetByIdHandler } from "../../../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getRestaurantProductById,
  "productId",
  "fetching restaurant product"
)