import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

// Contains logout and user profile link
const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return(
    <>
     
      <Link to = "/order-status" className ="flex bg-white items-center font-bold hover:text-blue-700">
      Order Status </Link>
      <Link to = "/user-profile" className ="flex bg-white items-center font-bold hover:text-blue-700">
      User Profile </Link>
      <Link to = "/manage-restaurant" className ="flex bg-white items-center font-bold hover:text-blue-700">
      Manage Restaurant </Link>
      <Button className = "flex bg-blue-700 items-center px-3 font-bold hover:bg-gray-500" onClick={() => logout({
        logoutParams: {
          returnTo: window.location.origin
        } 
      })}> 
        Logout </Button>
    </>
  )
}

export default MobileNavLinks;