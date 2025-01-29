import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order
}

const OrderStatusDetail = ({order}: Props) => {
  return <div className="space-y-5"> 
  {/* This div gives spacing to each div inside (children) */}
  <div className="flex flex-col gap-1">
      <span className="font-bold"> Delivering To: </span>
      <span>{order.deliveryDetails.name}</span>
      <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}, {order.deliveryDetails.country}</span>
  <div className="flex flex-col gap-1">
    <span className="font-bold"> Your Order </span>
    <ul>
      {/* Looping all cartItem objects inside the array */}
      {order.cartItems.map((cartItem) => (
        <li> {cartItem.name} x{cartItem.quantity} </li>
      ))}
    </ul>
  </div>
  <Separator/>
  <div className="flex flex-col gap-1"> 
    <span className="font-bold"> Total </span>
    <span> ₱{(order.totalAmount / 100).toFixed(2)}</span>
  </div>
    </div>
  </div>
}

export default OrderStatusDetail;