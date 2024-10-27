import { ChangeEvent, useEffect, useState } from "react";
import { useGetFacilitiesQuery } from "../../../../Redux/api/facilities.api";
import Loader from "../../../shared/Loader/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../ui/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import FacilitiesTable from "./FacilitiesTable";
interface FacilityQuery {
  field: string;
  value: any;
}
const FacilitiesUpdate = () => {
  const [query, setQuery] = useState<FacilityQuery[]>([]);

  const {
    data: facilitiesData,
    isLoading,
  } = useGetFacilitiesQuery(query);
  const [facilitiesLength, setFacilitiesLength] = useState(
    facilitiesData?.dataLength
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 6;
  const totalPages = Math.ceil((facilitiesLength || 0) / limit);
  useEffect(() => {
    setFacilitiesLength(facilitiesData?.dataLength);
  }, [facilitiesData, isLoading]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQuery([
      { field: "page", value: page },
      { field: "limit", value: limit },
    ]);
  };
  // Debounce timer
  let debounceTimer: NodeJS.Timeout;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const valueOfSearch = event.target.value;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      setQuery([{ field: "searchTerm", value: valueOfSearch }]);
      setFacilitiesLength(facilitiesData?.data?.length);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full ">
      {" "}
      <div className="lg:mt-10 mt-32  mx-auto lg:px-10 px-5">
        <h2 className="text-4xl text-black uppercase mb-10">
          Facilities Update
        </h2>
        <>
          {/* Search and filter */}
          <div className="flex justify-between  relative items-center mb-2">
            <div className="relative ">
              <input
                placeholder="Search..."
                className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
                name="search"
                type="text"
                onChange={handleSearchChange}
              />

              <Search className="size-6 absolute top-3 right-3 text-gray-500 cursor-pointer" />
            </div>

            {/* <div className="w-[300px] shadow-xl shadow-black/10 rounded-md p-3">
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
          </div> */}
          </div>
          {/* Display the list of products in a table */}
          <div className="lg:h-auto h-[60vh] overflow-auto custom-scrollbar">
            <Table className="">
              <TableHeader className=" bg-black/80 shadow-2xl backdrop-blur-lg rounded-md ">
                <TableRow className="w-full ">
                  <TableHead className="w-[100px] text-white">Serial</TableHead>
                  <TableHead className="text-white">Facility Name</TableHead>
                  <TableHead className="text-white">Location</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">Price</TableHead>
                  <TableHead className="text-center text-white ">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Map through the products and display each one in a table row */}
              <TableBody className="bg-zinc-200">
                {facilitiesData &&
                  facilitiesData?.data?.map((item: any, i: number) => (
                    <FacilitiesTable key={item._id} item={item} i={i} />
                  ))}
              </TableBody>
            </Table>
          </div>
        </>
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
    </div>
  );
};

export default FacilitiesUpdate;
