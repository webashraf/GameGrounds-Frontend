/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import MultiRangeSlider from "multi-range-slider-react";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetFacilitiesQuery } from "../../../Redux/api/facilities.api";
import CommonCard from "../../shared/CommonCard/CommonCard";
import CommonHero from "../../shared/CommonHero/CommonHero";
import LoadingSkeleton from "../../shared/Loader/LoadingSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import "./RangeSlider.css";

interface FacilityQuery {
  field: string;
  value: any;
}

const Facilities: React.FC = () => {
  const [query, setQuery] = useState<FacilityQuery[]>([]);
  const [minValue, setMinValue] = useState<number>(25);
  const [maxValue, setMaxValue] = useState<number>(200);

  // Debounce timer
  let debounceTimer: NodeJS.Timeout;

  const {
    data: facilities,
    isLoading,
    isFetching,
    error,
  } = useGetFacilitiesQuery(query);
  if (error) {
    toast.error("Failed to fetch facilities.");
  }

  console.log("facilities?.dataLength", facilities?.dataLength);
  const [facilitiesLength, setFacilitiesLength] = useState(
    facilities?.dataLength
  );
  useEffect(() => {
    setFacilitiesLength(facilities?.dataLength);
  }, [facilities, isLoading]);
  // * Handle filtering by price
  const handlePriceFilterInput = (e: {
    minValue: number;
    maxValue: number;
  }) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
    const newQuery = [
      { field: "minPrice", value: e.minValue },
      { field: "maxPrice", value: e.maxValue },
    ];

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setQuery(newQuery);
      setFacilitiesLength(facilities?.data?.length);
    }, 300);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 6;
  const totalPages = Math.ceil((facilitiesLength || 0) / limit);

  // * Debounced search handling
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueOfSearch = event.target.value;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setQuery([{ field: "searchTerm", value: valueOfSearch }]);
      setFacilitiesLength(facilities?.data?.length);
    }, 300);
  };

  // *  Handle Pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQuery([
      { field: "page", value: page },
      { field: "limit", value: limit },
    ]);
  };

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <CommonHero title="Facilities" />

      <div className="lg:px-40 px-5">
        {/* Search and filter */}
        <div className="flex justify-between flex-col lg:flex-row pb-20 relative lg:items-center items-start">
          <div className="relative">
            <input
              placeholder="Search..."
              className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
              name="search"
              type="text"
              onChange={handleSearchChange}
            />

            <Search className="size-6 absolute top-3 right-3 text-gray-500 cursor-pointer" />
          </div>

          <div className="w-[300px] shadow-xl shadow-black/10 rounded-md p-3">
            <h4 className="pb-2">Filter By Price:</h4>
            <MultiRangeSlider
              className="shadow-lg shadow-orange-700"
              min={0}
              max={500}
              baseClassName=""
              subSteps={true}
              step={10}
              barInnerColor="#101010"
              ruler={false}
              label={false}
              minValue={minValue}
              maxValue={maxValue}
              onChange={(e) => handlePriceFilterInput(e)}
            />
            <div className="space-x-10 pt-2">
              min: {minValue} &nbsp; max: {maxValue}
            </div>
          </div>
        </div>

        {isFetching ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-24 pb-20 md:pb-28 lg:pb-36 items-center">
            {facilities?.data.map((item: any) => (
              <CommonCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  size="default"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.max(1, currentPage - 1));
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    size="default"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  size="default"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.min(totalPages, currentPage + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Facilities;
