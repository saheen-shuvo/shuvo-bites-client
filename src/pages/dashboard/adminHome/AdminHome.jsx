/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { RiCaravanFill } from "react-icons/ri";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  console.log(stats)

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });
  console.log(chartData)

  // CUSTOM SHAPE FOR THE BAR CHART
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // CUSTOM SHAPE FOR THE PIE CHART
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => {
    return {name: data.category, value: data.revenue}
  })

  return (
    <div className="mx-2 lg:mx-0">
      <h2 className="mt-4 md:mt-0 font-bold text-xl md:text-3xl"> Hi, Welcome Back {user?.displayName ? user.displayName : "Back"}!</h2>
      <div className="stats shadow flex flex-col md:flex-row mt-8">
        <div className="stat">
          <div className="stat-title">Revenue</div>
          <div className="stat-value flex gap-2">
            ${stats.revenue}{" "}
            <div className="stat-figure text-[#FFC300] text-2xl">
              <FaCircleDollarToSlot />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value flex gap-2">
            {stats.totalUsers}{" "}
            <div className="stat-figure text-[#FFC300] text-3xl">
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Menu Items</div>
          <div className="stat-value flex gap-2">
            {stats.totalMenuItems}{" "}
            <div className="stat-figure text-[#FFC300] text-3xl">
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Orders</div>
          <div className="stat-value flex items gap-2">
            {stats.totalOrders}{" "}
            <div className="stat-figure text-[#FFC300] text-3xl">
              <RiCaravanFill />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 my-8">
      {/* Bar Chart Section */}
      <div className="w-full lg:w-1/2 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" label={{ position: "top" }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart Section */}
      <div className="w-full lg:w-1/2 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default AdminHome;
