import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

type Props = {
  onChange: (value:string) => void
  sortOption: string
}

const SORT_OPTIONS = [
  // Best match is how it's sorted in the collection
  {
    label: "Best Match",
    value: "lastUpdated"
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice"
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime"
  }
]

const SortOptionDropdown = ({onChange, sortOption}: Props) => {

  // So basically if there's a value, it will go for the label of that value that matches the sortOption value, if none, it will be bestMatch's label (Best Match)
  const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label

  return(
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
         <Button variant="outline" className="w-full">
          Sort By: {selectedSortLabel}
          </Button> 
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

}

export default SortOptionDropdown;