/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigation } from "lucide-react";
import { useParams } from "react-router-dom";

import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { useCheckAvailabilityQuery } from "../../../Redux/api/booking.api";
import { useGetSingleFacilityQuery } from "../../../Redux/api/facilities.api";
import CommonHero from "../../shared/CommonHero/CommonHero";
import Loader from "../../shared/Loader/Loader";
import { DatePickerWithPresets } from "../Booking/BookingStepsItems/DatePickerCn";
import BookingFormDirect from "./BookingForm";

const SingleFacility = () => {
  const [dateForSlot, setDateForSlot] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );

  console.log("New date", moment(new Date()).format("YYYY-MM-DD"));

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
        <div className=" flex flex-col md:flex-row mx-auto rounded-lg lg:px-20">
          <div className="md:w-1/2 w-[100%]">
            <img
              src={facility?.data?.photoUrl}
              alt={facility?.data?.name}
              className="w-full h-full object-cover rounded-lg border-b-2 border-gray-200"
            />
          </div>
          <div className="p-6 space-y-4 md:w-1/2">
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

            <div className="lg:w-[50%] overflow-hidden">
              <div className="flex flex-col mb-2">
                <label htmlFor="slotDate" className="uppercase">
                  Date for available slot
                </label>

                <DatePickerWithPresets setDateForSlot={setDateForSlot} />
              </div>

              {availabilitySlot && (
                <div className="mb-5 bg-zinc-50  shadow-sm p-2 rounded-sm">
                  <h3 className="text-xl font-semibold">Available Slots</h3>
                  <div className="flex gap-3 flex-wrap">
                    {availabilitySlot.data.map((slot: any, i: number) => (
                      <div key={i} className="flex">
                        <p className="text-xs bg-green-300/20 p-1 rounded-md">
                          #{slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="min-w-full flex gap-10">
                <BookingFormDirect
                  dateForBook={dateForSlot}
                  facilityId={facility?.data?._id}
                  amount={facility?.data?.pricePerHour}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFacility;
