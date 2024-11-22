import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
  // Loading is renamed since it's being used in the same file so that the system doesn't get confused
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const {updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  
    // If it only loads then it will display this 
    if(isGetLoading){
      return <span> Loading... </span>
    }
    // But if there is no data the inputs will be empty as is in the form
    // Types are important since you're able to get the data/fields you only need
    
    // If ever there are bugs or errors, it will handle the error through this. It helps in avoiding crashes within the webapp
    if(!currentUser){
      return <span> Unable to load user profile </span>
    }
    return(
    <UserProfileForm currentUser = {currentUser} onSave={updateUser} isLoading={isUpdateLoading}/>
  )
}

export default UserProfilePage;