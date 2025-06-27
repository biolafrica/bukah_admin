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
  const  joins = { branch: 'branches(name, id)'}

  return repos.users.findById(userId, joins)
}

export function addRestaurant(payload){
  return repos.restaurants.create(payload)
}

export function getRestaurants({searchTerm = "", range=[0,9]}){
  const search = searchTerm ? ["name", searchTerm] :[];

  return repos.restaurants.findAll({search, range})
}

export function getRestaurantById(restaurantId){
  return repos.restaurants.findById(restaurantId)

}



export function addRestaurantPlan(payload){
  return repos.plan.create(payload)
}

export function fetchRestaurantPlan(filters={restaurant_id :restaurantId}){
  return repos.plan.findAll({filters})
}

export function getRestaurantOrders(restaurantId,{
  searchTerm = "",
  branchId = null,
  status = null,
  channel= null,
  dateRange = null,
  range =[0,9]
}){
  const filters = {restaurant_id : restaurantId};
  
  if (branchId) filters.branch_id = branchId
  if (status) filters.status = status
  if (channel) filters.order_channel = channel
  if (dateRange) {
    filters.placed_at = { start: dateRange.start, end: dateRange.end }
  }

  const joins ={
    branch: 'branches(name)',
    customer: 'customers(name)',
    accepted_by: 'users(first_name)',
  }

  const search = searchTerm ? ['order_code', searchTerm] : [];

  return repos.orders.findAll({filters,range, joins, search})
}




export function getRestaurantOrderById(orderId){
  const joins = {
    branch: 'branches(name)',
    customer: 'customers(name)',
    accepted_by: 'users(first_name)',
  }

  return repos.orders.findById(orderId, joins)
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

export function getRestaurantBranches(restaurantId, {
  searchTerm = "",
  range = [0, 9]
}){
  const filters = {restaurant_id : restaurantId};

  const search = searchTerm ? ['name', searchTerm] : [];
  const joins = { branch: 'users(first_name,last_name, id)'}

  return repos.branches.findAll({filters,search,range, joins })
}

export function getRestaurantBranchById(branchId){
  const joins = { branch: 'users(first_name,last_name, id)'}
  
  return repos.branches.findById(branchId, joins)
}

export function getRestaurantCustomers(restaurantId,{searchTerm = '', 
  type = null, 
  dateRange = null, 
  range = [0, 9]
}){
  const filters = {restaurant_id : restaurantId};

  if (type === 'registered') filters.is_registered = true
  if (type === 'guest') filters.is_registered = false
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  const search = searchTerm ? ['name', searchTerm] : [];

  return repos.customers.findAll({filters, search, range})
}

export function getRestaurantCustomerById(customerId){
  return repos.customers.findById(customerId)
}

export function getRestaurantTransactions(restaurantId, {
  searchId = "", 
  branchId = null, 
  type= null,
  dateRange= null,
  method = null, 
  range= [0,9]}){
  const filters = {restaurant_id : restaurantId};

  if (branchId) filters.branch_id = branchId
  if (type) filters.transaction_type = type
  if (method) filters.payment_method = method
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  const joins ={
    branch: 'branches(name)',
    order: 'orders(id)',
  }

  const search = searchId ? ['reference_id', searchId] : [];
  
  return repos.finances.findAll({filters,range, search, joins})
}

export function getRestaurantTransactionById(transactionId){
  const joins = {
    branch: 'branches(name)',
    order: 'orders(id)',
  }
  return repos.finances.findById(transactionId, joins)
}

