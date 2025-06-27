import { makeGetByIdHandler } from "../../../../src/common/routeHelpers";
import { getRestaurantById } from "../../../../src/restaurants/service";

export const GET = makeGetByIdHandler(
  getRestaurantById,
  "restaurantId",
  "fetching restaurant"
)
