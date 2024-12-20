import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  // RemoveMenuItem is a function that doesn't accept anything (since it already does its work through the fieldsArray)
  removeMenuItem: () => void;
}

const MenuItemInput = ({index, removeMenuItem }: Props) => {
  // When inside a form field (It will only recognize the form field of the name and price (menuItems), as well as using the FieldArray which is part of the react-hook
  // form library
  const {control} = useFormContext();

  return(
    <div className="flex flex-row items-end gap-2 ">
      <FormField control={control} name={`menuItems.${index}.name`} render={({field}) => 
        <FormItem>
          <FormLabel className="flex items-center gap-1"> Name <FormMessage /></FormLabel>
          <FormControl>
            <Input {...field} placeholder="Cheese Pizza" className="bg-white text-black"/>
          </FormControl>
        </FormItem>
      }/>
            <FormField control={control} name={`menuItems.${index}.price`} render={({field}) => 
        <FormItem>
          <FormLabel className="flex items-center gap-1"> (₱)Price  <FormMessage /></FormLabel>
          <FormControl>
            <Input {...field} placeholder="100.00" className="bg-white text-black"/>
          </FormControl>
        </FormItem>
      }/>

      <Button type="button" onClick={removeMenuItem} className="bg-red-600 max-h-fit"> 
        Remove
      </Button>
    </div>
  )
}

export default MenuItemInput;