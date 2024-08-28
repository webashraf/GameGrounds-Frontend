import { useState } from "react";
import { useGetFacilitiesQuery } from "../../../Redux/api/baseApi";
import CommonCard from "../../shared/CommonCard/CommonCard";
import CommonHeading from "../../shared/CommonHeading/CommonHeading";
import CommonHero from "../../shared/CommonHero/CommonHero";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
const Facilities = () => {
  const {
    data: facilities,
    error,
    isLoading,
    isFetching,
  } = useGetFacilitiesQuery(undefined);
  console.log(facilities);
  const [searchValue, setSearchValue] = useState("");
  const [price, setPrice] = useState(1000);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setMaxPrice(Number(event.target.value));

    // Add your filtering logic here
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
    setPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
    setPrice(Number(event.target.value));
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(searchValue);
    }
  };

  return (
    <div className="">
      <CommonHero title="Facilities" />
      <CommonHeading
        title="Premium Facilities for Every Sport"
        subTitle="Handpicked venues for the ultimate sports experience"
      />

      {/* Search and filter */}
      <div className="flex justify-between pb-20 px-2 relative">
        <div className="relative">
          <input
            placeholder="Search..."
            className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
            name="search"
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <svg
            className="size-6 absolute top-3 right-3 text-gray-500 cursor-pointer"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSearchClick}
          >
            <path
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        <Popover>
          <PopoverTrigger>Filter By Price</PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col items-center   p-4 bg-gray-100 rounded-lg shadow-lg  gap-5">
              <div className="20%] flex flex-col">
                <label htmlFor="minPrice" className="text-lg font-medium ">
                  Min:
                </label>
                <input
                  type="number"
                  id="minPrice"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className=" p-2 border border-gray-300 rounded-lg 100% text-center"
                />
              </div>

              <div className="20%] flex flex-col">
                {" "}
                <label htmlFor="maxPrice" className="text-lg font-medium">
                  Max:
                </label>
                <input
                  type="number"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className=" p-2 border border-gray-300 rounded-lg  text-center"
                />
              </div>

              <div className="60%] flex items-center gap">
                <div className="90%">
                  <label htmlFor="priceRange" className="text-lg font-medium ">
                    Filter by Price: ${price}
                  </label>
                  <input
                    type="range"
                    id="priceRange"
                    min={minPrice}
                    max={maxPrice}
                    step="10"
                    value={price}
                    onChange={handlePriceChange}
                    className="w-full accent-black"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Facilities items card */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-28 pb-20 md:pb-28 lg:pb-36 ">
        {facilities?.data?.map((item: any) => (
          <CommonCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Facilities;
