import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ComposedChartData = () => {
  const data = [
    {
      name: "Page A",
      dateOfBooking: 4000,
      amount: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      dateOfBooking: 3000,
      amount: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      dateOfBooking: 2000,
      amount: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      dateOfBooking: 2780,
      amount: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      dateOfBooking: 1890,
      amount: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      dateOfBooking: 2390,
      amount: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      dateOfBooking: 3490,
      amount: 4300,
      amt: 2100,
    },
  ];
  return (
    <div>
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="amount" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="dateOfBooking" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};

export default ComposedChartData;
