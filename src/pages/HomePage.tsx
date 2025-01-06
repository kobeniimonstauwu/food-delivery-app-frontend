import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png'
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate()
  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`
    })
  }

  return(

    // This component is in a flex container, with with 12 gap column
    <div className="flex flex-col gap-12">
      {/* Padding inside the div here is py-8, shadow effect, rounded edges, gap 5 is for the elements inside it, mt-16 gives the overlap effect because
       it pushes it up forced */}
       {/* Medium screens will have padding so that the search bar doesn't stretch out the whole card */}
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        {/* Tracking tight is the letter spacing */}
        <h1 className="text-5xl font-bold tracking-tight text-black"> Search A Restaurant </h1>
        <span className="text-xl"> Delicious foods are waiting for you! </span>
        <SearchBar placeholder="Search by City or Town" onSubmit={handleSearchSubmit}/>
      </div>

      {/* Smaller screens have 1 column by default, while medium screens have 2 columns for the app and the download and gap 5 between them */}
      <div className="grid md:grid-cols-2 gap-5">
      <img src={landingImage}/>
      {/* This is the second column, which has centering position to fix its position relative to
      the first column */}
      {/* The styling is necessary for the texts, between spans*/}
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <span className="font-bold text-3xl tracking-tighter">
            Best Food Delivery App!
        </span>
        <span>
          OrionEats Mobile App Releasing Soon!
        </span>
            <img src={appDownloadImage}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage;