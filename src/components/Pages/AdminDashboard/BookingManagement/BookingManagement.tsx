/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useGetAllBookingsQuery } from "../../../../Redux/api/booking.api";
import Loader from "../../../shared/Loader/Loader";
// import "../../../shared/Styles/RangeSlider.css";
import { NavLink } from "react-router-dom";
import { Button } from "../../../ui/button";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
interface IBookingsQuery {
  field: string;
  value: any;
}

const BookingManagement = () => {
  const [query, setQuery] = useState<IBookingsQuery[]>([
    { field: "limit", value: 5 },
  ]);

  // Debounce timer
  // let debounceTimer: NodeJS.Timeout;

  const { data: bookings, isLoading } = useGetAllBookingsQuery(query);

  console.log(bookings);

  const [bookingsLength, setBookingsLength] = useState(bookings?.dataLength);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const limit = 5;
  const totalPages = Math.ceil((bookingsLength || 0) / limit);
  useEffect(() => {
    setBookingsLength(bookings?.dataLength);
  }, [bookings, isLoading]);

  // * handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQuery([
      { field: "page", value: page },
      { field: "limit", value: limit },
    ]);
  };

  if (isLoading) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="lg:mt-10 mt-32 relative mx-5 ">
        <h2 className="text-4xl text-black uppercase mb-10">
          Booking Management
        </h2>
        {/* Search and filter */}
        <div className="flex justify-between  relative items-center mb-2"></div>
        <div className="lg:h-auto h-[60vh] overflow-auto custom-scrollbar ">
          <Table className="">
            <TableHeader className="h-[00px] bg-black/80 shadow-2xl backdrop-blur-lg rounded-md ">
              <TableRow className="w-full ">
                <TableHead className=" text-white">Serial</TableHead>
                <TableHead className="text-white">Facility Name</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">User</TableHead>
                <TableHead className="text-white">Location</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Start Time</TableHead>
                <TableHead className=" text-white ">End Time</TableHead>
                <TableHead className=" text-white ">View Details</TableHead>
              </TableRow>
            </TableHeader>

            {/* Map through the products and display each one in a table row */}
            <TableBody className="">
              {bookings &&
                bookings?.data?.map((item: any, i: number) => (
                  <TableRow key={item._id} className="bg-zinc-200">
                    <TableCell className="font-medium w-[3%]">{i}</TableCell>
                    <TableCell className="uppercase flex flex-col">
                      <h5 className="text-md font-bold mb-1">
                        {item?.facility?.name}
                      </h5>
                    </TableCell>
                    <TableCell className="uppercase max-w-[200px]">
                      {item?.facility?.description?.slice(0, 50)}...
                    </TableCell>
                    <TableCell className="uppercase">
                      {item?.user?.name}
                      {item?.user?.email}
                    </TableCell>
                    <TableCell className="uppercase">
                      {item?.facility?.location}
                    </TableCell>
                    <TableCell>{item?.date}</TableCell>
                    <TableCell>${item?.startTime}</TableCell>
                    <TableCell>${item?.endTime}</TableCell>
                    <TableCell>
                      <NavLink to={`/single-facility/${item?.facility?._id}`}>
                        <Button>View details</Button>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
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
    </>
  );
};

export default BookingManagement;
