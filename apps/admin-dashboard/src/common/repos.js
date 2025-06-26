import { BaseRepo } from "../../utils/database/baseRepository";

export const repos = {
  settings : new BaseRepo("restaurant_settings"),
  users : new BaseRepo("users"),
  plan : new BaseRepo("restaurant_plans"),
  customers : new BaseRepo("customers"),
  orders : new BaseRepo("orders"),
  branches : new BaseRepo("branches"),
  finances : new BaseRepo("finances"),
  products : new BaseRepo("products"),
  restaurants : new BaseRepo("restaurants"),
}