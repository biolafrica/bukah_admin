import { z } from "zod";
import { makeQuerySchema } from "../common/queryBuilder";


const billingFields = {
  searchTerm : z.string().optional().default(""), 
  restaurantId : z.string().uuid().optional(), 
  status : z.enum(["paid", "failed", "pending"]).optional(),
}

export const getBillingQuerySchema = makeQuerySchema(
  billingFields, {withDateRange : true}
);