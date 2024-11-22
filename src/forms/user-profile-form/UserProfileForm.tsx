// For forms, you'll need the shadcn ui's input and form
// as well as npm i zod
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  // Basically the email is going to be a string, and optional allows the input to be READ-ONLY
  // It can catch different inputs such as the empty spaces
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(4, "Country is required"),
})
// Basically the UserFormData will take in the properties of the formSchema 
// The way zod handles this is through infer, where it takes the formSchema and reads it and it's able to put the properties automatiocally into the the type assigned to it
type UserFormData = z.infer<typeof formSchema>;

type Props = {
  // onSave is expecting user data
  // currentUser takes in the user information passed depending on the user in order to prepopulate the inputs
  currentUser: User;
  onSave:(userProfileData: UserFormData) => void;
  isLoading: boolean;
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  // Here is react hook form and the brackets are the properties and data expected on that react hook form
  const form = useForm<UserFormData>({
    // Here is the valodation (zod)
    resolver: zodResolver(formSchema),
    // The data types and names that match with the form and the User will only show (name, addressLine1, city, country, )
    defaultValues: currentUser,

    // Connecting to zod to the react form library
  });

  // Form will reset based on the new current user, or form re rendering (seen in the array) - If there are any changes that occur, it will reset the form
  // and the current user
  useEffect(() =>{
    form.reset(currentUser);

  }, [currentUser, form]);
  return(
    // Shadcn form with the react-hook form functionalities
    <Form {...form}>
      {/* Serves as the container for the form */}
      {/* handleSubmit is a function that will be responsible for checking the data and doing the validation, and if it succeeds in the check
      It will then pass the form data to onSave which is based on the UserFormData since it expects those data, and the formSchema is just for validation*/}
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-sky-600 rounded-lg md:p-10">
        
        <div>
          <h2 className="text-2xl font-bold"> User Profile Form </h2>
          <FormDescription className="text-black"> Change profile information </FormDescription>
        </div>
          {/* Control is needed to know what input is going to be used based on the properties of the type used in the useForm */}
        <FormField control={form.control} name="email" render={({field})=>(
          <FormItem>
            <FormLabel className="font-bold"> Email </FormLabel>
            {/* This formcontrol that wraps around the input handles the other errors in the frontend when it comes to different inputs*/}
            <FormControl>
              <Input {...field} disabled className="bg-gray-50"/>
              {/* the field just contains the properties of form's schema, userformdata, mostly everything in the form which helps in validating */}
              </FormControl>
          </FormItem>
        )}

        />
      {/* the field just bases on the name in the formfield that matches with the UserFormData which allows flexibility to the input that is going to be produced
      based on its data type */}
      <FormField control={form.control} name="name" render={({field})=>(
          <FormItem>
            <FormLabel className="font-bold"> Name </FormLabel>
            {/* This formcontrol that wraps around the input handles the other errors in the frontend when it comes to different inputs*/}
            <FormControl>
              <Input {...field} className="bg-white"/>
              {/* the field just contains the properties of form's schema, userformdata, mostly everything in the form which helps in validating */}
              </FormControl>
              {/* Display the message from the formSchema from the resolver we put */}
              <FormMessage/>
          </FormItem>
          
        )}
        />

        {/* In small screens it will be in one column but medium or higher is in a single row with a gap of 4 (inputs) */}
      <div className="flex flex-col md:flex-row gap-4">
      <FormField control={form.control} name="addressLine1" render={({field})=>(
          // Flex 1 will take the available space that it can depending on the div it's in
          <FormItem className="flex-1">
            <FormLabel className="font-bold"> Address </FormLabel>
            {/* This form control that wraps around the input handles the other errors in the frontend when it comes to different inputs*/}
            <FormControl>
              <Input {...field} className="bg-white"/>
              {/* the field just contains the properties of form's schema, userformdata, mostly everything in the form which helps in validating */}
              </FormControl>
          </FormItem>
        )}
        />
           <FormField control={form.control} name="city" render={({field})=>(
          <FormItem className="flex-1">
            <FormLabel className="font-bold"> City </FormLabel>
            {/* This form control that wraps around the input handles the other errors in the frontend when it comes to different inputs*/}
            <FormControl>
              <Input {...field} className="bg-white"/>
              {/* the field just contains the properties of form's schema, userformdata, mostly everything in the form which helps in validating */}
              </FormControl>
          </FormItem>
        )}
        />
           <FormField control={form.control} name="country" render={({field})=>(
          <FormItem className="flex-1">
            <FormLabel className="font-bold"> Country </FormLabel>
            {/* This form control that wraps around the input handles the other errors in the frontend when it comes to different inputs*/}
            <FormControl>
              <Input {...field} className="bg-white"/>
              {/* the field just contains the properties of form's schema, userformdata, mostly everything in the form which helps in validating */}
              </FormControl>
          </FormItem>
        )}
        />
        </div>

        {isLoading ? ( <LoadingButton/> ) : ( <Button type = "submit" className="bg-blue-700"> Submit </Button>)}
      </form>
      

    </Form>
  )
}

export default UserProfileForm;