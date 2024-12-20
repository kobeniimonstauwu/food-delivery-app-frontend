import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  // Use form context passes the react hook form properties from the parent to child (So this will use the passed data and 
  // properties of the form in the ManageRestaurantForm.tsx)
  const {control} = useFormContext()
  return(
    <div className="space-y-2 text-stone-200">

      <div>
        <h2 className="text-2xl font-bold"> Details </h2>
        <FormDescription className="text-stone-200 italic">
          Enter the details about your restaurant
        </FormDescription>
      </div>
      <FormField control={control} name="restaurantName" render={({field}) => (<FormItem>
        <FormLabel> Name </FormLabel>
        <FormControl>
          <Input {...field} className="bg-white text-black"/>
        </FormControl>
        <FormMessage />
      </FormItem>)}
        
      />
      {/* City and country in one row, that's why there's another div, and to take up full space of the form, flex-row won't work here, but make
      the form item flex-1*/}
      <div className="flex gap-4">
      <FormField control={control} name="city" render={({field}) => (<FormItem className="flex-1">
        <FormLabel> City </FormLabel>
        <FormControl>
          <Input {...field} className="bg-white text-black"/>
        </FormControl>
        <FormMessage />
      </FormItem>)}
      />


      <FormField control={control} name="country" render={({field}) => (<FormItem className="flex-1">
        <FormLabel> Country </FormLabel>
        <FormControl>
          <Input {...field} className="bg-white text-black"/>
        </FormControl>
        <FormMessage />
      </FormItem>)}
      />

      </div>

      
      <FormField control={control} name="deliveryPrice" render={({field}) => (<FormItem className="max-w-[25%]">
        <FormLabel> (₱)Delivery Price </FormLabel>
        <FormControl>
          <Input {...field} className="bg-white text-black" placeholder="100.00"/>
        </FormControl>
      </FormItem>)}
      />

<FormField control={control} name="estimatedDeliveryTime" render={({field}) => (<FormItem className="max-w-[25%]">
        <FormLabel> Estimated Delivery Time (minutes) </FormLabel>
        <FormControl>
          <Input {...field} className="bg-white text-black" placeholder="30"/>
        </FormControl>
        <FormMessage />
      </FormItem>)}
      />


    </div>
  )
}

export default DetailsSection;