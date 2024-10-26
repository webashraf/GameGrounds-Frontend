import { Navigation } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

import { useGetSingleFacilityQuery } from "../../../Redux/api/facilities.api";
import CommonHero from "../../shared/CommonHero/CommonHero";
import Loader from "../../shared/Loader/Loader";
import { Button } from "../../ui/button";

const SingleFacility = () => {
  const { id } = useParams<{ id: string }>(); // Ensure type is correctly set
  const { data: facility, isFetching } = useGetSingleFacilityQuery(id);

  if (isFetching) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!facility?.data) {
    return <div className="text-center py-8">Facility not found</div>;
  }

  return (
    <div className="mx-auto px-4 py-8">
      <CommonHero title="Facility Details" />
      {isFetching ? (
        <div className="h-[60vh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="w-[50%] mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={facility?.data?.photoUrl}
            alt={facility?.data?.name}
            className="w-full h-80 object-cover rounded-t-lg border-b-2 border-gray-200"
          />
          <div className="p-6 space-y-4">
            <h1 className="text-4xl uppercase font-bold mb-2">
              {facility?.data?.name}
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              {facility?.data?.description}
            </p>

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <Navigation className="text-blue-500" />
              <span className="text-lg">{facility?.data?.location}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-10">
              Price:{" "}
              <span className="text-blue-600">
                ${facility?.data?.pricePerHour}
              </span>{" "}
              per hour
            </p>
            <NavLink to="/booking" className="block mt-8">
              <Button className=" py-3 text-white  ">Book Now</Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleFacility;
