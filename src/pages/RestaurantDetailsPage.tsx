import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItemDetail from "@/components/MenuItemDetail";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfoDetail";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

// NOTE: If the state is used by multiple components, you'll need redux to handle state quite nicely, but in this case no multiple components are using state

// Used to make additions/other operations 
// This is used for the prices of menu items being added together in terms of price
// NOTE: Types are flexible and can expect an array if you put the square brackets, also the data inside it
export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

const RestaurantDetailPage = () => {
  const {restaurantId} = useParams()
  const {restaurant, isLoading} = useGetRestaurant(restaurantId)
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession()

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Setting the default state value from the session of the cart items specifically 
    // Session storage is better in this scenario since local storage lasts for a longer time than session storage. 
    // the reason there is a restaurantId is to only retrieve data from a specific restaurant that you're in, or where you got the cart data from 
    // It's only able to get the cartItems from a specific restaurantId since it's all unique depending on the restaurant
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
    return storedCartItems ? JSON.parse(storedCartItems) : []

    // The stringified json will be parsed into an array to be used as data for the cartItems
  })

  const addToCart = (menuItem: MenuItem) => {
    
    setCartItems((prevCartItems) => {
      // prevCartItems are the values that we're previously in this state
      // It will check if the item doesn't exist in the cartItems
      const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id)
      
      // If it does exist in the cart, it will add up its quantity
      let updatedCartItems

      if(existingCartItem){
        // In this code, the clicked menu item that already exists in the cart will update its quantity, while the other cart items that exist (but not 
        // clicked will stay the same
        updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
      }

      // it will add the item in the cart if it doesn't exist
      else{
        // the value here is basically just have the existing cart items in it, and having another created object inside the prevCartItems, which have the value of the
        // clicked menu item, and as you can see the value is being assigned in the new object
        updatedCartItems = [
          ...prevCartItems, {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          }
        ]
      }
      
      sessionStorage.setItem(`cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      )
      return updatedCartItems
    })
  }

  const removeFromCart = (cartItem: CartItem) =>{
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter((item) => cartItem._id !== item._id)

      return updatedCartItems
      
    })
    // Cart Item is the specific item within the cart already in the order summary that's about to be deleted, and the items are the complete item list in the cart
    // It will be filtered in such a way it only shows the items that exclude cartItem
   
  }




  // NOTE: The data is going from the user profile form data to here, so the flow of data is reversed.
  // We handle the backend for what to do with the user form data in here
  const onCheckout = async(userFormData: UserFormData) =>{
    // We will first create a checkout session in stripe in our backend through an endpoint
    // Stripe will take the cartItem and user info, and will process the information

    // While it simultaneously stores the user data and cartitem data (not yet paid) in our database and creates a session when the endpoint is hit
    // Then it returns a url for the user to see the webpage for the payment details

    // We will handle that URL so when the user clicks the button it will show the payment details from stripe, then once the payment is done, stripe
    // will send the user back to the web app

    // Lastly, after the payment has been processed in stripe it will first redirect the user to the app using the FRONTEND_URL in the .env in the backend 
    
    // Then the payment that is submitted will process in stripe then we will use a webhook to tell our backend that the user has completed the payment and
    // will update the order details at the same time in the database to say that the order has been paid

    // Then it will show the order status to the user

    // console.log("userFormData:", userFormData)

    // This object should be the same as the createSessionRequest type in terms of its data
    // Cart items are accessed through the state
    // While restaurant is accessed through the api get request
    // The deliveryDetails will be the userForm Data from the form submitted, because it has a different onChange, and will only list out what's needed in the type
    // And lastly the menuItems 

    // The view has loading returned, but for functions, it needs only to return, so it will not do anything and will show loading first if it doesn't have a restaurant
    // There are times that a request for get requests can be undefined and typescript handles it in a very safe manner
    if(!restaurant){
      return
    }
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString()
      })),
      restaurantId: restaurant._id,
      deliveryDetails:{
        email: userFormData.email as string,
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        country: userFormData.country,
        city: userFormData.city,
        
      }
    }

    const data = await createCheckoutSession(checkoutData)
    // After the data is successfully processed
    // the window.location.href will redirect you to that data url which is stripe's website, with the line items you provided, and everything

    window.location.href = data.url
  }

  if(isLoading || !restaurant){
    return "Loading..."
  }

  // Here is displayed the image at the top, and below it are 2 columns in a grid in medium to larger screens
  // The first column is the restaurant info and below it is the menu items to be put in the cart. 
  // While cart is in the second column after you put the menu items in the cart
  // NOTE: FOR EVERY COMPONENT THERE IS A CARD IN HERE


  return(
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16/5}>
      {/* This styling is to make the image fit the aspect ratio */}
        <img className="rounded-md object-cover h-full w-full" src={restaurant.imageUrl}/>
      </AspectRatio>
      {/* px is the padding for left and right side making it both centered */}
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant}/>
          <span className="text-2xl font-bold tracking-tight"> Menu </span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemDetail menuItem={menuItem} addToCart={() => addToCart(menuItem)}/>
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
            <CardFooter>
              <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading}/>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default RestaurantDetailPage;