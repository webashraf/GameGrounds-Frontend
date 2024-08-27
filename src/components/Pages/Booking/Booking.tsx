import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TFacility } from "../../../types/gloval.types";
import CommonHero from "../../shared/CommonHero/CommonHero";
import "./Booking.css";
import AvailabilityChecker from "./BookingStepsItems/AvailabilityChecker";
import FacilityFeatureChecker from "./BookingStepsItems/FacilityFeatureChecker";

const Booking = () => {
  const [facilityItem, setFacilityItem] = useState<TFacility>(null);
  return (
    <div className="">
      <CommonHero
        title="Booking"
        img="https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />

      {/* Booking Form */}
      <div>
        <h2 className="uppercase text-3xl">Booking Form</h2>
      </div>

      {/* Payment Integration */}
      <div>
        <h2 className="uppercase text-3xl">Payment Integration</h2>
      </div>
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
            </div>

            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          </div>

          {/* Right div (Input Form) */}
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
                <SwiperSlide className="shadow-xl felx flex-col">
                  <h2 className="text-3xl uppercase">
                    Select a facility and check it's feature
                  </h2>
                  <FacilityFeatureChecker setFacilityItem={setFacilityItem} />
                  {facilityItem && (
                    <div className="border-2 border-dashed  min-h-[100px] text-left flex justify-center items-center gap-10 p-5 ">
                      <div className="r-10">
                        <h2 className="text-2xl font-serif">
                          {facilityItem?.name}
                        </h2>
                        <p className="text-[#494949] text-sm mb-2">
                          {facilityItem?.description}
                        </p>
                        <p>
                          <span className="font-serif">Price:</span> $
                          {facilityItem?.pricePerHour}
                        </p>
                        <p>
                          <span className="font-serif">Location:</span>{" "}
                          {facilityItem?.location}
                        </p>
                      </div>
                      <div className="h-full w-[200px]">
                        <img src={facilityItem?.photoUrl} alt="" />
                      </div>
                    </div>
                  )}
                </SwiperSlide>

                {/* Slide-2 Availability Checker */}
                <SwiperSlide className="shadow-xl ">
                  <AvailabilityChecker />
                </SwiperSlide>

                <SwiperSlide className="shadow-xl ">
                  <div className="p-20 text-left ">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl uppercase">Booking Form</h2>
                        <p className="text-[#494949] italic">Content</p>
                      </div>
                    </div>
                    <div>Details Info</div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="shadow-xl ">
                  <div className="p-20 text-left ">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-3xl uppercase">
                          Payment Integration
                        </h2>
                        <p className="text-[#494949] italic">Content</p>
                      </div>
                    </div>
                    <div>Details Info</div>
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
