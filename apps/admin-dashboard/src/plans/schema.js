import { z } from "zod";

export const createPlanSchema = z.object({
  type: z.string().min(1, "Plan type is required"),
  amount: z.number().positive("amount must be greater than 0"),
  features: z.string().min(1, "features is required" ),
  target: z.string().min(1, "Target is required")
});

export const updatePlanSchema = createPlanSchema
.partial()
.refine((obj)=>Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
});