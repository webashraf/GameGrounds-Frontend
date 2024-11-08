/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetSingleUserQuery,
  useGetUserQuery,
} from "../../../Redux/api/auth.api";
import { useGetAllBookingsQuery } from "../../../Redux/api/booking.api";
import { useGetFacilitiesQuery } from "../../../Redux/api/facilities.api";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import LineChartAdminDashboard from "./Charts/LineChart";

const WelcomeAdminDashboard = () => {
  const { data: userData } = useGetUserQuery([]);
  const { data: facilitiesData } = useGetFacilitiesQuery(undefined);
  const { data: bookingsData } = useGetAllBookingsQuery([]);

  const token = useAppSelector(useToken);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const { data: userInfo } = useGetSingleUserQuery(user?.email);

  return (
    <div className="px-5 lg:pt-0 pt-10 shadow-lg bg-white flex flex-col justify-center items-center w-full lg:w-[90%] mx-auto pb-10">
      <div className="w-full p-5 rounded-lg mt-10 lg:mt-20">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
          Welcome, Admin!
        </h1>
        <p className="text-md lg:text-lg text-gray-700 mb-8 text-center">
          Manage sports facilities, oversee user bookings, and empower your team
          by creating new admins.
        </p>

        {/* User Info Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <div className="p-6 lg:p-8 bg-gradient-to-r from-[#000000bd] to-[#10101014] rounded-lg shadow-lg text-white text-center lg:text-left mb-5 lg:mb-0">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">
              Your Information
            </h2>
            {userInfo ? (
              <div className="space-y-3 text-sm lg:text-md">
                <div>
                  <span className="font-semibold">Name: </span>
                  {userInfo?.data.name}
                </div>
                <div>
                  <span className="font-semibold">Email: </span>
                  {userInfo?.data.email}
                </div>
                <div>
                  <span className="font-semibold">Phone: </span>
                  {userInfo?.data.phone}
                </div>
                <div>
                  <span className="font-semibold">Address: </span>
                  {userInfo?.data.address}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"></div>
                <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]"></div>
                <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]"></div>
                <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]"></div>
              </div>
            )}
          </div>

          {/* Main Content Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="p-6 bg-blue-100 rounded-lg shadow">
              <h2 className="text-lg lg:text-xl font-semibold text-blue-800 mb-2">
                Manage Sports Facilities
              </h2>
              <p className="text-gray-700">
                Create, update, and maintain sports facilities to keep
                everything running smoothly.
              </p>
            </div>
            <div className="p-6 bg-green-100 rounded-lg shadow">
              <h2 className="text-lg lg:text-xl font-semibold text-green-800 mb-2">
                View User Bookings
              </h2>
              <p className="text-gray-700">
                Keep track of all bookings, ensure availability, and provide
                excellent service to your users.
              </p>
            </div>
            <div className="p-6 bg-yellow-100 rounded-lg shadow">
              <h2 className="text-lg lg:text-xl font-semibold text-yellow-800 mb-2">
                Create New Admins
              </h2>
              <p className="text-gray-700">
                Expand your management team by creating new admin accounts with
                the necessary permissions.
              </p>
            </div>
            <div className="p-6 bg-red-100 rounded-lg shadow">
              <h2 className="text-lg lg:text-xl font-semibold text-red-800 mb-2">
                Support & Assistance
              </h2>
              <p className="text-gray-700">
                Need help? Reach out to our support team or consult the admin
                guide for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart and Statistics Section */}
      <div className="flex flex-col lg:flex-row mt-10 w-full gap-6">
        <div className="bg-zinc-200 lg:p-5 w-full lg:w-2/3 rounded-lg shadow">
          <h4 className=" mb-5 p-5 lg:text-4xl text-2xl font-semibold">
            Bookings Overview
          </h4>
          <LineChartAdminDashboard />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
          <div className="p-5 bg-purple-100 flex flex-col items-center justify-center rounded-lg shadow">
            <h2 className="text-4xl font-mono">{userData?.data?.length}</h2>
            <p className="text-lg text-nowrap">Total Users</p>
          </div>
          <div className="p-5 bg-amber-100 flex flex-col items-center justify-center rounded-lg shadow">
            <h2 className="text-4xl font-mono">{facilitiesData?.dataLength}</h2>
            <p className="text-lg text-nowrap">Total Facilities</p>
          </div>
          <div className="p-5 bg-lime-100 flex flex-col items-center justify-center rounded-lg shadow">
            <h2 className="text-4xl font-mono">{bookingsData?.dataLength}</h2>
            <p className="text-lg text-nowrap">Total Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdminDashboard;
