import { NavLink } from "react-router-dom";
import { useGetSingleUserQuery } from "../../../Redux/api/auth.api";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";
import { Button } from "../../ui/button";
import LineChartUserDashboard from "./Charts/LineChart";

const WelcomeUserDashboard = () => {
  const token = useAppSelector(useToken);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = token ? verifyToken(token) : null;
  const { data: userInfo } = useGetSingleUserQuery(user?.email);

  return (
    <div className="w-[90%] mx-auto pt-10 lg:pt-0">
      <div className="w-full px-3 py-8 lg:px-8 lg:py-8 text-center bg-white shadow-lg rounded-lg mt-20">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Welcome, {userInfo?.data?.name || "User"}!
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Manage your sports facility bookings, view details, and enjoy a
          seamless experience.
        </p>

        <div className="flex flex-wrap gap-6">
          {/* User Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-ce just-center w-full">
            <div className="p-8 bg-gradient-to-r from-[#000000bd] to-[#10101014] rounded-lg shadow-lg text-white text-left">
              <h2 className="text-2xl font-bold mb-4">Your Information</h2>
              {userInfo ? (
                <div className="space-y-3 text-md">
                  <div>
                    <span className="font-semibold">Name: </span>{" "}
                    {userInfo.data.name}
                  </div>
                  <div>
                    <span className="font-semibold">Email: </span>{" "}
                    {userInfo.data.email}
                  </div>
                  <div>
                    <span className="font-semibold">Phone: </span>{" "}
                    {userInfo.data.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Address: </span>{" "}
                    {userInfo.data.address}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="animate-pulse bg-gray-500 h-4 w-[200px] rounded-md"></div>
                  <div className="animate-pulse bg-gray-500 h-4 w-[170px] rounded-md"></div>
                  <div className="animate-pulse bg-gray-500 h-4 w-[200px] rounded-md"></div>
                  <div className="animate-pulse bg-gray-500 h-4 w-[170px] rounded-md"></div>
                </div>
              )}
            </div>

            {/* Bookings Section */}
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Your Bookings
              </h2>
              <p className="text-gray-700 mb-6">
                Browse through your bookings, view details, or cancel any
                upcoming reservations.
              </p>
              <NavLink to="/user/my-booking">
                <Button className="bg-black">View My Bookings</Button>
              </NavLink>
            </div>
          </div>

          {/* Booking Overview Chart */}
          <div className="w-full bg-zinc-200 rounded-md mt-10 lg:inline-block">
            <h4 className="p-5 text-4xl">Booking Overview</h4>
            <LineChartUserDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUserDashboard;
