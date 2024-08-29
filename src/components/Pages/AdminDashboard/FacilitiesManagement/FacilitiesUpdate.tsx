import { useGetFacilitiesQuery } from "../../../../Redux/api/baseApi";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
/* eslint-disable @typescript-eslint/no-explicit-any */
import FacilitiesTable from "./FacilitiesTable";

const FacilitiesUpdate = () => {
  const { data: facilitiesData } = useGetFacilitiesQuery(undefined);


  return (
    <div className="w-full ">
      {" "}
      <div className="lg:mt-10 mt-32 lg:w-[90%]  mx-auto lg:px-10 px-5">
        <h2 className="text-6xl text-black uppercase mb-10">
          Facilities Update
        </h2>
        <div className="flex justify-end"></div>
        <div className="lg:flex gap-5 items-center">
          {/* Display the list of products in a table */}
          <div className="  relative h-[600px] overflow-auto  custom-scrollbar w-full ">
            <Table className="">
              <TableHeader className="h-[100px] bg-black/80 shadow-2xl backdrop-blur-lg rounded-md ">
                <TableRow className="w-full ">
                  <TableHead className="w-[100px] text-white">Serial</TableHead>
                  <TableHead className="text-white">Facility Name</TableHead>
                  <TableHead className="text-white">Location</TableHead>
                  <TableHead className="text-white">Description</TableHead>
                  <TableHead className="text-white">Price</TableHead>
                  <TableHead className="text-center text-white ">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              {/* Map through the products and display each one in a table row */}
              <TableBody className="">
                {facilitiesData &&
                  facilitiesData?.data?.map((item: any, i: number) => (
                    <FacilitiesTable key={item._id} item={item} i={i} />
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesUpdate;
