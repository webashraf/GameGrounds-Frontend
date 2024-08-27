import { ArrowLeft, ArrowRight } from "lucide-react";
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

      <div className="swiper-container w-[50%] mx-auto py-10">
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
                  <h2 className="text-2xl font-serif">{facilityItem?.name}</h2>
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
                  <h2 className="text-3xl uppercase">Payment Integration</h2>
                  <p className="text-[#494949] italic">Content</p>
                </div>
              </div>
              <div>Details Info</div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="flex gap-2 justify-end mr-24">
          <div className="custom-prev bg-black h-20 w-16 flex items-center justify-center hover:scale-[1.2] transition-transform duration-300 ease-in-out">
            <ArrowLeft className="text-white scale-[1.3]" />
          </div>
          <div className="custom-next bg-black h-20 w-16 flex items-center justify-center hover:scale-[1.2] transition-transform duration-300 ease-in-out">
            <ArrowRight className="text-white scale-[1.3]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
