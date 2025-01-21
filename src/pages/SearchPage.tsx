import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[]
  sortOption: string
}

// NOTE: It's easier to keep all state her to make data persistent (it's better to handle if it's in the parent component)
const SearchPage = () => {
  
  const { city } = useParams()
  // Inside the useState is the value for the expected type since there's a tag used in the useState
  
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const [searchState, setSearchState] = useState<SearchState>({
    // When the state loads for the first time this will be the value of the searchQuery
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    // Should be bestMatch but it's buggy
    sortOption: "lastUpdated"
  })

  const { results, isLoading } = useSearchRestaurants(searchState, city)


  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1
    }))
  }
  // the state holds the value of these and makes the data persistent
  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1
    }))
  }

  const setPage = (page:number) =>{
    setSearchState((prevState) => ({
      ...prevState,
      page
    }))
  }

  // The reason why we set the searchQuery is that it retains the other queries for sorting and cuisines
  const setSearchQuery = (searchFormData: SearchForm) =>{
    setSearchState((prevState) => ({
      ...prevState,
      // The search string that is submitted from the search bar (searchFormData.searchQuery)
      searchQuery: searchFormData.searchQuery,
      page: 1
    }))
  }

  const resetSearch = () =>{
    setSearchState((prevState) => ({
      ...prevState,
      // The search string that is submitted from the search bar (searchFormData.searchQuery)
      searchQuery: "",
      page: 1
    }))
  }
  // The name should be the same in the pathname in AppRoutes (:city)
  // This is used for accessing the (:city) in approutes
  

  if(isLoading){
    <span> Loading... </span>
  }

  if(!results?.data || !city){
    return <span> No Results Found. </span>
    // toast.message("No Results Found.")
  }
  return (
    // For smaller screens it will be only 1 column, while for larger screens it will have 2 columns where the left side is 250px and right will take the rest
    // of the space
    // Basically a long right column, and not much of the left column
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* Here are the cuisines to be checked */}
      <div id="cuisines-list">
        {/* Selected cuisines is used for the query itself, while setSelectedCuisines is used for the visuals and setting up the selectedCuisines data,
        many things are happening in the background */}
        {/* setIsExpanded is an arrow function that will take the boolean value and make it opposite whenever the button is clicked, while isExpanded is the default boolean */}
      <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}/>
      </div>
      {/* Right column - holds main content (the search results and other stuff with it) */}
      <div id="main-content" className="flex flex-col gap-5">
        {/* TAKE NOTE: searchQuery prop is here since every time the form is submitted it rerenders the whole search page and the input will be gone, and the only way
         to display it in the page is to get it from the state value, and put it as a default value, and also make it persistent through use effect just to be sure */}
        <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeholder="Search by Cuisine or Restaurant Name" onReset={resetSearch}/>
        {/* Groups all of them in one column, and the gap for each element within here is 5 */}
        
        {/* This is grouped since search result info and sortdropdown can be put in the same line through flexbox */}
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
        <SearchResultInfo total={results.pagination.total} city={city}/>
        <SortOptionDropdown sortOption={searchState.sortOption} onChange={(option) => setSortOption(option)} />
        </div>
        
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
        <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
      </div>
    </div>
    
  )
}

export default SearchPage;