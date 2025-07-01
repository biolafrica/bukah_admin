import { z } from "zod";
import { makeQuerySchema } from "../common/queryBuilder";
import { fields } from "../common/queryFields";

export const createSocialLinks = z.object({
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  titktok: z.string().url().optional()
})
.partial();


export const createBusinessHour = z.object({
  day: z.enum(["mon","tue","wed","thu","fri","sat","sun"]),
  start: z.string().regex(/^[0-2]\d:[0-5]\d$/, "Invalid start time, expected HH.MM"),
  end: z.string().regex(/^[0-2]\d:[0-5]\d$/, "Invalid end time, expected HH.MM"),
  is_active: z.boolean(), 
})

export const createCustomerNotifications = z.object({
  order_confirmation : z.boolean().optional(),
  order_completed : z.boolean().optional(),
  payment_refund : z.boolean().optional(),
  order_cancelled : z.boolean().optional(),
  pickup_confirmation : z.boolean().optional(),
  customer_registration : z.boolean().optional(),
  reservation_confirmation : z.boolean().optional()

}).partial()

export const createStaffNotifications = z.object({
  account_creation : z.boolean().optional(),
  password_reset_request: z.boolean().optional(),
  password_change: z.boolean().optional()

}).partial()

export const createRestaurant = z.object({
  //restaurant_id: z.string().uuid("Invalid Restaurant uuid"),
  name: z.string().min(1,"Name is required"),
  address: z.string().min(1,"Address is required"),
  email: z.string().email("Invalid email"),
  phone: z
  .string()
  .length(11, "Phone must be exactly 11 digits")
  .regex(/^\d+$/, "Phone can only contain digits"),

  tax_rate: z.number().min(0, "Tax rate must be >= 0").max(100, "Tax rate must be <= 0").optional(),
  service_charge: z.number().min(0, "Service charge must be >= 0").optional(),

  description: z.string().optional(),
  social_links: createSocialLinks.optional(),
  business_hours: z.array(createBusinessHour).optional(),

  logo_url: z.string().url("Invalid logo_url").optional(),
  logo_icon_url: z.string().url("Invalid logo_icon_url").optional(),
  favicon_url: z.string().url("Invalid favicon_url").optional(),

  primary_color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid HEX color").optional(),
  secondary_color: z.string().regex(/^#([0-9A-Fa-f]{6})$/, "Invalid HEX color").optional(),

  customer_notifications:createCustomerNotifications.optional(),
  staff_notifications: createStaffNotifications.optional()

})

export const updateRestaurant = createRestaurant
.partial()
.refine(obj => Object.keys(obj).length > 0, {
  message: "At least one field must be provided"
})

export const createOwner = z.object({
  restaurant_id:   z.string().uuid("Invalid Restaurant ID"),
  first_name:   z.string().min(1, "First name is required"),
  last_name:   z.string().min(1, "Last name is required"),
  phone_number: z
  .string()
  .length(11)
  .regex(/^\d+$/, "Phone can only contain digits"),
  email:   z.string().email("Invalid email"),
  role:   z.enum(["owner"], "Invalid Role"),
  branch_id:   z.string().uuid("Invalid Restaurant ID").optional(),
  is_active:   z.boolean(),
})

export const createRestaurantPlanSchema = z.object({
  restaurant_id: z.string().uuid("Invalid Restaurant ID"),
  plan_id: z.string().uuid("Invalid Restaurant ID"),
  status: z.enum(["active","cancelled", "expired"], "Invalid Status"),
})


export const querySchema = {

  getCustomers : makeQuerySchema(
    fields.customer, {withDateRange : true}
  ),

  getUsers : makeQuerySchema(fields.user),

  getTransaction : makeQuerySchema(
    fields.transaction, {withDateRange : true}
  ),

  getProduct : makeQuerySchema(fields.product),

  getProductCategory : makeQuerySchema(fields.productCategory),

  getOrders : makeQuerySchema( 
    fields.order, {withDateRange : true}
  ),

  getBranches : makeQuerySchema(fields.branch),

  getRestaurants : makeQuerySchema(fields.restaurant)

}

