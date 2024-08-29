/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  useCancelBookingMutation,
  useGetAllBookingsByUserQuery,
} from "../../../../Redux/api/baseApi";
import { useToken } from "../../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../../Redux/hook";
import { verifyToken } from "../../../../utils/verifyToken";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
import { Button } from "../../../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

const MyBookings = () => {
  const token = useAppSelector(useToken);
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  const { data: myBookings } = useGetAllBookingsByUserQuery(user?.email);
  const [cancelBooking] = useCancelBookingMutation();

  const handleCancelBooking = async (id: string) => {
    const res = await cancelBooking(id).unwrap();
    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error("Failed to cancel book");
    }
  };

  return (
    <div className="w-[90%]">
      <div className="  relative h-[90vh] w-[1000px] overflow-auto  custom-scrollbar mx-auto section-padding ">
        <h2 className="text-7xl text-black uppercase mb-10">My Bookings</h2>
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
              <TableHead className=" text-white ">Action</TableHead>
            </TableRow>
          </TableHeader>

          {/* Map through the products and display each one in a table row */}
          <TableBody className="">
            {myBookings &&
              myBookings?.data?.map((item: any, i: number) => (
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
                  <TableCell className="text-right flex gap-2 items-center justify-center">
                    {/* Delete Button  */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div>
                          {/* <Trash2 /> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#ff0000"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-trash-2"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure to delete this item?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this item and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="btn-2 px-5 rounded-md"
                            onClick={() => handleCancelBooking(item._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <div className="">
                      <NavLink to="/user/details-booking">
                        <Button>Details</Button>
                      </NavLink>
                      <Popover>
                        <PopoverTrigger>Open</PopoverTrigger>
                        <PopoverContent align="start">
                          <div className="bg-gray-100 font-sans leading-normal tracking-normal w-[600px]">
                            <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
                              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                                Booking Details
                              </h1>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    Facility Name
                                  </h2>
                                  <p className="text-gray-500">
                                    [Facility Name]
                                  </p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    Description
                                  </h2>
                                  <p className="text-gray-500">[Description]</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    Location
                                  </h2>
                                  <p className="text-gray-500">[Location]</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    Date
                                  </h2>
                                  <p className="text-gray-500">[Date]</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    Start Time
                                  </h2>
                                  <p className="text-gray-500">[Start Time]</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                                  <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    End Time
                                  </h2>
                                  <p className="text-gray-500">[End Time]</p>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <a
                                  href="#"
                                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                                >
                                  Confirm Booking
                                </a>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyBookings;
