import { CircleUserRound } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
const UsernameMenu = () => {
  // It's convenient since it handles the other backend processes like an api request for the data of the user that logs in
  const { user, logout } = useAuth0();

  return(
    <DropdownMenu>
      {/* The trigger handles the formatting for the avatar and email text */}
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-blue-400 gap-2 text-stone-200">
        <CircleUserRound className="text-stone-200"/>
        {/* It finds then renders the email of the existing user, if there is none there will be an error, so we try to prevent that through
          making sure that the user exists through the auth page */}
        {user?.email}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* DropdownMenuItem is one part of the dropdown to be clicked */}
        <DropdownMenuItem>
          <Link to ="/user-profile" className="font-bold hover:text-blue-700"> User Profile </Link>
        </DropdownMenuItem>
          
        <DropdownMenuItem>
          <Link to ="/manage-restaurant" className="font-bold hover:text-blue-700"> Manage Restaurant </Link>
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem>
          {/* Flex for making sure the width of the button holds up with the menu */}
          <Button className="flex flex-1 font-bold bg-blue-700" onClick ={() => logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          })}>
            Logout
          </Button>
        </DropdownMenuItem>
      
      </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UsernameMenu;