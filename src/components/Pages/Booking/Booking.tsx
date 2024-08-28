/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  useCheckAvailabilityQuery,
  useGetFacilitiesQuery,
} from "../../../Redux/api/baseApi";
import { TFacility } from "../../../types/gloval.types";
import CommonHero from "../../shared/CommonHero/CommonHero";
import "./Booking.css";
import AvailabilityChecker from "./BookingStepsItems/AvailabilityChecker";
import BookingForm from "./BookingStepsItems/BookingForm";

const Booking = () => {
  const { data: facilities } = useGetFacilitiesQuery(undefined);
  const [query, setQuery] = useState<any>(null);
  console.log(query);
  const queryString = `${query?.date}&facility=${query?.facility}`;
  const [facilityForFeature, setFacilityForFeature] = useState<TFacility>(null);

  // console.log(facilities);
  console.log("facilityForFeature", facilityForFeature);
  const handleFacilityFeature = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;

    const matchedFacility = facilities?.data?.find(
      (facility: any) => facility._id === selectedId
    );

    setFacilityForFeature({ ...matchedFacility });

    console.log({ ...matchedFacility });
  };

  const { data: availabilitySlot } = useCheckAvailabilityQuery(queryString, {
    skip: !query,
  });

  // console.log(availabilitySlot?.data);

  return (
    <div className="">
      <CommonHero
        title="Booking"
        img="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Display a booking summary */}
      <div>
        <h2 className="uppercase text-3xl">Display a booking summary</h2>
      </div>
      <div>
        <div className="flex h-[ bg-gray-50">
          <div className="flex-1 w-1/2 bg-white rounded-xl shadow-lg mx-6 my-8 p-10 border border-gray-300 relative overflow-hidden">
            <div className="absolute top-4 left-4 right-4 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
            <div className="absolute bottom-4 left-4 right-4 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>

            {/* Text Content */}
            <div className="relative z-10">
              <p className="text-gray-700 text-center text-2xl font-serif font-semibold">
                Your Service Features Will Appear Here
              </p>
              {/* Step-1 Facility feature data */}
              {facilityForFeature && (
                <div className="border-2 border-dashed  min-h-[100px] text-left flex justify-center items-center gap-10 p-5 ">
                  <div className="r-10">
                    <h2 className="text-2xl font-serif">
                      {facilityForFeature?.name}
                    </h2>
                    <p className="text-[#494949] text-sm mb-2">
                      {facilityForFeature?.description}
                    </p>
                    <p>
                      <span className="font-serif">Price:</span> $
                      {facilityForFeature?.pricePerHour}
                    </p>
                    <p>
                      <span className="font-serif">Location:</span>{" "}
                      {facilityForFeature?.location}
                    </p>
                  </div>
                  <div className="h-full w-[200px]">
                    <img src={facilityForFeature?.photoUrl} alt="" />
                  </div>
                </div>
              )}

              {availabilitySlot && (
                <div className="flex flex-col items-center pt-10 text-left">
                  <h2 className="uppercase text-xl text-left  border-b border-black mb-3 ">
                    Available slot on {query?.date}
                  </h2>
                  {availabilitySlot?.data?.map((item, i) => (
                    <h2 key={i} className="uppercase text-xl text-left">
                      {item.startTime} - {item.endTime}
                    </h2>
                  ))}
                </div>
              )}
            </div>

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          </div>

          {/* Right div */}
          <div className="flex-1 mx-6 my-8 w-1/2">
            <div className="swiper-container mx-auto py-10 shadow-xl rounded- bg-white">
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                speed={300}
                allowTouchMove={false}
                pagination={{ clickable: false }}
              >
                {/* Slide-1 Feature Facilities */}
                <SwiperSlide className="shadow-xl flex flex-col  ">
                  <h2 className="text-3xl uppercase mb-5">
                    Select a facility and check it's feature
                  </h2>
                  <select
                    onChange={handleFacilityFeature}
                    className=" px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[400px]"
                  >
                    <option value="" disabled>
                      Select a facility
                    </option>
                    {facilities?.data.map((facility: any) => (
                      <option key={facility._id} value={facility._id}>
                        {facility.name}
                      </option>
                    ))}
                  </select>
                </SwiperSlide>

                {/* Slide-2 Availability Checker */}
                <SwiperSlide className="shadow-xl ">
                  <AvailabilityChecker setQuery={setQuery} />
                </SwiperSlide>

                {/* Slide-3 Booking Form */}
                <SwiperSlide className="shadow-xl ">
                  <div className="p-20 text-left ">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl uppercase mb-2">
                          Booking Form
                        </h2>
                      </div>
                    </div>
                    <div>
                      <BookingForm />
                    </div>
                  </div>
                </SwiperSlide>

               
              </Swiper>
              <div className="flex gap-2 justify-between px-5">
                <div className="custom-prev bg-black h-16 w-32 flex items-center justify-center hover:bg-slate-800 transition-transform duration-300 ease-in-out">
                  <p className="text-white"> Prev</p>
                </div>
                <div className="custom-next bg-black h-16 w-32 flex items-center justify-center hover:bg-slate-800 transition-transform duration-300 ease-in-out">
                  <p className="text-white">Next</p>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
