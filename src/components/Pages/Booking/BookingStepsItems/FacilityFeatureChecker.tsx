/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TFacility } from "../../../../types/gloval.types";

const FacilityFeatureChecker = ({ setFacilityItem }: any) => {
  const facilities = [
    {
      _id: "66ccc0a163c1483f70b8615d",
      name: "Tennis Court",
      description: "Updated outdoor tennis court with synthetic surface.",
      pricePerHour: 35,
      location: "789 Sports Ave, Springfield",
      isDeleted: false,
      __v: 0,
      photoUrl:
        "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      _id: "66ccc14763c1483f70b86161",
      name: "Basketball Court 09",
      description: "Indoor basketball court with wooden flooring.",
      pricePerHour: 50,
      location: "789 Athlete St, Springfield",
      isDeleted: false,
      __v: 0,
      photoUrl:
        "https://images.pexels.com/photos/2891884/pexels-photo-2891884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  const [selectedFacility, setSelectedFacility] = useState("");

  const handleFacilityFeature = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setSelectedFacility(selectedId);

    const matchedFacility = facilities.find(
      (facility) => facility._id === selectedId
    );

    setFacilityItem(matchedFacility as TFacility);

    console.log({ matchedFacility });
  };
  return (
    <div className=" text-left ">
      <div className="max-w-md mx-auto mb-3 bg-white rounded-lg  mt-5">
        <select
          value={selectedFacility}
          onChange={handleFacilityFeature}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a facility
          </option>
          {facilities.map((facility) => (
            <option key={facility._id} value={facility._id}>
              {facility.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FacilityFeatureChecker;
