import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroImg3 from "../../../../assets/hero/pexels-johnsully-15203.jpg";
import { Button } from "../../../ui/button";

const Hero = () => {
  const items = [
    "Wide range of sports facilities including football fields, tennis courts, basketball courts, and more",
    "Real-time availability and instant booking confirmation",
    "User reviews and ratings for each venue",
    "Flexible booking options for hourly or daily reservations",
    "Detailed descriptions and high-quality images of each facility",
    "Secure online payment options",
    "24/7 customer support to assist with any booking queries",
    "Cancellation and rescheduling options available",
  ];

  return (
    <div
      style={{ backgroundImage: `url(${heroImg3})` }}
      className="h-[100vh] w-full bg-no-repeat bg-cover bg-[100%]"
    >
      <>
        <div className="text-white lg:h-screen h-[100vh] w-full flex justify-center items-center bg-[#10101053] lg:pt-20">
          <div className="max-w-[1140px] bg-black/20 backdrop-blur-sm p-5 md:p-10 shadow-2xl rounded-sm w-full mx-auto text-center lg:h-auto h-screen lg:pt-0 pt-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif uppercase">
              Discover Top-Rated Sports Venues Near You
            </h1>
            <p className="text-lg md:text-xl mt-4 md:mt-6">
              Find the perfect sports facility for your next game or event.
              Explore our curated selection of venues, complete with detailed
              descriptions, availability, and user reviews. Book your spot today
              and enjoy seamless access to high-quality sports environments.
            </p>
            <div className="mt-6">
              <h3 className="text-xl md:text-2xl font-serif uppercase">
                Service and Facility List:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 text-left bg-b mt-4">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center mb-2 text-base md:text-lg px-5"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-sky-500 mr-2 font-bold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="uppercase rounded-none px-10 md:px-20 h-[40px] md:h-[50px] mt-5 text-base md:text-lg bg-[#101010a0] backdrop-blur-md">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Hero;
