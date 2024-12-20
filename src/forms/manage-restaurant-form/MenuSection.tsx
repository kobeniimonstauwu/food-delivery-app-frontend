import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const {control} = useFormContext()

  // used for generating array of data or fields
  const{fields, append, remove} = useFieldArray({
    control,
    name: "menuItems",
  })
  return(
    <div className="space-y-2 text-stone-200">
      <div>
      <h2 className="text-2xl font-bold"> Menu </h2>
      <FormDescription className="italic text-stone-200"> Create your menu </FormDescription>
      </div>
    <FormField control={control} name="menuItems" render={() => (
      <FormItem className="flex flex-col gap-2">
          {fields.map((_, index)=> (
            // remove function removes a record based on its index
            <MenuItemInput index={index} removeMenuItem={() => remove(index)}/>
          ))}
      </FormItem>
    )}
    />
    {/* Put default values in the append */}
    <Button type="button" onClick={() => append({name: "", price:""})} className="bg-blue-500"> Add a Menu Item</Button>
    </div>
  )
}

export default MenuSection;