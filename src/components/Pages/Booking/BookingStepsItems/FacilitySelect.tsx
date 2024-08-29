/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetFacilitiesQuery } from "../../../../Redux/api/baseApi";
import { TFacility } from "../../../../types/gloval.types";

const FacilitySelect = ({ setFacility }: any) => {
  const { data: facilities } = useGetFacilitiesQuery(undefined);
  console.log(facilities);

  const handleFacilityFeature = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;

    const matchedFacility = facilities?.data?.find(
      (facility: TFacility) => facility._id === selectedId
    );

    setFacility({ ...matchedFacility });

    console.log({ ...matchedFacility });
  };
  return (
    <div className=" text-left ">
      <div className="max-w-md mx-auto mb-3 bg-white rounded-lg  mt-5">
        <select
          // value={selectedFacility}
          onChange={handleFacilityFeature}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a facility
          </option>
          {facilities?.data.map((facility: TFacility) => (
            <option key={facility._id} value={facility._id}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FacilitySelect;
