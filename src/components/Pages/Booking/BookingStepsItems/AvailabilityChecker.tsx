import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCheckAvailabilityQuery } from "../../../../Redux/api/baseApi";
import { TFacility } from "../../../../types/gloval.types";
import { Button } from "../../../ui/button";
import DatePicker from "./DatePicker";
import FacilityFeatureChecker from "./FacilityFeatureChecker";

const AvailabilityChecker = () => {
  const [facilityItem, setFacilityItem] = useState<TFacility | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [query, setQuery] = useState<string>("");
  const {
    data: availabilitySlot,
    error,
    refetch,
  } = useCheckAvailabilityQuery(query, { skip: !query });

  const handleAvailabilityChecker = async () => {
    const formattedDate = date ? moment(date).format("YYYY-MM-DD") : "";
    const queryString = `${formattedDate}&facility=${facilityItem?._id}`;
    setQuery(queryString);
    refetch();
  };

  useEffect(() => {
    if (availabilitySlot) {
      console.log(availabilitySlot);
    }

    if (error) {
      console.error("Error fetching availability:", error);
      toast.error(error?.data?.message);
      if ("status" in error) {
        // The error is an HTTP error
        console.error("HTTP Error Status:", error.status);
      }
      if ("data" in error) {
        // The backend sent an error response with a message
        console.error("Error Data:", error.data);
      }
    }
  }, [availabilitySlot, error]);

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
        <Button type="button" onClick={handleAvailabilityChecker}>
          Check Availability
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityChecker;
