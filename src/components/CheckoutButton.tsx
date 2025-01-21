import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void
  disabled: boolean
  isLoading: boolean
}

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()

  const { pathname } = useLocation()

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()
  const onLogin = async() =>{
    await loginWithRedirect({
      appState:{
        returnTo: pathname
      }
    })
  }

  // State for cart items are not usually persistent after logging in, since it's just javascript
  // But in order to resolve that we will use a session storage so that the added data will not be lost (menu items that will go to cart items) even after logging
  // in
  if(!isAuthenticated){
    return <Button onClick={onLogin} className="bg-blue-700 flex-1"> Login To Checkout</Button>
  }

  // current User needs to be checked since it can be undefined for a while so it needs to render this loading button if that's the case
  // Also for validation
  // isLoading is for the checkout if it's loading (creating the session and redirecting to stripe payment page)
  if (isAuthLoading || !currentUser || isLoading){
    return <LoadingButton />
  }
  
  
  return(
    <Dialog>
      {/* The child (button), triggers the Dialog Content */}
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-blue-700 flex-1">
          Checkout
        </Button>
      </DialogTrigger>
      {/* Dialog Content */}
      {/* Adjusts the size of the dialog based on the screen size */}
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-blue-800">
        <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title="Confirm Delivery Details" buttonText="Continue to payment" />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutButton;