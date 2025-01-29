import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateOrderStatus } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order
}


const OrderItemCard = ({order}: Props) => {
  
 const { updateOrderStatus, isLoading } = useUpdateOrderStatus()

 const [status, setStatus] = useState<OrderStatus>(order.status)

 useEffect(() => {
  // While it's watching order.status from the props (database data), it will setStatus persistently, making the data up to date and persistent
  // This is important since it would only load the first order's status, it needs to be persistent for new orders as well
  setStatus(order.status)
 },
//  This one watches the order.status and what's coming from it which is from the props
 [order.status])
 const handleStatusChange = async(newStatus: OrderStatus) =>{
  updateOrderStatus({orderId: order._id as string, status: newStatus })
  setStatus(newStatus)
 }
 

 const getTime = () =>{
  const orderDateTime = new Date(order.createdAt)

  const hours = orderDateTime.getHours()
  const minutes = orderDateTime.getMinutes()

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${hours}:${paddedMinutes}`
 }
 return(
  <Card>
    <CardHeader>
      <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
        <div>
          Customer Name: <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
        </div>
        <div>
          Delivery Address: <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}, {order.deliveryDetails.country}</span>
        </div>
        <div>
          Time: <span className="ml-2 font-normal">{getTime()}</span>
        </div>
        <div>
          Total Cost: <span className="ml-2 font-normal">₱{(order.totalAmount / 100).toFixed(2)}</span>
        </div>
      </CardTitle>
      <Separator />
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2"> {order.cartItems.map((cartItem) => (
          <span>
            <Badge variant="outline" className="mr-2"> {cartItem.quantity} </Badge>
            {cartItem.name}
          </span>
        ))}</div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status"> What is the status of this order? </Label>
          <Select disabled={isLoading} value={status} onValueChange={(value) => handleStatusChange(value as OrderStatus)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Status"/>
            </SelectTrigger>
            {/* Popper is the traditional dropdown where the content is on the bottom side after clicked */}
             <SelectContent position="popper">
              {ORDER_STATUS.map((statusValue) => (
                <SelectItem value={statusValue.value}> {statusValue.label} </SelectItem>
              ))}
             </SelectContent>
          </Select>
        </div>
      </CardContent>
    </CardHeader>
  </Card>
 ) 
}

export default OrderItemCard;