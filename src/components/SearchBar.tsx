import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { useForm } from "react-hook-form"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect } from "react"

const formSchema = z.object({
  searchQuery: z
    .string({
      required_error: "Restaurant name is required",
    })
    .trim() // Removes leading and trailing spaces
    .min(1), // Ensures the string is not empty after trimming
});

export type SearchForm = z.infer<typeof formSchema>

// Used props since different actions for each search bar depending if the user is on homepage, or searchpage
type Props = {
  searchQuery?: string
  onSubmit: (formData: SearchForm) => void
  placeholder: string
  // Extra options to have when clicking refresh button on browser
  onReset?: () => void
}

const SearchBar = ({ searchQuery, onSubmit, placeholder, onReset }: Props) => {
  const form = useForm<SearchForm>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        searchQuery
      }
  })

  const handleReset = () =>{
    form.reset({
      searchQuery: ""
    })
    
    if(onReset){
      onReset()
      // Does nothing right now, but if you add logic that's up to you (for additional settings while clearing)
    }
  }

  // Makes sure the value is always updated in this search bar component
  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery])

  return(
    <Form {...form}>
      {/* the input field has its default styling removed/transparent and the form tag itself now has the custom input styling */}
      {/* flex items-center flex-1 is for positioning the insides of the form, it both works for mobile and desktop */}
      <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}>
        {/* Search from lucide-react is the icon svg, it's hidden on smaller screens but visible to medium and up */}
        <Search strokeWidth={2.5} size={30} className="ml-1 text-blue-800 hidden md:block"/>
        {/* Having the field is important since it's rendering the validation and other visual */}
        <FormField control={form.control} name="searchQuery" render={({field}) => (
          <FormItem className="flex-1">
            <FormControl>
              <Input {...field} className="border-none shadow-none text-xl focus-visible:ring-0"
              placeholder={placeholder}/>
            </FormControl>
          </FormItem>
        )}/>

        {/* {form.formState.isDirty && ()} - this feature is buggy */}
        <Button type="button" variant="outline" className="rounded-full" onClick={handleReset}>
          Reset
        </Button>

        <Button type="submit" className="rounded-full bg-blue-500"> Search </Button>
      </form>
    </Form>
  )
}

export default SearchBar;