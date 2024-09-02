/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useGetFacilitiesQuery } from "../../../Redux/api/baseApi";
import CommonCard from "../../shared/CommonCard/CommonCard";
import CommonHero from "../../shared/CommonHero/CommonHero";
import Loader from "../../shared/Loader/Loader";
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
  // Add other facility properties as needed
}

interface FormData {
  minPrice: number;
  maxPrice: number;
}

const Facilities: React.FC = () => {
  const { data: facilities, isFetching } = useGetFacilitiesQuery(undefined);

  const [searchValue, setSearchValue] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    minPrice: 0,
    maxPrice: 1000,
  });
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>(
    facilities?.data || []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6; // Changed to 6 items per page
  const totalPages = Math.ceil((facilities?.data?.length || 0) / itemsPerPage);

  useEffect(() => {
    setFacilitiesData(facilities?.data || []);
  }, [facilities]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const searchResult = facilities?.data.filter((item: any) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFacilitiesData(searchResult);
    if (!searchValue) {
      setFacilitiesData(facilities?.data || []);
    }
    setCurrentPage(1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchResult = facilities?.data.filter((item: any) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFacilitiesData(searchResult);
      if (!searchValue) {
        setFacilitiesData(facilities?.data || []);
      }
      setCurrentPage(1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    setCurrentPage(1); // Reset to the first page after filter
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedFacilities = facilitiesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <CommonHero title="Facilities" />
      {isFetching ? (
        <div className="h-[60vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="lg:px-20 px-5">
          {/* Search and filter */}
          <div className="flex justify-between pb-20 relative ">
            <div className="relative">
              <input
                placeholder="Search..."
                className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                name="search"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />

              <Search
                className="size-6 absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={handleSearchClick}
              />
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-lg text-center"
                    />
                  </div>

                  <Button type="submit">Submit</Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>

          {/* Facilities items card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-28 pb-20 md:pb-28 lg:pb-36 ">
            {paginatedFacilities.map((item) => (
              <CommonCard key={item._id} item={item} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    size="default"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default anchor behavior
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
                        e.preventDefault(); // Prevent default anchor behavior
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
      )}
    </>
  );
};

export default Facilities;
