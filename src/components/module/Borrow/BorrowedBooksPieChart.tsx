import type { borrowedBook } from "@/interface/borrow";
import { useGetBorrowQuery } from "@/Redux/features/ApiSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
  "#FF4444",
];

const BorrowedBooksPieChart = () => {
  const { data }: any = useGetBorrowQuery({});
  let borrowBook: borrowedBook[] = data?.data || [];

  const chartData = borrowBook?.map((item) => ({
    name: item.book.title,
    value: item.totalQuantity,
  }));

  return (
    <div className="w-full h-96">
      <h2 className="text-xl font-semibold mb-4">
        Borrowed Books Distribution
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BorrowedBooksPieChart;
