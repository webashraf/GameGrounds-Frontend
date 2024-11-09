/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useUser from "../../../../hooks/userHook";
import { useGetAllBookingsByUserQuery } from "../../../../Redux/api/booking.api";
import Loader from "../../../shared/Loader/Loader";

const LineChartUserDashboard = () => {
  const user = useUser();

  const { data: myBookings, isLoading } = useGetAllBookingsByUserQuery(
    user?.email
  );

  const groupedBookings = myBookings?.data.reduce((acc: any, booking: any) => {
    const { date, payableAmount } = booking;

    // Check if the date already exists in the accumulator
    const existingDate = acc.find((item: any) => item.dateOfBooking === date);
    if (existingDate) {
      // If it exists, add the amount to the totalAmount
      existingDate.totalAmount += payableAmount;
    } else {
      // If it doesn't exist, create a new entry with the initial values
      acc.push({
        dateOfBooking: date,
        amounts: payableAmount,
      });
    }

    return acc;
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart
          data={groupedBookings}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateOfBooking" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amounts" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartUserDashboard;
