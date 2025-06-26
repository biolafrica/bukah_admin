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

export function getRestaurantUsers(restaurantId, {
  searchTerm = "", 
  branchId = null, 
  isActive = null, 
  role= null , 
  range= [0,9]
}={}){
  const filters = {restaurant_id : restaurantId}
  if (branchId) filters.branch_id = branchId
  if (isActive !== null) filters.is_active = isActive
  if (role) filters.role = role

  const search = searchTerm ? ['first_name', "last_name", searchTerm] : [];

  const  joins = { branch: 'branches(name, id)' }

  return repos.users.findAll({filters,range, joins, search})
}

export function getRestaurantUserById(userId){

  const  joins = { branch: 'branches(name, id)' }
  return repos.users.findById(userId, joins)
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

export function getRestaurantProducts(restaurantId, {
  searchTerm = "", 
  branchId = null, 
  categoryId= null, 
  range= [0,9]
}={}){
  const filters = {restaurant_id : restaurantId};
  if(branchId)filters.branch_id = branchId;
  if(categoryId)filters.category_id = categoryId;

  const search = searchTerm ? ["name", searchTerm] :[];

  const joins = {
    branch: "branches(name)", 
    category: "product_categories(name)"
  }

  return repos.products.findAll({filters,range, joins, search})
}

export function getRestaurantProductById(productId){
  const joins = {
    branch: "branches(name)", 
    category: "product_categories(name)"
  }

  return repos.products.findById(productId, joins)
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

