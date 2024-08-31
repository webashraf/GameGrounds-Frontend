/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBookingsQuery } from "../../../../Redux/api/baseApi";
import Loader from "../../../shared/Loader/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

const BookingManagement = () => {
  const { data: bookings, isFetching } = useGetAllBookingsQuery(undefined);
  if (isFetching) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="lg:mt-10 mt-32 relative h-[90vh] w-[90%] overflow-auto custom-scrollbar mx-auto  ">
        <h2 className="text-6xl text-black uppercase mb-10">
          Booking Management
        </h2>
        <Table className="">
          <TableHeader className="h-[100px] bg-black/80 shadow-2xl backdrop-blur-lg rounded-md ">
            <TableRow className="w-full ">
              <TableHead className=" text-white">Serial</TableHead>
              <TableHead className="text-white">Facility Name</TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-white">Location</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Start Time</TableHead>
              <TableHead className=" text-white ">End Time</TableHead>
            </TableRow>
          </TableHeader>

          {/* Map through the products and display each one in a table row */}
          <TableBody className="">
            {bookings &&
              bookings?.data?.map((item: any, i: number) => (
                <TableRow key={item._id} className="">
                  <TableCell className="font-medium w-[3%]">{i}</TableCell>
                  <TableCell className="uppercase flex flex-col">
                    <h5 className="text-md font-bold mb-1">
                      {item.facility.name}
                    </h5>
                  </TableCell>
                  <TableCell className="uppercase">
                    {item.facility.description}
                  </TableCell>
                  <TableCell className="uppercase">
                    {item.facility.location}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>${item.startTime}</TableCell>
                  <TableCell>${item.endTime}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BookingManagement;
