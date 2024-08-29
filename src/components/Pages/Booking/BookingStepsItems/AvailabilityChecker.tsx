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
  const { register, handleSubmit } = useForm<TFormValues>();

  const onSubmit: SubmitHandler<TFormValues> = (data) => {
    setQuery(data);
  };

  return (
    <div className=" text-left">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl uppercase mb-4">Availability Checker</h2>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            type="date"
            {...register("date", { required: true })}
          />
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            {...register("facility", { required: true })}
          >
            <option value="" disabled>
              Select a facility
            </option>
            {facilities?.data.map((facility: TFacilitySelect) => (
              <option key={facility._id} value={facility._id}>
                {facility.name}
              </option>
            ))}
          </select>

          <Button type="submit" className=" w-full">
            Check Availability
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityChecker;
