/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllBookingsQuery } from "../../../../Redux/api/booking.api";
import Loader from "../../../shared/Loader/Loader";

const LineChartAdminDashboard = () => {
  const { data: bookings, isLoading } = useGetAllBookingsQuery([]);

  const groupedBookings = bookings?.data.reduce((acc: any, booking: any) => {
    const { date, payableAmount, user, facility } = booking;

    // Check if the date already exists in the accumulator
    const existingDate = acc.find((item: any) => item.dateOfBooking === date);
    if (existingDate) {
      // If it exists, add the amount to the totalAmount and increase the booking totalCount
      existingDate.totalAmount += payableAmount;
      existingDate.totalCount += 1;

      // Track unique users by their _id
      if (!existingDate.uniqueUserIds.has(user._id)) {
        existingDate.uniqueUserIds.add(user._id);
        existingDate.userCount += 1;
      }

      // Track unique facilities by their _id
      if (!existingDate.uniqueFacilityIds.has(facility._id)) {
        existingDate.uniqueFacilityIds.add(facility._id);
        existingDate.facilityCount += 1;
      }
    } else {
      // If it doesn't exist, create a new entry with the initial values and Sets
      acc.push({
        dateOfBooking: date,
        totalAmount: payableAmount,
        totalCount: 1,
        uniqueUserIds: new Set([user._id]),
        userCount: 1,
        uniqueFacilityIds: new Set([facility._id]),
        facilityCount: 1,
      });
    }

    return acc;
  }, []);

  // Clean up the final output by removing the Sets
  const finalGroupedBookings = groupedBookings?.map(
    ({ uniqueUserIds, uniqueFacilityIds, ...rest }: any) => ({
      ...rest,
    })
  );

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <LineChart
        width={730}
        height={250}
        data={finalGroupedBookings}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateOfBooking" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
        <Line type="monotone" dataKey="totalCount" stroke="#82ca9d" />
        <Line type="monotone" dataKey="userCount" stroke="#82fd" />
        <Line type="monotone" dataKey="facilityCount" stroke="#82cafd" />
      </LineChart>
    </div>
  );
};

export default LineChartAdminDashboard;
