import { z } from "zod"


export const fields = {
  branch : {
    searchTerm: z.string().optional().default('')
  },

  order : {
    searchTerm : z.string().optional().default(""),
    branchId : z.string().uuid().optional(),
    status : z.enum([
      "pending",
      "accepted", 
      "preparing", 
      "ready", 
      "served", 
      "cancelled", 
      "refunded"
    ]).optional(),
    channel : z.enum([
      "web", 
      "waiter", 
      "qr"
    ]).optional(),
  },

  productCategory : {
    name : z.string().optional()
  },

  product : {
    searchTerm : z.string().optional().default(""), 
    categoryId : z.string().uuid().optional(), 
    branchId :z.string().uuid().optional()
  },

  transaction : {
    searchId : z.string().optional(), 
    branchId : z.string().uuid().optional(), 
    type : z.enum(["sales", "refund", "adjustment"]).optional(), 
    method: z.enum(["cash", "transfer", "card"]).optional(), 
  },

  user : {
    searchTerm: z.string().optional().default(''),
    branchId: z.string().optional(),
    isActive: z.string().optional(),
    role: z.enum([
      'admin',
      'supervisor',
      'waiter',
      'chef',
      'bartender',
      'sales',
    ]).optional(),

  },

  customer : {
    searchTerm: z.string().optional().default(''),
    type:       z.string().optional(),
  },

  restaurant : {
    searchTerm: z.string().optional().default('')
  },

}
