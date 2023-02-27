import style from "./OpenLoans.module.css";
import cn from "classnames";
import { refreshPools } from "utils/apis/pikachu.api";
import { Refresh } from "components/ui";
import { LoanPanel } from "components/Pool";
import { useAccountStore } from "store";

const OpenLoans = () => {
  const { loans } = useAccountStore();
  const openLoans = loans.filter((item) => item.status === 1);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.head)}>
        <div>
          <span className="hidden md:flex">NFT</span>
          <span className="md:hiden">My Open Loans</span>
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

      {openLoans.map((loan, index) => (
        <LoanPanel key={index} loan={loan} />
      ))}

      {openLoans.length === 0 && (
        <div className={cn(style.empty)}>You don’t have open loans.</div>
      )}
    </div>
  );
};

export default OpenLoans;
