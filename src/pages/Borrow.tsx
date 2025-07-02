import BorrowedBooksPieChart from "@/components/module/Borrow/BorrowedBooksPieChart";
import BorrowedSummaryTable from "@/components/module/Borrow/BorrowedSummaryTable";

const Borrow = () => {
  return (
    <div className="space-y-28">
      <div>
        <BorrowedBooksPieChart />
      </div>
      <div>
        <BorrowedSummaryTable />
      </div>
    </div>
  );
};

export default Borrow;
