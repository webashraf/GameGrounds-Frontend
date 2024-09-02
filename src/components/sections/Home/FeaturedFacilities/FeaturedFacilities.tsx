/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { useGetFacilitiesQuery } from "../../../../Redux/api/baseApi";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";
import Loader from "../../../shared/Loader/Loader";
import { Button } from "../../../ui/button";

const FeaturedFacilities = () => {
  const { data: facilities, isFetching } = useGetFacilitiesQuery(undefined);

  if (isFetching) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="section-padding  md:px-10 lg:px-20">
      <CommonHeading
        title="Premium Facilities for Every Sport"
        subTitle="Hand picked venues for the ultimate sports experience"
      />
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-28 pb-20 md:pb-28 lg:pb-36 ">
          {facilities?.data?.slice(0, 6).map((item: any) => (
            <div
              style={{ backgroundImage: `url(${item.photoUrl})` }}
              key={item._id}
              className="group flex flex-col justify-start items-start gap-2 lg:w-[4 w-[92%] h-56 duration-500 relative rounded-lg   hover:-translate-y-2 hover:shadow-xl  shadow-xl backdrop-brightness-0  lg:mb-0 mb-10"
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
                </div>
              </div>
            </div>
          ))}
        </div>
        <NavLink to="/facilities">
          <Button className="px-10">See More</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default FeaturedFacilities;
