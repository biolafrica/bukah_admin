import { getRestaurantUserById } from "../../../../../../src/restaurants/service";
import { makeGetByIdHandler } from "../../../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getRestaurantUserById,
  "userId",
  "fetching restaurant user"
)