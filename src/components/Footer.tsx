import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <div className="bg-sky-600 py-5">
      {/* Div for the logo on left side and links on right side (positioning purposes) */}
      {/* Container mx auto is necessary for alignment for different components, regardless of screen size */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Flex row for mid or larger screens */}
        {/* While column on smaller screens/phone */}
        {/* Justify between gives a space at the middle */}
        {/* Items center for vertically aligning objects to the center */}

        {/* Left side */}
        <Link to ="/" className="text-3xl text-black font-bold tracking-tight">
          OrionEats
        </Link>
        {/* Right side */}
        <span className="text-black font-bold tracking-tight flex gap-4">
          <span> Privacy Policy </span>
          <span> Terms of Service </span>
        </span>
      </div>
    </div>
  )
}

export default Footer;

