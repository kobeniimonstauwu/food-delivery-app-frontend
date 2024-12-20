import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckbox = ({cuisine, field}: Props) => {
  return(
    // Spacing of checkbox and label, as well as positioning
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>

        {/* The field value is the checked in the checkbox, while cuisine is the array list of cuisine, 
        checked returns true only for the checked matching strings in the array that matches with the cuisine list */}
        <Checkbox className="bg-white"
        checked={field.value.includes(cuisine)}
        // The onCheckedChanged just returns arrays
        onCheckedChange={(checked) =>{
          if(checked){
            // adds the field value array of strings into the cuisine list only if checked is true for those strings or array elements
            // checked value is added to the array
            field.onChange([...field.value, cuisine])
          }
          else{
            // filters out the unchecked checkboxes out of the field value list, each unchecked field value strings from the array list are filtered out
            // the unchecked value is filtered out, returning an array without the unchecked values
            field.onChange(field.value.filter((value: string) => value !== cuisine))
          }
        }}/>
      </FormControl>
      {/* Cuisine string is looped from the list */}
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox;