// Handles frontend to backend data flow (for making requests to the backend)
import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// This is how the frontend accesses the backend endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// This type contains the needed properties for the body request

export const useGetMyUser = () =>{
  const { getAccessTokenSilently } = useAuth0();
  
  const getMyUserRequest = async(): Promise<User> =>{
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`,{
      method: "GET",
      headers:{
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if(!response.ok){
      throw new Error("Failed to fetch user");
    } 
    return response.json();
  }

  // This will get the returned
  // data and can be used by frontend components by the useQuery hook that is connected to this api call connected to the backend functionality
  const { data: currentUser,
          isLoading,
          error } 
  = useQuery("fetchCurrentUser", getMyUserRequest);

  // It finds the error when executing the query or not being able to successfully use the data through the useQuery
  if(error){
    toast.error(error.toString());
  }

  // When it comes to getting or fetching data, we use data instead of mutations 

  return { currentUser, isLoading, error }
}


type CreateUserRequest = {
  auth0Id: string;
  email: string;

}

// Exportable, then the arrow  async function that holds in the user request to be used, then inside it is the response for additional options for the kind
// of request that is made
export const useCreateMyUser = () =>{
  // auth0 can now be accessed here since createUser is already wrapped in the authProvider, and getAccessTokenSilently is already part of auth0
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async(user: CreateUserRequest) =>{
    const accessToken = await getAccessTokenSilently();
    // We can create many endpoints here for different types of requests
    // It just needs the base url, and adding to that different endpoint names/paths
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Content type is what's expected by the body request
        "Content-Type": "application/json",
      },
      // Passing the data from the body to the user(which contains the type)
      body: JSON.stringify(user),
    });

    if(!response.ok){
      throw new Error("Failed to create user");
    }

    return response.json();
  }

  const{
    // MutateAsync is just renamed for the better
    mutateAsync: createUser,
    // These states are needed here for less code in useStates in creating components for this purpose
    isLoading, 
    isError,
    isSuccess,
  }  = useMutation(createMyUserRequest);
  //Use Mutation handles the request, we just need to pass in the function we created since it makes it easier to make endpoints for components, the other is
  // components also need it since they are relative
  
  // So that components can use these endpoints or make requests, it needs to be returned when using the useCreateMyUser so that components would be able to use it
  return{
    createUser,
    isLoading, 
    isError,
    isSuccess 
  };




}

type UpdateUserRequest ={
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}

export const useUpdateMyUser = () =>{
    const{ getAccessTokenSilently } = useAuth0();
    const updateMyUserRequest = async(formData: UpdateUserRequest) =>{
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // Content type is what's expected by the body request
          "Content-Type": "application/json",
        },
        // this is the data that will mainly be passed depending on the request method
        body: JSON.stringify(formData),
      });
      if(!response.ok){
        throw new Error("Failed to update user");
      }
      return response.json();
    }


    const{
      // MutateAsync is just renamed for the better
      mutateAsync: updateUser,
      // These states are needed here for less code in useStates in creating components for this purpose
      isLoading, 
      isError,
      error,
      isSuccess,
      reset,
    }  = useMutation(updateMyUserRequest);

    if(isSuccess){
      toast.success("User profile updated");
    }
    if(error){
      toast.error(error.toString());
      // Reset so error doesn't appear again when re rendered since it's based on the error state (it's persistent as long as the error is there)
      reset();
    }
    return{
      updateUser,
      isLoading, 
      isError,
      error,
      isSuccess,
      reset,
    };

    
}
