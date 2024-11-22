import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import  MobileNavLinks from "../components/MobileNavLinks"

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return(
    <Sheet>
      {/* Cause of sheet to open */}
      <SheetTrigger>
        {/* You can put the logic here for what causes the sheet to open */}
        {/* The trigger here is the menu icon */}
        <Menu className="text-blue-700"/>
      </SheetTrigger>
      {/* What's inside the sheet */}
      <SheetContent className = "space-y-3">
      {/* just adds space from this one to the button */}
          <SheetTitle>
            { isAuthenticated ? 
            (<span className = "flex items-center font-bold gap-2">
              {/* This is where both email and avatar are located, with a gap for proper positioning*/}
              <CircleUserRound className = "text-blue-700" />
              {user?.email}
            </span>) : 
            (<span> Welcome to OrionEats! </span>) }
            
          </SheetTitle>

          <Separator/>

          <SheetDescription className="flex flex-col gap-4">
            {/* Mobile nav links is similar to the username menu, but this is just a part of the sheet description that's why the naming is like this */}
            { isAuthenticated ? (<MobileNavLinks />) : ( <Button className="flex-1 font-bold bg-blue-700" onClick={() => loginWithRedirect()}> Login </Button> )}
            
          </SheetDescription>
      
      </SheetContent>

    </Sheet>
  )
}

export default MobileNav;