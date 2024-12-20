/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
import { Button } from "../../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { TableCell, TableRow } from "../../../ui/table";

import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  useDeleteFacilitiesMutation,
  useUpdateFacilitiesMutation,
} from "../../../../Redux/api/facilities.api";

const FacilitiesTable = ({ item, i }: any) => {
  const [updateFacilities] = useUpdateFacilitiesMutation();
  const [deleteFacilities] = useDeleteFacilitiesMutation();

  //* Handle Delete Trees
  const handleDeleteTree = async (_id: string) => {
    try {
      const res = await deleteFacilities(_id);
      if (res.data.success === true) {
        toast.success("Delete Succesfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete!!");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (data) => {
    const updatedData = {
      name: data.name,
      photoUrl: data.photoUrl,
      description: data.description,
      location: data.location,
      pricePerHour: Number(data.pricePerHour),
    };

    try {
      const res = await updateFacilities({
        _id: data.id,
        data: updatedData,
      }).unwrap();

      if (res?.success) {
        reset();
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
    <TableRow className="">
      <TableCell className="font-medium w-[3%]">{i}</TableCell>
      <TableCell className="uppercase lg:flex flex-col">
        <NavLink to={`/single-facility/${item?._id}`}>
          <h5 className="text-md font-bold mb-1 hover:underline">
            {item.name}
          </h5>
        </NavLink>
      </TableCell>
      <TableCell className="uppercase">{item.location}</TableCell>
      <TableCell className="max-w-[400px]">
        <NavLink
          to={`/single-facility/${item?._id}`}
          className="hover:underline"
        >
          {item?.description?.slice(0, 80)}...
        </NavLink>
      </TableCell>
      <TableCell>${item.pricePerHour}</TableCell>
      <TableCell className="text-right flex gap-2 items-center justify-center">
        {/* Delete Button  */}
        <AlertDialog>
          <AlertDialogTrigger>
            <div>
              {/* <Trash2 /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff0000"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure to delete this item?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                item and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className=""
                onClick={() => handleDeleteTree(item._id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="">
          <AlertDialog>
            {/* <AlertDialogCustom id={item._id} /> */}

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-black text-white hover:bg-slate-950/80 hover:text-white"
                >
                  Update Facility
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle className="text-3xl uppercase font-semibold">
                    Update profile
                  </DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-3 bg-white  p-5 w-full"
                    >
                      <div className="w-full p- rounded-lg font-mono ">
                        <label
                          className="block text-gray-700  font-bold mb-1"
                          htmlFor="name-input"
                        >
                          Name
                        </label>
                        <input
                          placeholder="Name"
                          {...register("name", {})}
                          className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                          type="text"
                          defaultValue={item.name}
                          id="name-input"
                          name="name"
                        />
                      </div>

                      <div className="w-full p- rounded-lg font-mono ">
                        <label
                          className="block text-gray-700  font-bold mb-1"
                          htmlFor="photo-input"
                        >
                          Photo
                        </label>
                        <input
                          placeholder="Photo Url"
                          {...register("photoUrl", {})}
                          className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                          type="text"
                          defaultValue={item.photoUrl}
                          id="photo-input"
                          name="photoUrl"
                        />
                      </div>

                      <div className="w-full p- rounded-lg font-mono ">
                        <label
                          className="block text-gray-700  font-bold mb-1"
                          htmlFor="unique-input"
                        >
                          Description
                        </label>
                        <input
                          {...register("description", {})}
                          className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                          placeholder="Description"
                          defaultValue={item.description}
                          type="text"
                          id="unique-input"
                        />
                      </div>

                      <div className="w-full p- rounded-lg font-mono ">
                        <label
                          className="block text-gray-700  font-bold mb-1"
                          htmlFor="unique-input"
                        >
                          price Per-Hour
                        </label>
                        <input
                          {...register("pricePerHour", {})}
                          className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                          placeholder="Price Per-Hour"
                          defaultValue={item.pricePerHour}
                          type="number"
                          id="unique-input"
                        />
                      </div>

                      <div className="w-full p- rounded-lg font-mono ">
                        <label
                          className="block text-gray-700  font-bold mb-1"
                          htmlFor="unique-input"
                        >
                          Location
                        </label>
                        <input
                          {...register("location", {})}
                          className="text-md custom-input w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
                          placeholder="Location"
                          defaultValue={item.location}
                          type="text"
                          id="unique-input"
                        />
                      </div>

                      <input
                        {...register("id", {})}
                        type="text"
                        className="opacity-0"
                        defaultValue={item._id}
                        id="f_id"
                      />
                      {/* <input type="submit"  /> */}
                      <DialogFooter>
                        <Button
                          type="submit"
                          className="uppercase text-lg mt-3 w-full bg-black"
                        >
                          Submit
                        </Button>
                      </DialogFooter>
                    </form>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FacilitiesTable;
