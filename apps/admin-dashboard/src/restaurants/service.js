import { repos } from "../common/repos";


export function addRestaurantSettings(payload){
  return repos.settings.create(payload)
};

export function getRestaurantSetings(filters={restaurant_id :restaurantId}){
  return repos.settings.findAll({filters})
}

export function addRestaurantOwner(payload){
  return repos.users.create(payload)
}

export function getRestaurantUsers({filters = {restaurant_id :restaurantId}, count = true, range= [0,9]}){
  return repos.users.findAll({filters, count, range})
}

export function getRestaurantUserById(userId){
  return repos.users.findById(userId)
}

export function addRestaurant(payload){
  return repos.restaurants.create(payload)
}

export function getRestaurants({searchTerm = "", range=[0,9]}){
  const search = searchTerm ? ["name", searchTerm] :[];
  return repos.restaurants.findAll({search, range})
}

export function addRestaurantPlan(payload){
  return repos.plan.create(payload)
}

export function fetchRestaurantPlan(filters={restaurant_id :restaurantId}){
  return repos.plan.findAll({filters})
}

export function getRestaurantOrders({filters = {restaurant_id :restaurantId}, count = true, range= [0,9]}){
  return repos.orders.findAll({filters,count, range})
}

export function getRestaurantOrderById(orderId){
  return repos.orders.findById(orderId)
}

export function getRestaurantProducts(restaurantId, {count = true, range= [0,9]}={}){
  const filters = {restaurant_id : restaurantId}
  return repos.products.findAll({filters, count, range})
}

export function getRestaurantProductById(productId){
  return repos.products.findById(productId)
}

export function getRestaurantBranches({filters = {restaurant_id :restaurantId}, count = true, range= [0,9]}){
  return repos.branches.findAll({filters,count, range })
}

export function getRestaurantBranchById(branchId){
  return repos.branches.findById(branchId)
}

export function getRestaurantCustomers({filters = {restaurant_id :restaurantId}, count = true, range= [0,9]}){
  return repos.customers.findAll({filters, count, range})
}

export function getRestaurantCustomerById(customerId){
  return repos.customers.findById(customerId)
}

export function getRestaurantTransactions({filters = {restaurant_id :restaurantId}, count = true, range= [0,9]}){
  return repos.finances.findAll({filters,count,range})
}

export function getRestaurantTransactionById(transactionId){
  return repos.finances.findById(transactionId)
}

