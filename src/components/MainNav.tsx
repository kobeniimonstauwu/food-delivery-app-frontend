import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import UsernameMenu from './UsernameMenu';
import { Link } from 'react-router-dom';

const MainNav = () => {
  const {loginWithRedirect, isAuthenticated } = useAuth0(); 
  // This will be responsible for the redirection of the user to the login page
  return(
    // the span adds spacing to the links in the navbar on the right side with a gap of 2 between the links, as well as positioning for the center
    <span className='flex space-x-2 items-center'>
      {isAuthenticated ? ( <>
        <Link to="/order-status" className="font-bold hover:text-blue-400 text-stone-200"> Order Status</Link>
        <UsernameMenu/> 
      </>) 
      : 
      ( <Button variant="ghost" className="font-bold hover:text-blue-700 hover:bg-white" 
      onClick = {async() => await loginWithRedirect()}>
      {/* This will let them go to the login page on click, it will only appear if the user is not yet authenticated */}
        Login
      </Button> 
      )} 
      </span>

  )
}

export default MainNav;