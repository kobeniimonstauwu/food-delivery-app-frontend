import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order
}



const OrderStatusHeader = ({order}: Props) => {
  const getExpectedDelivery = () =>{
    // creates a date object containing the createdAt
    const created = new Date(order.createdAt)

    created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime)

    const hours = created.getHours()
    const minutes = created.getMinutes()

    // single digit minutes has 0 in front
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return `${hours}:${paddedMinutes}`
  }

  const getOrderStatusInfo = () =>{
    return ORDER_STATUS.find((orderStatusLabel) => orderStatusLabel.value === order.status) || ORDER_STATUS[0]


  }
  return(
    // Fragment because we have components at the same level since it's a big card
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {getOrderStatusInfo().label} </span>   
        <span> Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue}/>
 
    </>
  )
}
export default OrderStatusHeader;