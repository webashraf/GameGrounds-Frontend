import { SubmitHandler, useForm } from "react-hook-form";
import { useGetFacilitiesQuery } from "../../../../Redux/api/baseApi";
import {
  TAvailabilityCheckerProps,
  TFacilitySelect,
  TFormValues,
} from "../../../../types/gloval.types";
import { Button } from "../../../ui/button";

const AvailabilityChecker: React.FC<TAvailabilityCheckerProps> = ({
  setQuery,
}) => {
  const { data: facilities } = useGetFacilitiesQuery(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    // Send data booking component for check availability
    setQuery(data);
  };

  return (
    <div className="text-center w-full">
      <div className="">
        <div className="">
          <h2 className="text-3xl uppercase mb-4">Availability Checker</h2>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 ${
              errors.date ? "border-red-500" : ""
            }`}
            type="date"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mb-3">{errors.date.message}</p>
          )}

          <select
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 ${
              errors.facility ? "border-red-500" : ""
            }`}
            {...register("facility", { required: "Facility is required" })}
          >
            <option value="">
              Select a facility
            </option>
            {facilities?.data.map((facility: TFacilitySelect) => (
              <option key={facility._id} value={facility._id}>
                {facility.name}
              </option>
            ))}
          </select>
          {errors.facility && (
            <p className="text-red-500 text-sm mb-3">
              {errors.facility.message}
            </p>
          )}

          <Button type="submit" className="w-full">
            Check Availability
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityChecker;
