/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetFacilitiesQuery } from "../../../../Redux/api/baseApi";
import CommonCard from "../../../shared/CommonCard/CommonCard";
import CommonHeading from "../../../shared/CommonHeading/CommonHeading";

const FeaturedFacilities = () => {
  const {
    data: facilities,
    error,
    isLoading,
    isFetching,
  } = useGetFacilitiesQuery(undefined);
  console.log({ facilities, error, isLoading, isFetching });

  return (
    <div className="section-padding px-5 md:px-10 lg:px-20">
      <CommonHeading
        title="Premium Facilities for Every Sport"
        subTitle="Handpicked venues for the ultimate sports experience"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-28 pb-20 md:pb-28 lg:pb-36 ">
        {facilities?.data?.map((item: any) => (
          <CommonCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedFacilities;
