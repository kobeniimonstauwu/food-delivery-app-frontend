import { useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  // onSave already has the form data in it, and it's calling the createRestaurant from the api and it will pass the form data there to submit the query
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant()
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant()
  const { orders } = useGetMyRestaurantOrders()
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
  if(isGetLoading){
    return <span> Loading... </span>
  }
  // The isEditing returns a boolean of false if undefined/empty, and true if it the fetched restaurant data exists
  const isEditing = !!restaurant

  

  return (
    <Tabs>
      <TabsList defaultValue="orders">
        <TabsTrigger value="orders"> Order </TabsTrigger>
        <TabsTrigger value="manage-restaurant"> Manage Restaurant </TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orders?.length} Active Orders</h2>
        {orders?.map((order) => <OrderItemCard order={order}/>)}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm restaurant={restaurant} onSave = {isEditing ? updateRestaurant : createRestaurant } isLoading = {isCreateLoading || isUpdateLoading}/>
      </TabsContent>
    </Tabs>

)
}

export default ManageRestaurantPage;