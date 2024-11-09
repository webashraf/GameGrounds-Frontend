/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";
import useUser from "../../../../hooks/userHook";
import {
  useCancelBookingMutation,
  useGetAllBookingsByUserQuery,
} from "../../../../Redux/api/booking.api";
import Loader from "../../../shared/Loader/Loader";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

const MyBookings = () => {
 
  const user = useUser();

  const { data: myBookings, isFetching } = useGetAllBookingsByUserQuery(
    user?.email
  );
  const [cancelBooking] = useCancelBookingMutation();

  const handleCancelBooking = async (id: string) => {
    try {
      const res = await cancelBooking(id).unwrap();
      toast[res.success ? "success" : "error"](
        res.message || "Failed to cancel booking"
      );
    } catch (error) {
      toast.error("An error occurred while canceling the booking.");
    }
  };

  if (isFetching) {
    return (
      <div className="h-[90vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="lg:w-[95%] mx-auto lg:pt-0 pt-10">
      <div className="relative  w-full px-5 mx-auto section-padding mt-10">
        <h2 className="lg:text-6xl text-4xl text-black uppercase mb-10">
          My Bookings
        </h2>
        <Table>
          <TableHeader className="h-[100px] bg-black/80 shadow-2xl rounded-md">
            <TableRow>
              <TableHead className="text-white">Serial</TableHead>
              <TableHead className="text-white">Facility Name</TableHead>
              <TableHead className="text-white">Location</TableHead>
              <TableHead className="text-white">Cost</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Start Time</TableHead>
              <TableHead className="text-white">End Time</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myBookings?.data?.map((item: any, i: number) => (
              <TableRow key={item._id} className="bg-zinc-200">
                <TableCell className="font-medium w-[3%]">{i + 1}</TableCell>
                <TableCell className="uppercase">
                  {item.facility.name}
                </TableCell>
                <TableCell className="uppercase">
                  {item.facility.location}
                </TableCell>
                <TableCell className="uppercase">
                  ${item.payableAmount}
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
                <TableCell className="text-right flex gap-2 items-center justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="ghost">Cancel</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Cancellation
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to cancel this booking? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleCancelBooking(item._id)}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button>Details</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Booking Details</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div>
                            <img
                              src={item.facility.photoUrl}
                              className="w-full h-[200px] object-cover"
                              alt="Facility"
                            />
                            <div className="p-6 bg-gray-50">
                              <h2 className="text-xl font-semibold">
                                {item.facility.name}
                              </h2>
                              <p>{item.facility.description}</p>
                              <p>
                                <strong>Amount:</strong> ${item.payableAmount}
                              </p>
                              <p>
                                <strong>Location:</strong>{" "}
                                {item.facility.location}
                              </p>
                              <p>
                                <strong>Booking Date:</strong> {item.date}
                              </p>
                              <p>
                                <strong>Start Time:</strong> {item.startTime}
                              </p>
                              <p>
                                <strong>End Time:</strong> {item.endTime}
                              </p>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                    </AlertDialogContent>
                  </AlertDialog>
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
