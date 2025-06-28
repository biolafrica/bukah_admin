import { repos } from "../common/repos";

export function getBillings({
  restaurantId = null, 
  dateRange= null, 
  status=null, 
  searchTerm =null, 
  range= [0,9]
}={}){
  const filters = {};

  if(restaurantId)filters.restaurant_id = restaurantId;
  if(status)filters.status = status;
  if (dateRange) {
    filters.created_at = { start: dateRange.start, end: dateRange.end }
  }

  const search = searchTerm ? ['bill_number', searchTerm] : [];

  const joins ={
    restaurant: 'restaurants(name)',
    plan: 'plans(type)',
  }

  return repos.bill.findAll({filters,search,joins,range})
}


export function getBillingById(billingId){

  const joins ={
    restaurant: 'restaurants(name)',
    plan: 'plans(type)',
  }

  return repos.bill.findById(billingId, joins)
}