/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateABookMutation } from "../../../../Redux/api/booking.api";
import { useGetFacilitiesQuery } from "../../../../Redux/api/facilities.api";
import { useToken } from "../../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../../Redux/hook";
import { TFacility, TFacilitySelect } from "../../../../types/gloval.types";
import { verifyToken } from "../../../../utils/verifyToken";
import { Button } from "../../../ui/button";

interface IBookingFormInput {
  date: string;
  facility: string;
  startTime: string;
  endTime: string;
}

const BookingForm = () => {
  const { data: facilities, error: facilitiesFetchError } =
    useGetFacilitiesQuery(undefined);

  const [createABook] = useCreateABookMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IBookingFormInput>();

  const [bookError, setBookError] = useState("");
  const [processBook, setProcessBook] = useState("");
  const token = useAppSelector(useToken);
  let user: any;

  if (token) {
    user = verifyToken(token);
  }
  if (facilitiesFetchError) {
    toast.error("Failed to fetch facilities.");
  }

  // * Handle Booking
  const handleBooking = async (data: IBookingFormInput) => {
    if (!user || user?.role !== "user") {
      setBookError("First login as a user then book your slot");
      toast.error("First login as a user then book your slot");
      return;
    }

    if (data.startTime > data.endTime) {
      setBookError(` Please set the time slot correctly `);
      toast.error("Please set the time slot correctly");
      return;
    }

    setProcessBook("Processing...");
    setBookError("");
    const amount = facilities?.data?.find(
      (facility: TFacility) => facility._id === data.facility
    )?.pricePerHour;

    const bookingInfo = { ...data, payableAmount: amount };
    console.log(bookingInfo);
    try {
      const res = await createABook(bookingInfo).unwrap();
      console.log(res);
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
      console.log(err);
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
        <div className="mb-3">
          <Controller
            name="date"
            control={control}
            defaultValue=""
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? "border-red-500" : ""
                  }`}
                  type="date"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="facility"
            control={control}
            defaultValue=""
            rules={{ required: "Facility is required" }}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.facility ? "border-red-500" : ""
                  }`}
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
                {errors.facility && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.facility.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="startTime"
            control={control}
            defaultValue=""
            rules={{ required: "Start time is required" }}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.startTime ? "border-red-500" : ""
                  }`}
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
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="mb-3">
          <Controller
            name="endTime"
            control={control}
            defaultValue=""
            rules={{ required: "End time is required" }}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.endTime ? "border-red-500" : ""
                  }`}
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
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <Button className="w-full bg-black" type="submit">
          {processBook ? processBook : "Book Now"}
        </Button>
      </form>
      <p className="text-red-600 py-2">{bookError}</p>
    </div>
  );
};

export default BookingForm;
