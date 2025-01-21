import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query";
import { toast } from "sonner";

// This is also used for the frontend side, you can use a shared folder but it will be complex since our front and backend have different servers
// It will be extra work for deployment but would be nice to improve on
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string
    name: string
    // To be converted later on as number
    quantity: string
    // The data for the price will be fetched from the database itself (restaurant collection for a given restaurantId)
    // It is for security purposes since people can make requests through postman through the req.body, so that they can't create their own price values since it's not expected in the req
    // .body through this type
  }[],
  deliveryDetails:{
    email: string
    name: string
    addressLine1: string
    // No country because we can get that info from stripe
    city: string
  }
  restaurantId: string
}


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateCheckoutSession = () =>{
  const{getAccessTokenSilently} = useAuth0()

  const createCheckoutSessionRequest = async(checkoutSessionRequest: CheckoutSessionRequest) =>{
    const accessToken = await getAccessTokenSilently()

    const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
      method: "POST",
      headers:{
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(checkoutSessionRequest)

    })
    if(!response.ok){
      throw new Error("Unable to create checkout session")
    }

    return response.json()
  }

  const {mutateAsync: createCheckoutSession, isLoading, error, reset} = useMutation(createCheckoutSessionRequest)

  // It is resetted just to make sure it's able to process the payment again if there are any errors
  if(error){
    toast.error(error.toString())
    reset()
  }

  return{
    createCheckoutSession,
    isLoading,
  }

}