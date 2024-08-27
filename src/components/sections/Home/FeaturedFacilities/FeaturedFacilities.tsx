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
    <div className="section-padding">
      <CommonHeading
        title="Premium Facilities for Every Sport"
        subTitle="Handpicked venues for the ultimate sports experience"
      />
      <div className="grid grid-cols-3 gap-28 pb-36">
        {facilities?.data?.map((item) => (
          <CommonCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedFacilities;
