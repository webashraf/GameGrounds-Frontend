/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/utils";
import AnimatedShinyText from "../../ui/animated-button";

const CommonCard = ({ item }: any) => {
  return (
    <div
      style={{ backgroundImage: `url(${item.photoUrl})` }}
      key={item._id}
      className="group flex flex-col justify-start items-start gap-2 lg:w-[4 w-[92%] h-64 duration-500 relative rounded-lg   hover:-translate-y-2 hover:shadow-xl  shadow-xl backdrop-brightness-0  lg:mb-0 mb-10"
    >
      <div className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-1/2 h-1/2 rounded-lg  overflow-hidden z-50">
        <img
          src={item.photoUrl}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      <div className="bg-black/30 backdrop-blur-sm h-full w-full p-6 rounded-lg relative">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white font-serif">
            {item.name}
          </h2>
          <p className="text-gray-200 line-clamp-3">
            {item.description.slice(0, 70)}
          </p>
          <p className="text-gray-200 line-clamp-3 mt-2 text-md">
            Price: ${item.pricePerHour}
          </p>
        </div>
        {/* <NavLink to={`/booking`}>
          <Button className="hover:  text-white mt-14 p-2 px-6 absolute bottom-5 left-6">
            View Details
          </Button>
        </NavLink> */}
        <NavLink
          to={`/single-facility/${item._id}`}
          className="hover:  text-white mt-14 p-2 px-6 absolute bottom-5 left-0"
        >
          <div className="z-10 flex min-h- items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Book Now</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>

          {/* <Button className="hover:">Book Now</Button> */}
        </NavLink>
      </div>
    </div>
  );
};

export default CommonCard;
