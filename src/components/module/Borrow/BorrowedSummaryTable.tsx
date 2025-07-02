import type { borrowedBook } from "@/interface/borrow";
import { useGetBorrowQuery } from "@/Redux/features/ApiSlice";

const BorrowedSummaryTable = () => {
  const { data, isLoading, isError, error }: any = useGetBorrowQuery({});
  let borrowBook: borrowedBook[] = data?.data || [];
  console.log(data);
  console.log(isLoading, "isLoading");
  console.log(isError, "isError");
  console.log(error?.data?.error.message, "error");
  return (
    <div className="p-4 border rounded-xl shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Borrowed Books Summary</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left text-sm font-medium text-gray-600 px-4 py-2">
              Title
            </th>
            <th className="text-left text-sm font-medium text-gray-600 px-4 py-2">
              ISBN
            </th>
            <th className="text-right text-sm font-medium text-gray-600 px-4 py-2">
              Total Quantity
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {borrowBook.length > 0 &&
            borrowBook?.map((item: borrowedBook, idx: React.Key) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.book.title}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {item.book.isbn}
                </td>
                <td className="px-4 py-2 text-sm text-right text-gray-800">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedSummaryTable;
