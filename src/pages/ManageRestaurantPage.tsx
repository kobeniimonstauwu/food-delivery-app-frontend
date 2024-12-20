import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  // onSave already has the form data in it, and it's calling the createRestaurant from the api and it will pass the form data there to submit the query
  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant()
  const { restaurant, isLoading: isGetLoading } = useGetMyRestaurant()
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
  if(isGetLoading){
    return <span> Loading... </span>
  }
  // The isEditing returns a boolean of false if undefined/empty, and true if it the fetched restaurant data exists
  const isEditing = !!restaurant
  return (<ManageRestaurantForm restaurant={restaurant} onSave = {isEditing ? updateRestaurant : createRestaurant } isLoading = {isCreateLoading || isUpdateLoading}/>)
}

export default ManageRestaurantPage;