import { repos } from "../common/repos";
import { slugify } from "../../utils/slugify";
import { createSupabaseServer } from "../../utils/supabase/server";

export async function findRestaurantBySlug(slug){
  const {data, count} = await repos.restaurants.findAll({
    filters : {slug},
    count : false,
    range: [0,0]
  })
  return data[0] || null
}

export async function createUniqueSlug(name){
  let base = slugify(name)
  let slug = base 
  let i = 1

  while(await findRestaurantBySlug(slug)){
    slug = `${base} -${i++}`
  }

  return slug

}

export async function createRestaurantRow (data, owner_id){
  try {
    const slug = await createUniqueSlug(data.name)
    return await repos.restaurants.create({...data, slug, owner_id})
    
  } catch (error) {
    if(error.message.includes("uq_restaurants_slug")){
      data.slug = await createUniqueSlug(data.name)
      return repos.restaurants.create(data)
    }

    throw new Error(`error creating restaurant:", ${error.message}`)
  }

}

export async function createUserRow(email){
  try {
    const supabase = await createSupabaseServer();

    const { data, error: userError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      app_metadata: {role: "owner"}
    })


    if(userError) throw new Error(`Error creating auth user:, ${userError.message}`)
    console.log(data.user.id);

    return data.user.id

    
  } catch (error) {
    throw new Error(`error creating user:", ${error.message}`)
  }

}

export async function updateAuthUser(id, restaurantId){

  try {
    const supabase = await createSupabaseServer();
    const {data, error: userUpdateError} = await supabase.auth.admin.updateUserById(id, {
      app_metadata: {
        tenantId: restaurantId
      }
    })

    if(userUpdateError){
      console.error("Error updating auth user:", userUpdateError);
      throw new Error("Failed to update auth user");
    }

    return data
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("An unexpected error occurred");
    
  }

}

export function defaultCustomerNotifications(){
  return {
    order_confirmation : true,
    order_completed : true,
    payment_refund : true,
    order_cancelled : true,
    pickup_confirmation : true,
    customer_registration : true,
    reservation_confirmation : true
  }
}

export function defaultStaffNotifications(){
  return {
    account_creation : true,
    password_reset_request : true,
    password_change : true
  }
}

//connect restaurant_id to user_id