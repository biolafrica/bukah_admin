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

export async function createRestaurantRow (data){
  try {
    const slug = await createUniqueSlug(data.name)
    return await repos.restaurants.create({...data, slug})
    
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

    const { data: user, error: userError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      app_metadata: {role: "owner"}
    })


    if(userError) throw new Error(`Error creating auth user:, ${userError.message}`)

    return user
    
  } catch (error) {
    throw new Error(`error creating user:", ${error.message}`)
  }

}