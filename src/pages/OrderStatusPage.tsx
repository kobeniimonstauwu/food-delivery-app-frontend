import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
  const {orders, isLoading} = useGetMyOrders()

  if(isLoading){
    return "Loading..."
  }

  if(!orders || orders.length === 0){
    return "No Orders Found"
  }

  return(
    // card container 
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order} />
           
               {/* Mobile and PC view */}
               <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order}/>
            <AspectRatio ratio={16/5}>
            {/* Consistent size of image to show clear quality picture */}
            <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" alt="restaurantImage" />
              </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderStatusPage;