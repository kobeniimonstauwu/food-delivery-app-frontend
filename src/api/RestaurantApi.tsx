import { SearchState } from "@/pages/SearchPage"
import { Restaurant, RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// restaurantId is made optional since you won't be able to get it on first render, and will be grabbed by useParams
// There's also a chance that restaurantId will be undefined
export const useGetRestaurant = (restaurantId? : string) =>{
  const getRestaurantByIdRequest = async(): Promise<Restaurant> =>{
    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`)

    if(!response.ok){
      throw new Error("Failed to get restaurant")
    }
  
  return response.json()
  
  }

  // the query will only be enabled if there if the api receives a restaurantId parameter, so there won't be any errors that will trigger and API requests
  // won't be wasted since there's also a chance that the useParams at first render won't give the restaurantId a value
  const { data: restaurant, isLoading } = useQuery("fetchRestaurant", getRestaurantByIdRequest, {enabled: !!restaurantId})

  return { restaurant, isLoading }
}
// city is optional since hooks loading for the first time will return undefined, which will be solved later on as we handle it
export const useSearchRestaurants = (searchState: SearchState, city? : string) => {
  const createSearchRequest = async(): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams()
    params.set("searchQuery", searchState.searchQuery)
    params.set("page", searchState.page.toString())
    // convert the array to a comma separated string
    params.set("selectedCuisines", searchState.selectedCuisines.join())
    params.set("sortOption", searchState.sortOption)
    // Question mark in the url indicates the start of the query parameters, which will be read by the backend, and searchQuery will be read
    const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`, {

      
    })
    
    if(!response.ok){
      throw new Error("Failed to get restaurant")
    }
    return response.json()
  }
  // The query would only run if the city is ready to load, this is to avoid errors within the query just like how the hook renders or is used for the first time, you'll
  // need to wait for it first to grab the data
  // the query can be done again whenever the searchState is updated or existent
  const { data: results, isLoading } = useQuery(
    // The query can be done again when the searchState changes, that's why it's there in the array
    // Basically it allows the query to be ran again and show results based on the query
    ["searchRestaurants", searchState], createSearchRequest, { enabled: !!city })

  return {
    results, isLoading
  }
}