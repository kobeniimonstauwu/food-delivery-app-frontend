// Auth 0 is a good third party since we easily get the info from registered user, the auth 0 package is also linked to react, making it easy for us
// This covers the routes and so on that's why it takes on children
// import { useCreateMyUser } from "@/api/MyUserApi";
import { Auth0Provider} from "@auth0/auth0-react"; // Add user / appstate if applicable
import { useNavigate } from "react-router-dom";

// to link data to the components here
// Also props/children are needed in order to pass in different things into a component that will be wrapping around something 
type Props = {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({children}: Props) => {
  const navigate = useNavigate();
  // Below contains the auth 0 domain access
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if(!domain || !clientId || !redirectUri || !audience){
    throw new Error("Unable to initialize auth");
  }

  // NOTE: ONREDIRECTCALLBACK BEING OUTSIDE THE PROVIDER IS DANGEROUS DUE TO NOT HAVING ACCESS TO THE AUTH0PROVIDER FEATURES SINCE IT'S OUTSIDE THE PROVIDER
  // AND THE PROVIDER WILL PROVIDE THE FEATURES SUCH AS THE ISAUTHENTICATED, SINCE THIS DOESN'T HAVE ANY, IT WON'T HAVE GOOD SECURITY
  // SO WE CREATE ANOTHER FILE AND PUT ALL OF THE LOGIC FOR CREATING A USER INSIDE THE PROVIDER
  // this contains the details of the logged in user, while appstate gives us the url the user was on during the authentication
  // This is when we go back to the app after we log in from auth0 (onRedirectCallback) - we can manipulate what will happen after

  //appstate?: AppState, user?: User
  const onRedirectCallback = () =>{
    // 
    // If user is successfully created in the backend, it will copy and paste the auth0Id and email from auth0 to the endpoint so that it can remember the user (existing)
    // It can also know what user is knew 

    navigate("/auth-callback"); // It's now in authprovider due to it being included in the AppRoutes
    // console.log("USER", user);
  };

  return(
    <Auth0Provider
    domain={domain}
    clientId={clientId} 
    authorizationParams={{redirect_uri: redirectUri, audience}}
    onRedirectCallback = {onRedirectCallback}>
      
      {children}
    </Auth0Provider>
    // The children will be what the Provider covers in main.tsx, which is right after the router since we need access to the router before using the AuthProvider
    // But the routes will be inside the Provider in order to secure the pages
  );
};

export default Auth0ProviderWithNavigate;