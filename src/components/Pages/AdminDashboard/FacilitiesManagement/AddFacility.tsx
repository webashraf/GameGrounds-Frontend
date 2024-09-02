/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddFacilitiesMutation } from "../../../../Redux/api/baseApi";
import { Button } from "../../../ui/button";

type TFacilityFormData = {
  name: string;
  photoUrl: string;
  description: string;
  pricePerHour: number;
  location: string;
};

const AddFacility = () => {
  const [addFacilities] = useAddFacilitiesMutation();

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<TFacilityFormData>();
  const onSubmit: SubmitHandler<TFacilityFormData> = async (data) => {
    const facilityInfo = {
      ...data,
      pricePerHour: Number(data.pricePerHour),
    };
    try {
      const res = await addFacilities(facilityInfo).unwrap();

      if (res?.success) {
        toast.success(res?.message);
        reset();
      }
      if (res?.error) {
        toast.error(
          res?.error?.message ? res?.error?.message : "Facility failed to add!"
        );
        reset();
      }
    } catch (err: any) {
      if (err) {
        toast.error(
          err?.data?.success ? err?.data?.message : "Facility failed to add!"
        );
        reset();
      }
    }
  };

  return (
    <div className=" mx-auto lg:w-[50%] lg:px-0 px-10 ">
      <h2 className="text-6xl  lg:mt-10 mt-32 text-black uppercase mb-10">
        Add Facility
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap- bg-white p-5 w-full"
      >
        <div className="w-full p-3 rounded-lg font-mono">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="name-input"
          >
            Name
          </label>
          <input
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="text"
            id="name-input"
            name="name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="w-full p-3 rounded-lg font-mono ">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="photo-input"
          >
            Photo URL
          </label>
          <input
            placeholder="Photo URL"
            {...register("photoUrl", { required: "Photo URL is required" })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="text"
            id="photo-input"
            name="photoUrl"
          />
          {errors.photoUrl && (
            <span className="text-red-500 text-sm">
              {errors.photoUrl.message}
            </span>
          )}
        </div>

        <div className="w-full p-3 rounded-lg font-mono ">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="description-input"
          >
            Description
          </label>
          <input
            {...register("description", {
              required: "Description is required",
            })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Description"
            type="text"
            id="description-input"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="w-full p-3 rounded-lg font-mono ">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="price-input"
          >
            Price Per Hour
          </label>
          <input
            {...register("pricePerHour", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Price Per Hour"
            type="number"
            id="price-input"
          />
          {errors.pricePerHour && (
            <span className="text-red-500 text-sm">
              {errors.pricePerHour.message}
            </span>
          )}
        </div>

        <div className="w-full p-3 rounded-lg font-mono ">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="location-input"
          >
            Location
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Location"
            type="text"
            id="location-input"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </div>

        <Button type="submit" className="uppercase text-lg mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddFacility;
