import { getRestaurantOrderById } from "../../../../../../src/restaurants/service";
import { makeGetByIdHandler } from "../../../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getRestaurantOrderById,
  "orderId",
  "fetching restaurant order"
)