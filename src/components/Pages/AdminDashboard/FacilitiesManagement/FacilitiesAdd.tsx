/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddFacilitiesMutation } from "../../../../Redux/api/baseApi";
import { Button } from "../../../ui/button";

const FacilitiesAdd = () => {
  const [addFacilities] = useAddFacilitiesMutation();
  const defaultValue = {
    name: "Basketball Court",
    description: "Indoor basketball court with wooden flooring.",
    pricePerHour: 50,
    location: "789 Athlete St, Springfield",
  };
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<any>({ defaultValues: defaultValue });
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);

    reset();

    try {
      const res = await addFacilities(data).unwrap();

      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
      }
      if (res?.error) {
        toast.error(
          res?.error?.message ? res?.error?.message : "Facility failed to add!"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mx-auto w-[50%] section-padding">
      <h2 className="text-7xl text-black uppercase">Facilities Add</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap- bg-white  p-5 w-full"
      >
        <div className="w-full p-3 rounded-lg font-mono bg-blac">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="unique-input"
          >
            Name
          </label>
          <input
            placeholder="Name"
            {...register("name", { required: true })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            type="text"
            id="unique-input"
            name="name"
          />
        </div>
        <div className="w-full p-3 rounded-lg font-mono bg-blac">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="unique-input"
          >
            Description
          </label>
          <input
            {...register("description", { required: true })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Description"
            type="text"
            id="unique-input"
          />
        </div>
        <div className="w-full p-3 rounded-lg font-mono bg-blac">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="unique-input"
          >
            price Per-Hour
          </label>
          <input
            {...register("pricePerHour", { required: true })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Price Per-Hour"
            type="text"
            id="unique-input"
          />
        </div>
        <div className="w-full p-3 rounded-lg font-mono bg-blac">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="unique-input"
          >
            Location
          </label>
          <input
            {...register("location", { required: true })}
            className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Location"
            type="text"
            id="unique-input"
          />
        </div>
        <div className="w-full p-3 rounded-lg font-mono bg-blac">
          {/* <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="unique-input"
          >
            Photo
          </label> */}
          {/* <div className="grid w-full items-center gap-1.5">
            <input
              {...register("photo", { required: true })}
              id="picture"
              type="file"
              className="flex w-[100%] rounded-md border border-input bg-white px-3 py-3 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
            />
          </div> */}
        </div>

        {errors.exampleRequired && <span>This field is required</span>}

        {/* <input type="submit"  /> */}
        <Button type="submit" className="uppercase text-lg mt-3">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FacilitiesAdd;
