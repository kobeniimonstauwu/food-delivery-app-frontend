import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  // Form fields, properties, types, validation messages
  restaurantName: z.string({
    required_error: "Restaurant name is required",

  }),
  city: z.string({
    required_error: "City is required",
    
  }),
  country: z.string({
    required_error: "Country is required",
    
  }), 
  // In HTML we get string from the returned by forms, but we need to convert since were using number in deliveryPrice so that it's the proper input for the mongoose
  // coerce.number converts string into number in a form input
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Delivery price must be a valid number", 
    
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated Delivery Time is required",
    invalid_type_error: "Estimated Delivery Time must be a valid number", 
    
  }),
  cuisines: z.array(z.string()).nonempty({
    // You should be able to select one in the checkbox which is going to be checked through the array, if none it will be considered empty and fire the message
    message: "Please select one item"
  }),
  menuItems: z.array(z.object({
    // Complex arrays is where you can use these min stuff, 
    name: z.string().min(1, "Name is required"),
    // Try to experiment invalid number formats here
    price: z.coerce.number().min(1, "Price is required")
  })),

  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  //Refune is for creating restaurants which will check if the imageUrl or imageFile exists already
}).refine((data) => data.imageUrl || data.imageFile, {
  message: "Either Image URL or Image File must be provided",
  path: ["imageFile"]
})


// Above is the schema and we will have the type conversion below which gives it a version where it has types

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  // onSave will submit right to the api endpoint, taken from this form
}


const ManageRestaurantForm = ({ onSave, isLoading, restaurant}: Props) => {
 
  const form = useForm<RestaurantFormData>({
    
    resolver: zodResolver(formSchema),
    defaultValues: {
      // setting it to empty also for validation since they are arrays
      // unless the data already exists

      cuisines: [],
      menuItems: [{ name: "", price: 0 }]
    }
  })

  useEffect(() => {
    if(!restaurant){
      return
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 1.342).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      // makes a copy of the menuItems object and overrides the price data only
      price: parseInt((item.price / 1.342).toFixed(2)),
    }));


    
    const updatedRestaurant = {
      // same logic here
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted

      
    }
    // fills the data with the ones with the get request and the old format of the number types of data filled
    form.reset(updatedRestaurant)
  }, [form, restaurant])
  
  const onSubmit = (formDataJson: RestaurantFormData) => {
    // Convert FormDataJson to new FormDataObject (For the image data format)
    // formDataJson now holds the properties of RestaurantFormData
    // this FormData is literally the needed format for the api request
    const formData = new FormData()
    // All should be string since http requests only accept strings
    formData.append("restaurantName", formDataJson.restaurantName)
    formData.append("city", formDataJson.city)
    formData.append("country", formDataJson.country)
    // 1 Peso = 1.342 pence
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 1.342).toString())
    formData.append("estimatedDeliveryTime", (formDataJson.estimatedDeliveryTime).toString())
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine)
      // It appends the data as the array index of cuisines, following the cuisine value
      // So this is basically appending the key pair value
    })
    formDataJson.menuItems.forEach((menuItem, index) => {
      // It will loop through everything inside menuItems array, left side is where it will be submitted (key), and the value is on the right side which is the json data
      // basically a key value pair, and the value is already using the data json through the formDataJson on the upper side
      formData.append(`menuItems[${index}][name]`, menuItem.name)
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 1.342).toString())
     
    })
    
    if(formDataJson.imageFile){
      formData.append(`imageFile`, formDataJson.imageFile)
    }
    
   
    onSave(formData)

  }

  return(
    <Form {...form}>
      {/* The space is for the spacing of each of the sections in the form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-blue-800 p-10 rounded-lg">
      <DetailsSection />
      <Separator className="bg-gray-400"/>
      <CuisinesSection />
      <Separator className="bg-gray-400"/>
      <MenuSection />
      <Separator className="bg-gray-400"/>
      <ImageSection />
      { isLoading ? <LoadingButton /> : <Button type="submit" className="bg-blue-500"> Submit </Button>}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm;