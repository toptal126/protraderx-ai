import style from "./Loans.module.css";
import cn from "classnames";
import { refreshPools } from "utils/apis/pikachu.api";
import { Refresh } from "components/ui";
import { LoanPanel } from "components/Pool";
import { useAccountStore } from "store";

const Loans = () => {
  const { loans } = useAccountStore();

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.head)}>
        <div>
          <span className="hidden md:flex">NFT</span>
          <span className="md:hidden">Loans History</span>
        </div>
        <span>Borrower</span>
        <span>Amount + Interest</span>
        <span>Interest</span>
        <span>Fund Date</span>
        <span>Status</span>
        <span>
          <Refresh action={refreshPools} />
        </span>
      </div>

      {loans.map((loan, index) => (
        <LoanPanel key={index} loan={loan} />
      ))}

      {loans.length === 0 && (
        <div className={cn(style.empty)}>
          No loans history available. Take a loan to see it displayed here
        </div>
      )}
    </div>
  );
};

export default Loans;
