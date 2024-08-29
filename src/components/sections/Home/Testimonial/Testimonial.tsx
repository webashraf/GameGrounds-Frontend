import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";
import "./testimonial.css";

const Testimonial = () => {
  const testimonialsData = [
    {
      id: "1",
      name: "John Doe",
      position: "Professional Basketball Player",
      photoUrl:
        "https://images.pexels.com/photos/1819483/pexels-photo-1819483.jpeg?auto=compress&cs=tinysrgb&w=600",
      feedback:
        "Booking sports facilities through this platform has been a game-changer for my training. The process is smooth, and the facilities are top-notch!",
    },
    {
      id: "2",
      name: "Jane Smith",
      position: "Fitness Enthusiast",
      photoUrl:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
      feedback:
        "I love how easy it is to book my favorite gym sessions. The user interface is intuitive, and the booking process is quick and hassle-free.",
    },
    {
      id: "3",
      name: "Michael Brown",
      position: "Local Sports Coach",
      photoUrl:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600",
      feedback:
        "This platform has significantly simplified the booking process for our team. It's incredibly efficient, and the support team is always helpful.",
    },
    {
      id: "4",
      name: "Emily Davis",
      position: "Amateur Runner",
      photoUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      feedback:
        "I appreciate the variety of facilities available for booking. The website is user-friendly, and I've never had any issues with my reservations.",
    },
    {
      id: "5",
      name: "Chris Wilson",
      position: "Gym Owner",
      photoUrl:
        "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=600",
      feedback:
        "As a facility owner, this platform has helped me manage bookings effortlessly. The integration with our existing systems was seamless, and the exposure has been great.",
    },
  ];

  return (
    <div className="section-padding">
      <div>
        <CommonHeading
          title="Client Feedback"
          subTitle="Read the stories of our delighted customers"
        />
        <div className="swiper-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            // slidesPerView={3}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop={true}
            speed={400}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              640: {
                // Mobile devices
                slidesPerView: 1,
              },
              768: {
                // Tablets
                slidesPerView: 1,
              },
              1024: {
                // Desktop
                slidesPerView: 2,
              },
              1200: {
                // Large desktop
                slidesPerView: 3,
              },
            }}
          >
            {testimonialsData.map((info, i) => (
              <SwiperSlide key={i} virtualIndex={i} className="shadow-xl">
                <div className="p-20 text-left">
                  <div className="flex justify-between items-end">
                    <div>
                      <h2 className="text-3xl uppercase">{info.name}</h2>
                      <p className="text-[#494949] italic">{info.position}</p>
                    </div>
                    <div className="border-dashed mx-auto w-28 h-32 rounded-sm border-black overflow-hidden bg-slate-800">
                      <img
                        src={info.photoUrl}
                        className="w-full h-full object-cover"
                        alt={`Photo of ${info.name}`}
                      />
                    </div>
                  </div>
                  <p className="mt-5">{info.feedback}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex gap-2 lg:justify-end justify-center lg:mr-24 ">
            <div className="custom-prev bg-black h-20 w-16 flex items-center justify-center hover:scale-[1.2] transition-transform duration-300 ease-in-out">
              <ArrowLeft className="text-white scale-[1.3]" />
            </div>
            <div className="custom-next bg-black h-20 w-16 flex items-center justify-center hover:scale-[1.2] transition-transform duration-300 ease-in-out">
              <ArrowRight className="text-white scale-[1.3]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
