import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// useState vs useRef 
// useState rerenders everything
// useRef allows you to control the rerendering through boolean


const AuthCallbackPage = () => {
  const { createUser } = useCreateMyUser(); //isLoading, isError, isSuccess inside the const too
  const { user } = useAuth0();
  const navigate = useNavigate();
  const hasCreatedUser = useRef(false);
    useEffect(() => {
      if(user?.sub && user?.email && !hasCreatedUser.current){
        // This is based on the auth0 user info (the one that logged in then when it's posted it will be checked in the database which creates first then remembers through token)
        createUser({auth0Id: user.sub, email: user.email})
        // To make sure that this only renders one time, due to the conditional statement
        hasCreatedUser.current = true;
      }
      navigate("/");

      
    }, [createUser, navigate, user])

    // renders the loading in this page
    return <> Loading...</>;
}

export default AuthCallbackPage;