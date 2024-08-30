import { useGetUserQuery } from "../../../Redux/api/baseApi";
import { useToken } from "../../../Redux/feature/authSlice";
import { useAppSelector } from "../../../Redux/hook";
import { verifyToken } from "../../../utils/verifyToken";

const WelcomeUserDashboard = () => {
  const token = useAppSelector(useToken);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;

  if (token) {
    user = verifyToken(token);
  }

  const { data: userInfo } = useGetUserQuery(user?.email);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 text-center bg-white shadow-lg rounded-lg mt-20">
      <h1 className="text-4xl font-extrabold text-purple-900 mb-4">
        Welcome, {userInfo?.data.name}!
      </h1>
      <p className="text-lg text-gray-600 mb-10">
        Manage your sports facility bookings, view details, and enjoy a seamless experience.
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg text-left text-white">
          <h2 className="text-2xl font-bold mb-4">Your Information</h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Name:</span> {userInfo?.data.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {userInfo?.data.email}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {userInfo?.data.phone}
            </div>
            <div>
              <span className="font-semibold">Address:</span> {userInfo?.data.address}
            </div>
          </div>
        </div>

        <div className="p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-purple-800 mb-4">Your Bookings</h2>
          <p className="text-gray-700 mb-6">
            Browse through your bookings, view details, or cancel any upcoming reservations.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition duration-200">
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUserDashboard;
