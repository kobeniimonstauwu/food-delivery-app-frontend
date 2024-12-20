import { Link } from "react-router-dom";
import orionEatsLogo from "../assets/orioneatslogo.jpg";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

//Rfc is used for the components we create
const Header = () => {
  return(
  // Border to the bottom of this div
  <div className="border-b-2 border-b-blue-700 py-6 bg-blue-700">
    {/* Align content of the header and the page (relative/similar styling is applied), and to fix the positioning of the content of the Header*/}
    <div className="container mx-auto flex justify-between items-center">
        

        <Link to = "/" className="flex items-center space-x-3">
          <img src= {orionEatsLogo} alt = "orionEats logo" width="50px" height="50px"/>
        
        

        <span className="text-3xl font-bold tracking-tight text-stone-200">
        OrionEats
        </span>
        </Link>
        

        {/* It'll only appear in small screens and be hidden in middle size and above screens */}
        
        <div className = "md:hidden">
          <MobileNav />
        </div>
        <div className = "hidden md:block">
          <MainNav />
        </div>
    </div>
  </div>
  );
};

export default Header;