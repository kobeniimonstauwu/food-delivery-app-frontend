import { cuisineList } from "@/config/restaurant-options-config"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  isExpanded: boolean
  onExpandedClick: () => void
}

// isExpanded is to check whether the list of cuisines are expanded or not
// the state for collapsing or expanding this list is in the page

// State will also be used for the filtering itself (query too) - These are created in the search page



const CuisineFilter = ({onChange, selectedCuisines, isExpanded, onExpandedClick}: Props) => {
// When clicked it will change the value to an empty array which means the filters for the cuisines here are reset
  const handleCuisinesReset = () => onChange([])
  // The array considered in this function only is expecting the cuisines array

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    // This variable will hold the value of the clicked cuisine / checkbox
    const clickedCuisine = event.target.value
    const isChecked = event.target.checked

    // It handles the logic within the list, to what checked value is, and what unchecked value is
    const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine)
    onChange(newCuisinesList)
  }
  return (
    <>
    
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div onClick={handleCuisinesReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500">Reset Filters</div>
        </div>
        {/* 1 column for the cuisines */}
        <div className="space-y-2 flex flex-col">
          {/* It will slice the cuisine array to be complete if isExpanded is true, if false or not expanded it will only be 7  */}
          {cuisineList.slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine)

            return(
              <div className="flex">
                <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisinesChange}/>
                {/* Linking the label and the input through its id */}
                <Label htmlFor={`cuisine_${cuisine}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}>
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>

              </div>
            )
          })}

          {/* flex-1 is for the positioning of the child elements (The chevron and the text) so it would have a proper styling under the cuisine list */}
          <Button variant="link" className="mt-4 flex-1" onClick={onExpandedClick}>
            {isExpanded ? (<span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>) : (<span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>)}
          </Button>

        </div>

      
    </>
  )
}

export default CuisineFilter;