/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { useGetFacilitiesQuery } from "../../../Redux/api/facilities.api";
import CommonCard from "../../shared/CommonCard/CommonCard";
import CommonHero from "../../shared/CommonHero/CommonHero";
import LoadingSkeleton from "../../shared/Loader/LoadingSkeleton";
import { Button } from "../../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

// Define types
interface Facility {
  _id: string;
  name: string;
  pricePerHour: number;
}

interface FormData {
  minPrice: number;
  maxPrice: number;
}

const Facilities: React.FC = () => {
  const [query, setQuery] = useState<any>([]);
  // [{ field: "searchTerm", value: "Tennis" }]
  const {
    data: facilities,
    isLoading,
    isFetching,
    error,
  } = useGetFacilitiesQuery(query);
  console.log("Facilities: ", facilities?.dataLength);

  if (error) {
    toast.error("Failed to fetch facilities.");
  }

  const [formData, setFormData] = useState<FormData>({
    minPrice: 0,
    maxPrice: 1000,
  });

  const [facilitiesData, setFacilitiesData] = useState<Facility[]>(
    facilities?.data || []
  );
  console.log("FacilitiesData: ", facilitiesData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 8;
  const totalPages = Math.ceil((facilities?.dataLength || 0) / limit);

  useEffect(() => {
    setFacilitiesData(facilities?.data || []);
  }, [facilities]);

  //* Search done
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueOfSearch = event.target.value;
    setQuery([{ field: "searchTerm", value: valueOfSearch }]);
  };

  // ! need to handle it from backend
  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minPrice = formData.minPrice || 0;
    const maxPrice = formData.maxPrice || 1000;
    const filteredItems = facilities?.data.filter(
      (item: any) =>
        item.pricePerHour > minPrice && item.pricePerHour < maxPrice
    );
    setFacilitiesData(filteredItems || []);
    setCurrentPage(1);
  };

  // * pagination done
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Paginate page", page);
    setQuery([
      { field: "page", value: page },
      { field: "limit", value: limit },
    ]);
  };
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <CommonHero title="Facilities" />

      <div className="lg:px-20 px-5">
        {/* Search and filter */}
        <div className="flex justify-between pb-20 relative ">
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
          <Popover>
            <PopoverTrigger>
              <Button>Filter By Price</Button>
            </PopoverTrigger>
            <PopoverContent>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-lg gap-5"
              >
                <div className="flex flex-col">
                  <label htmlFor="minPrice" className="text-lg font-medium">
                    Min:
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-lg text-center"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="maxPrice" className="text-lg font-medium">
                    Max:
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded-lg text-center"
                  />
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </PopoverContent>
          </Popover>
        </div>

        {/* Facilities items card */}
        {isFetching ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-28 pb-20 md:pb-28 lg:pb-36 ">
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
      {/* )} */}
    </>
  );
};

export default Facilities;
