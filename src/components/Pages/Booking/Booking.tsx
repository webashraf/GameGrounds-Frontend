/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import {
  useCheckAvailabilityQuery,
  useGetFacilitiesQuery,
} from "../../../Redux/api/baseApi";
import { TFacility } from "../../../types/gloval.types";
import CommonHero from "../../shared/CommonHero/CommonHero";
import "./Booking.css";
import AvailabilityChecker from "./BookingStepsItems/AvailabilityChecker";
import BookingForm from "./BookingStepsItems/BookingForm";

interface Query {
  date?: string;
  facility?: string;
}

const Booking = () => {
  const { data: facilities, error: facilitiesFetchError } =
    useGetFacilitiesQuery(undefined);
  const [query, setQuery] = useState<Query | null>(null);

  if (facilitiesFetchError) {
    toast.error("Failed to fetch facilities.");
  }

  const [facilityForFeature, setFacilityForFeature] =
    useState<TFacility | null>(null);

  const handleFacilityFeature = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;

    const matchedFacility = facilities?.data.find(
      (facility: TFacility) => facility._id === selectedId
    );

    setFacilityForFeature(matchedFacility || null);
  };

  const { data: availabilitySlot, error: availabilityError } =
    useCheckAvailabilityQuery(
      `?date=${query?.date ?? ""}&facility=${query?.facility ?? ""}`,
      {
        skip: !query,
      }
    );

  if (availabilityError) {
    toast.error(
      "data" in availabilityError
        ? (availabilityError as any)?.data?.message
        : "Something went wrong."
    );
  }

  return (
    <>
      <CommonHero
        title="Booking"
        img="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-around gap-5">
          {/* Step 1: Facility Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10 lg:w-1/2">
            <h2 className="text-2xl font-bold mb-5">
              Step 1: Select a Facility
            </h2>
            <select
              onChange={handleFacilityFeature}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-full"
            >
              <option value="">Select a facility</option>
              {facilities?.data.map((facility: TFacility) => (
                <option key={facility._id} value={facility._id}>
                  {facility.name}
                </option>
              ))}
            </select>
            {facilityForFeature && (
              <div className="mt-10 p-5 border-2 border-dashed flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    {facilityForFeature.name}
                  </h3>
                  <p className="text-gray-600">
                    {facilityForFeature.description}
                  </p>
                  <p className="mt-2">
                    <strong>Price:</strong> ${facilityForFeature.pricePerHour}
                  </p>
                  <p>
                    <strong>Location:</strong> {facilityForFeature.location}
                  </p>
                </div>
                <div className="w-32">
                  <img
                    src={facilityForFeature.photoUrl}
                    alt={facilityForFeature.name}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Check Availability */}
          <div className="lg:w-1/2 bg-white rounded-xl shadow-lg p-6 mb-10">
            <h2 className="text-2xl font-bold mb-5">
              Step 2: Check Availability
            </h2>
            <AvailabilityChecker setQuery={setQuery} />
            {availabilitySlot && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold">
                  Available Slots on {query?.date}
                </h3>
                {availabilitySlot.data.map((slot: any, i: number) => (
                  <p key={i} className="text-lg">
                    {slot.startTime} - {slot.endTime}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-5">
            Step 3: Complete Your Booking Here
          </h2>
          <BookingForm />
        </div>
      </div>
    </>
  );
};

export default Booking;
