/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

import { useGetFacilitiesQuery } from "../../../../Redux/api/facilities.api";
import CommonCard from "../../../shared/CommonCard/CommonCard";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";
import LoadingSkeleton from "../../../shared/Loader/LoadingSkeleton";
import { Button } from "../../../ui/button";

const FeaturedFacilities = () => {
  const {
    data: facilities,
    isLoading,
    error,
  } = useGetFacilitiesQuery(undefined);
  console.log("Facilities Feature: ", facilities);
  if (error) {
    toast.error("Failed to fetch facilities.");
  }

  return (
    <div className="section-padding  md:px-10 lg:px-20">
      <CommonHeading
        title="Premium Facilities for Every Sport"
        subTitle="Hand picked venues for the ultimate sports experience"
      />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-28 pb-20 md:pb-28 lg:pb-36 ">
            {facilities?.data?.slice(0, 6).map((item: any) => (
              <CommonCard item={item} key={item._id} />
            ))}
          </div>
          <NavLink to="/facilities">
            <Button className="px-10">See More</Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default FeaturedFacilities;
