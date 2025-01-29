import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()
  // Doesn't need any parameters since it will just get the data based on the token (userID)
  const getMyRestaurantRequest = async(): Promise<Restaurant> =>{
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }

    })
    if(!response.ok){
      throw new Error("Failed to get restaurant")
    }
    
    // we get the result from the backend
    return response.json()

  }
// fetchMyRestaurant is the name of the query
  const{ data: restaurant, isLoading} = useQuery("fetchMyRestaurant", getMyRestaurantRequest)

  return { restaurant, isLoading }
}

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async(restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        
        Authorization: `Bearer ${accessToken}`,
        // Gets checked through the jwtCheck

      },
      body: restaurantFormData,
    })

    if(!response.ok){
      throw new Error("Failed to create restaurant")

    }
    
    return response.json()
    // Returning to components can use it in the frontend
  }

  const { mutate: createRestaurant, isLoading, isSuccess, error} = useMutation(createMyRestaurantRequest)

  if(isSuccess){
    toast.success("Restaurant created")
  }
  if(error){
    toast.error("Unable to create restaurant")
   
  }

  return { createRestaurant, isLoading }
}

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0()

  const updateMyRestaurantRequest = async(restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    })
    if(!response.ok){
      throw new Error("Failed to update restaurant")
    }
    return response.json()

   
  }
  const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateMyRestaurantRequest)
  
  if(error){
    toast.error("Unable to update restaurant")
  }
  if(isSuccess){
    toast.success("Restaurant updated")
  }

  return {updateRestaurant, isLoading}

}

export const useGetMyRestaurantOrders = () =>{
  const { getAccessTokenSilently } = useAuth0()

  const getMyRestaurantOrderRequest = async():Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      method: "GET",
      headers:{
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
    if(!response.ok){
      throw new Error("Failed to fetch orders")
    }
    return response.json()
  }
  
  const {data: orders, isLoading } = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrderRequest)

  return {
    orders, isLoading
  }
 }

 type UpdateOrderStatusRequest = {
  orderId: string
  status: string
 }

 export const useUpdateOrderStatus = () => {
  const { getAccessTokenSilently } = useAuth0()
  // The parameter is a type for the orderId, and the order status
  // This is the only API where the names are different
  const updateOrderStatusRequest = async(updateStatusOrderRequest: UpdateOrderStatusRequest) =>{
    const accessToken = await getAccessTokenSilently()
    
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,{
      method: "PATCH",
      headers:{
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: updateStatusOrderRequest.status})

    })
    if(!response.ok){
      throw new Error("Failed to update order status")
    }

    return response.json()
  }
  const {mutateAsync: updateOrderStatus, isLoading, isError, isSuccess, reset } = useMutation(updateOrderStatusRequest)

  if(isSuccess){
    toast.success("Order updated")
  }
  if(isError){
    toast.success("Unable to update order")
    // Avoid error messages when page is automatically re-rendered
    reset()
  }
  return {
    updateOrderStatus, isLoading
  }

 
 }

