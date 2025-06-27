import {getRestaurantBranchById,} from "../../../../../../src/restaurants/service";
import { makeGetByIdHandler } from "../../../../../../src/common/routeHelpers";

export const GET = makeGetByIdHandler(
  getRestaurantBranchById,
  "branchId",
  "fetching restaurant branch"
)