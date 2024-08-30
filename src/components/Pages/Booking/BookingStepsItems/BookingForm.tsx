/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useCreateABookMutation,
  useGetFacilitiesQuery,
} from "../../../../Redux/api/baseApi";
import { TFacility, TFacilitySelect } from "../../../../types/gloval.types";
import { Button } from "../../../ui/button";

interface IBookingFormInput {
  date: string;
  facility: string;
  startTime: string;
  endTime: string;
}

const BookingForm = () => {
  const { data: facilities } = useGetFacilitiesQuery(undefined);
  const [createABook] = useCreateABookMutation();
  const { handleSubmit, control } = useForm<IBookingFormInput>();
  const [bookError, setBookError] = useState("");

  const [processBook, setProcessBook] = useState("");

  // * Handle Booking
  const handleBooking = async (data: IBookingFormInput) => {
    setProcessBook("Processing...");
    setBookError("");
    const amount = facilities?.data?.find(
      (facility: TFacility) => facility._id === data.facility
    )?.pricePerHour;
    const bookingInfo = { ...data, payableAmount: amount };
    try {
      const res = await createABook(bookingInfo).unwrap();
      if (res?.success) {
        toast.success("Going to payment page..");
        window.location.href = res.data.paymentSession.payment_url;
      } else if (res?.error) {
        setProcessBook("");
        setBookError(
          res.error?.data.message ? res.error?.data.message : "Failed to book"
        );
        toast.error(
          res.error?.data.message ? res.error?.data.message : "Failed to book"
        );
      }
    } catch (err) {
      setProcessBook("");
      setBookError(
        (err as any).status ? (err as any).data.message : "Failed to book"
      );
      toast.error(
        (err as any).status ? (err as any).data.message : "Failed to book"
      );
    }
  };

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleBooking)}>
        <Controller
          name="date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              type="date"
              required
            />
          )}
        />

        <Controller
          name="facility"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              required
            >
              <option value="" disabled>
                Select a facility
              </option>
              {facilities?.data.map((facility: TFacilitySelect) => (
                <option key={facility._id} value={facility._id}>
                  {facility.name}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="startTime"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              required
            >
              <option value="" disabled>
                Select Start Time
              </option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          )}
        />

        <Controller
          name="endTime"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select
              {...field}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              required
            >
              <option value="" disabled>
                Select End Time
              </option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          )}
        />

        <Button className="w-full" type="submit">
          {processBook ? processBook : "Book Now"}
        </Button>
      </form>
      <p className="text-red-600 py-2">{bookError}</p>
    </div>
  );
};

export default BookingForm;
