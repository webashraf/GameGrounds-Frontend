import moment from "moment";
import { useState } from "react";
import { TFacility } from "../../../../types/gloval.types";
import { Button } from "../../../ui/button";
import DatePicker from "./DatePicker";
import FacilityFeatureChecker from "./FacilityFeatureChecker";
const AvailabilityChecker = () => {
  const [facilityItem, setFacilityItem] = useState<TFacility | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const handleAvailabilityChecker = () => {
    console.log("Selected Facility:", facilityItem);
    console.log("Selected Date:", moment(date).format("YYYY-MM-DD"));
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
        <Button type="submit" onClick={handleAvailabilityChecker}>
          Check Availability
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityChecker;
