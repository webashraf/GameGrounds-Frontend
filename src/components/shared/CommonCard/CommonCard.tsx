/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { Button } from "../../ui/button";

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
        <NavLink to={`/single-facility/${item._id}`}>
          <Button className="hover:  text-white mt-14 p-2 px-6 absolute bottom-5 left-6">
            View Details
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default CommonCard;
