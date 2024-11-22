import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {isAuthenticated} = useAuth0();
  
  // If not authenticated it will go to the index page and replace the url after entering it
  // If authenticated it will allow the user to have access and render the child components (which is specifically the user profile in our routes)
  // There's a logic that already protects the data of unauthorized users, which are the undefined data types since there is no current user (failed to load profile)

  return isAuthenticated ? (<Outlet />) : (<Navigate to="/" replace />) 
}

export default ProtectedRoute;