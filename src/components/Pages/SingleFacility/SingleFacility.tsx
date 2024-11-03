/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigation } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

import { useState } from "react";
import { toast } from "sonner";
import { useCheckAvailabilityQuery } from "../../../Redux/api/booking.api";
import { useGetSingleFacilityQuery } from "../../../Redux/api/facilities.api";
import CommonHero from "../../shared/CommonHero/CommonHero";
import Loader from "../../shared/Loader/Loader";
import { Button } from "../../ui/button";
import { DatePickerWithPresets } from "../Booking/BookingStepsItems/DatePickerCn";
import BookingFormDirect from "./BookingForm";

const SingleFacility = () => {
  const [dateForSlot, setDateForSlot] = useState<string>("");

  const { id } = useParams<{ id: string }>();
  const { data: facility, isFetching } = useGetSingleFacilityQuery(id);

  const { data: availabilitySlot, error: availabilityError } =
    useCheckAvailabilityQuery(
      `?date=${dateForSlot ?? ""}&facility=${id ?? ""}`,
      {
        skip: !dateForSlot,
      }
    );
  if (availabilityError) {
    toast.error(
      "data" in availabilityError
        ? (availabilityError as any)?.data?.message
        : "Something went wrong."
    );
  }

  if (isFetching) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!facility?.data) {
    return <div className="text-center py-8">Facility not found</div>;
  }

  return (
    <div className="mx-auto px-4  py-8">
      <CommonHero title="Facility Details" />
      {isFetching ? (
        <div className="h-[60vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-[50 flex mx-auto rounded-lg lg:px-20">
          <div className="w-1/2">
            <img
              src={facility?.data?.photoUrl}
              alt={facility?.data?.name}
              className="w-full h-full object-cover rounded-t-lg border-b-2 border-gray-200"
            />
          </div>
          <div className="p-6 space-y-4">
            <h1 className="text-4xl uppercase font-bold mb-2">
              {facility?.data?.name}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              {facility?.data?.description}
            </p>

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Navigation className="text-blue-500" />
              <span className="text-lg">{facility?.data?.location}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-10">
              Price:{" "}
              <span className="text-blue-600">
                ${facility?.data?.pricePerHour}
              </span>{" "}
              per hour
            </p>

            <div>
              <div>
                <div className="flex flex-col">
                  <label htmlFor="slotDate" className="uppercase">
                    Date for available slot
                  </label>

                  <DatePickerWithPresets setDateForSlot={setDateForSlot} />
                </div>

                {availabilitySlot && (
                  <div className="mt-10">
                    <h3 className="text-xl font-semibold">Available Slots</h3>
                    <div className="flex gap-5 flex-wrap">
                      {availabilitySlot.data.map((slot: any, i: number) => (
                        <div key={i} className="flex">
                          <p className="text-xs ">
                            #{slot.startTime} - {slot.endTime}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-10">
                <div className="bg-white rounded-xl shadow-lg p-6  flex gap-10">
                  <BookingFormDirect
                    dateForBook={dateForSlot}
                    facilityId={facility?.data?._id}
                  />
                </div>
              </div>
            </div>
            <NavLink to="/booking" className="block mt-8">
              <Button className=" py-3 text-white  ">Book Now</Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFacility;
