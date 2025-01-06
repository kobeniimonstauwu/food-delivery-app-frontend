import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant
}

// So basically there are 2 columns which hold the image and the information of the restaurant
// Second column also has 2 columns inside
const SearchResultCard = ({restaurant}: Props) => {
  return(
    // Left and right column of the card
    // group is for the hover effect of the card
    // The link is expecting 2 columns (2fr_3fr) so it should only have 2 children tags (aspect ratio and the div holding the remaining tags)
    <Link to={`/detail/${restaurant._id}`} className="grid lg:grid-cols-[2fr_3fr] gap-5 group">

      <AspectRatio ratio={16/6}>
      {/* This restaurant name will be underlined since whenever the card (which is altogether in a group) is hovered, so it's the effect of hovering*/}
      
 
      {/* Object cover makes sure that the image is adjusted where the focus is on the center of the image */}
        <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" alt="restaurant image" />
      </AspectRatio>

  

<div>
        {/* This div above holds the name and the remaining card content */}
      <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
        {restaurant.restaurantName}
      </h3>
      {/* Another 2 columns for the cuisines, estimated delivery time and estimated delivery price*/}
      <div id="card-content" className="grid md:grid-cols-2 gap-2">
        {/* This div will not make this column overflow to the next one */}
        <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <span className="flex">
                <span>{cuisine}</span>
                {/* It will add dots between each item */}
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
        </div>
            {/* Second Column in the Card  */}
            <div className="flex gap-2 flex-col">
                <div className="flex items-center gap-1 text-green-600">
                  <Clock className="text-green-600"/>
                  {restaurant.estimatedDeliveryTime} mins
                </div>
                <div className="flex items-center gap-1">
                  <Banknote />
                  Delivery from ₱{(restaurant.deliveryPrice / 1.342).toFixed(2)}
                </div>
            </div>
         </div>
      </div>
    </Link>
  )
}

export default SearchResultCard;