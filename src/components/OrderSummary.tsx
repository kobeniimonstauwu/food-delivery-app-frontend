import { CartItem } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant
  cartItems: CartItem[]
  removeFromCart: (cartItem: CartItem) => void 
}


const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {

  const getTotalCost = () =>{
    // 0 is the initial total value, and the variable will hold the sum of all the looped cart item prices multiplied by its quantity
    const totalInPesos = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)

    const totalwithDeliveryPrice = totalInPesos + restaurant.deliveryPrice

    return (totalwithDeliveryPrice/ 1).toFixed(2)
  }
  return(
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span> Your order </span>
          <span> ₱{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((cartItem) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
                {cartItem.name}
            </span>
            <span className="flex items-center gap-1">
            <Trash className="cursor-pointer" color="red" size={20} onClick={() => removeFromCart(cartItem)}/>
            ₱{((cartItem.price * cartItem.quantity)/ 1).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
          <div className="flex justify-between">
            <span> Delivery </span>
            <span> ₱{(restaurant.deliveryPrice/ 1).toFixed(2)}</span>
          </div>
        <Separator />

      </CardContent>
    </>

  )
}

export default OrderSummary;