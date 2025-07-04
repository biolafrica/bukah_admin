import { BaseRepo } from "../../utils/database/baseRepository";

export const repos = {
  settings : new BaseRepo("restaurant_settings"),
  users : new BaseRepo("users"),
  restaurantPlan : new BaseRepo("restaurant_plans"),
  customers : new BaseRepo("customers"),
  orders : new BaseRepo("orders"),
  branches : new BaseRepo("branches"),
  finances : new BaseRepo("transactions"),
  products : new BaseRepo("products"),
  restaurants : new BaseRepo("restaurants"),
  plan : new BaseRepo("plans"),
  bill : new BaseRepo("billing_histories"),
  pos : new BaseRepo("pos_devices"),
  terminal : new BaseRepo("terminals"),
  table : new BaseRepo("tables"),
  notification : new BaseRepo("notification_settings"),
  gateway : new BaseRepo("payment_gateway"),

}