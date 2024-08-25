// import heroImg1 from "../../../../assets/hero/aerial-view-grass-field-hockey_23-2149668573.jpg";
// import heroImg2 from "../../../../assets/hero/futuristic-soccer-field-illustration_23-2151539709.jpg";
import heroImg3 from "../../../../assets/hero/pexels-johnsully-15203.jpg";
// import heroImg5 from "../../../../assets/hero/pexels-skitterphoto-60248.jpg";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div>
        <div
          className="text-white h-screen w-full flex justify-center
      items-center bg-[#10101053]"
        >
          <div className="max-w-[1140px] bg-black/20 backdrop-blur-sm p-10 shadow-2xl rounded-sm w-full mx-auto text-center">
            <h1 className="text-7xl font-serif uppercase">
              Discover Top-Rated Sports Venues Near You
            </h1>
            <p className="text-xl text-wrap">
              Find the perfect sports facility for your next game or event.
              Explore our curated selection of venues, complete with detailed
              descriptions, availability, and user reviews. Book your spot today
              and enjoy seamless access to high-quality sports environments.
            </p>
            <div className="mt-3">
              <h3 className="text-2xl font-serif uppercase">
                Service and Facility List:
              </h3>
              <ul className="grid grid-cols-2 text-left bg-b">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center mb-2 text-lg px-5"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-sky-500 mr-2 font-bold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button className="uppercase rounded-none px-20 h-[50px] mt-5 text-lg">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
