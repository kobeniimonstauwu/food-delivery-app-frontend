import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {isAuthenticated, isLoading} = useAuth0();
  
  // If not authenticated it will go to the index page and replace the url after entering it
  // If authenticated it will allow the user to have access and render the child components (which is specifically the user profile in our routes)
  // There's a logic that already protects the data of unauthorized users, which are the undefined data types since there is no current user (failed to load profile)

  // There is a bug when you refresh a page you will be logged out, because of the rerendering, and thinks that the user is NOT AUTHENTICATED
  // Old code: 
  // return isAuthenticated ? (<Outlet />) : (<Navigate to="/" replace />) 

  //New code:
  if(isLoading){
    return null;
    // This will do nothing and wait for auth0 to load in the background in order to see if the user is authenticated or not
    // Nothing will happen as it loads
  }
  if(isAuthenticated){
    return <Outlet />
  }

  return <Navigate to="/" replace/>


}

export default ProtectedRoute;