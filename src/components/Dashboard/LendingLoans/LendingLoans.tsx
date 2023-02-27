import style from "./LendingLoans.module.css";
import cn from "classnames";
import { refreshPools } from "utils/apis/pikachu.api";
import { Refresh } from "components/ui";
import { LoanPanel } from "components/Pool";
import { useAccountStore } from "store";
import { usePoolByOwner } from "utils/hooks/pikachu/usePools";
import { useMemo } from "react";
import { toInteger } from "utils/helpers/string.helpers";

const LendingLoans = () => {
  const { allLoans, address } = useAccountStore();

  const myPools = usePoolByOwner(address);

  const lendingLoans = useMemo(() => {
    return allLoans.filter(
      (loan) =>
        loan.status === 1 &&
        myPools.find(
          (pool) => toInteger(pool.poolId) === toInteger(loan.poolId)
        )
    );
  }, [myPools, allLoans]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.head)}>
        <div>
          <span className="hidden md:flex">NFT</span>
          <span className="md:hidden">My Open Loans</span>
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

      {lendingLoans.map((loan, index) => (
        <LoanPanel
          key={index}
          loan={loan}
          pool={myPools.find(
            (pool) => toInteger(pool.poolId) === toInteger(loan.poolId)
          )}
        />
      ))}

      {lendingLoans.length === 0 && (
        <div className={cn(style.empty)}>You don’t have open loans.</div>
      )}
    </div>
  );
};

export default LendingLoans;
