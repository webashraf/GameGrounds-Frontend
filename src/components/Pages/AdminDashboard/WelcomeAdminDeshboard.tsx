/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserQuery } from "../../../Redux/api/baseApi";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";

const WelcomeAdminDashboard = () => {
  const token = useAppSelector(useToken);

  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const { data: userInfo } = useGetUserQuery(user?.email);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 text-center bg-white shadow-lg rounded-lg mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage sports facilities, oversee user bookings, and empower your team
        by creating new admins.
      </p>

      {/* User Info Section */}
      {userInfo && (
        <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-left text-white mb-5">
          <h2 className="text-2xl font-bold mb-4">Your Information</h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Name:</span> {userInfo?.data.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span>{" "}
              {userInfo?.data.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span>{" "}
              {userInfo?.data.phone}
            </div>
            <div>
              <span className="font-semibold">Address:</span>{" "}
              {userInfo?.data.address}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            Manage Sports Facilities
          </h2>
          <p className="text-gray-700">
            Create, update, and maintain sports facilities to keep everything
            running smoothly.
          </p>
        </div>
        <div className="p-6 bg-green-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            View User Bookings
          </h2>
          <p className="text-gray-700">
            Keep track of all bookings, ensure availability, and provide
            excellent service to your users.
          </p>
        </div>
        <div className="p-6 bg-yellow-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Create New Admins
          </h2>
          <p className="text-gray-700">
            Expand your management team by creating new admin accounts with the
            necessary permissions.
          </p>
        </div>
        <div className="p-6 bg-red-100 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Support & Assistance
          </h2>
          <p className="text-gray-700">
            Need help? Reach out to our support team or consult the admin guide
            for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdminDashboard;
