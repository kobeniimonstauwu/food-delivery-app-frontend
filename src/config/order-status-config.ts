import { OrderStatus } from "@/types"

// Makes sure what value is put in ORDER_STATUS for better security
type OrderStatusInfo = {
  label: string,
  value: OrderStatus
  progressValue: number
}

export const ORDER_STATUS : OrderStatusInfo[]=[
  // Use of label and value for different dislays, this is where OPTIONS (The array of key value pairs comes in handy)
  // You can also set the progress bar value here
  {
    label: "Placed",
    value: "placed",
    progressValue: 0
  },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "paid",
    progressValue: 25
  },
  {
    label: "In Progress",
    value: "inProgress",
    progressValue: 50
  },
  {
    label: "Out For Delivery",
    value: "outForDelivery",
    progressValue: 75
  },
  {
    label: "Delivered",
    value: "delivered",
    progressValue: 100
  }
]