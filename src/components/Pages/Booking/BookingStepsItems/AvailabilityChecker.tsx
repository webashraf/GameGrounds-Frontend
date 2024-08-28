/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useState } from "react";
import { TFacility } from "../../../../types/gloval.types";
import { Button } from "../../../ui/button";
import DatePicker from "./DatePicker";
import FacilityFeatureChecker from "./FacilityFeatureChecker";

const AvailabilityChecker = ({  setQuery }: any) => {
  const [facilityItem, setFacilityItem] = useState<TFacility | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const queryHandler = () => {
    const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";
    
    setQuery({ date: formattedDate, id: facilityItem?._id });
    // availabilityChecker();
  };

  
  return (
    <div className="p-20 text-left">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl uppercase">Availability Checker</h2>
          <p className="text-[#494949] italic">Content</p>
        </div>
      </div>
      <div>
        <DatePicker date={date} setDate={setDate} />
        <FacilityFeatureChecker setFacilityItem={setFacilityItem} />
        <Button type="button" onClick={queryHandler}>
          Check Availability
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default AvailabilityChecker;
