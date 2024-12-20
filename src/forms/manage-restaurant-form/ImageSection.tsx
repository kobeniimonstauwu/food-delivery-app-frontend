import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  // The url comes from the get request, and watch uses fields that aren't used for render (in the form)
  const { control, watch } = useFormContext()

  const existingImageUrl = watch("imageUrl")
  return(
    <div className="space-y-2 text-stone-200">
      <div>
        <h2 className="text-2xl font-bold"> Image </h2>
        <FormDescription className="text-stone-200 italic">
          Add listing image of restaurant 
        </FormDescription>
        
      </div>
      {/* Image input 50% width so it doesn't take all the space*/}
      <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio = {16/9}>
            {/* The classname is for having rounded borders, at the same time taking up the whole space while not looking flat, while following the aspect ratio */}
            <img src ={existingImageUrl} className="rounded-md object-cover h-full w-full"/>
          </AspectRatio>
        )}
        <FormField control={control} name="imageFile" render={({field}) => (<FormItem>
          <FormControl>
            <Input className="bg-white text-black" type="file" accept=".jpg, .jpeg, .png" onChange={(event) => field.onChange(
              event.target.files ? event.target.files[0] : null
            )}/>
          </FormControl>
          <FormMessage />
        </FormItem>)}/>
      </div>
    </div>
  )
}

export default ImageSection;