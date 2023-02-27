import { useMemo } from "react";
import style from "./Overview.module.css";
import cn from "classnames";
import { useAccountStore } from "store";
import { beautifyDecimals, formatEther } from "utils/helpers/string.helpers";
import { SvgEthereum } from "assets/images/svg";
import { calculateRepayAmountFromLoan } from "utils/helpers/contract.helpers";

const Overview = () => {
  const { pools, allLoans, loans, address } = useAccountStore();

  const borrowerBorrowedAmount = useMemo(() => {
    return loans.reduce(
      (prev, next) => (prev + next.status === 1 ? formatEther(next.amount) : 0),
      0
    );
  }, [loans]);

  const borrowerLiquidation = useMemo(() => {
    return loans.filter((loan) => loan.status === 3).length;
  }, [loans]);

  const borrowerTotalVolume = useMemo(() => {
    return loans.reduce((prev, next) => {
      return (
        prev +
        (next.status === 1
          ? formatEther(next.amount)
          : next.status === 2
          ? calculateRepayAmountFromLoan(next)
          : 0)
      );
    }, 0);
  }, [loans]);

  const borrowerInterest = useMemo(() => {
    return loans.reduce((prev, next) => {
      return (
        prev +
        (next.status === 1
          ? calculateRepayAmountFromLoan(next) - formatEther(next.amount)
          : 0)
      );
    }, 0);
  }, [loans]);

  const myPools = useMemo(() => {
    return pools.filter((pool) => pool.owner.toLowerCase() === address);
  }, [pools, address]);

  const totalEarning = useMemo(() => {
    return myPools.reduce(
      (prev, next) => prev + formatEther(next.totalInterest),
      0
    );
  }, [myPools]);

  const lendingLoans = useMemo(() => {
    return allLoans.filter((loan) =>
      myPools.find((pool) => pool.poolId.toNumber() === loan.poolId)
    );
  }, [allLoans, myPools]);

  const availableAmount = useMemo(() => {
    return myPools.reduce(
      (prev, next) => prev + formatEther(next.availableAmount),
      0
    );
  }, [myPools]);

  const lenderBorrowedAmount = useMemo(() => {
    return myPools.reduce(
      (prev, next) => prev + formatEther(next.borrowedAmount),
      0
    );
  }, [myPools]);

  const depositedAmount = useMemo(() => {
    return myPools.reduce(
      (prev, next) => prev + formatEther(next.depositedAmount),
      0
    );
  }, [myPools]);

  const lenderLiquidations = useMemo(() => {
    return lendingLoans.filter((loan) => loan.status === 3).length;
  }, [lendingLoans]);

  const lenderTotalVolume = useMemo(() => {
    return lendingLoans.reduce(
      (prev, next) => prev + formatEther(next.amount),
      0
    );
  }, [lendingLoans]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.stats)}>
        <div className={cn(style.borrowerStats)}>
          <h4>Borrower stats</h4>
          <div>
            <div className={cn(style.box)}>
              <span className={cn(style.value)}>{loans.length}</span>
              <span className={cn(style.label)}>Total loans</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>{borrowerLiquidation}</span>
              <span className={cn(style.label)}>Liquidations</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(borrowerTotalVolume)} <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Total Volume</span>
            </div>
          </div>

          <h4 className="mt-8">Current</h4>

          <div>
            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(borrowerBorrowedAmount)} <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Borrowed</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(borrowerInterest)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Interest</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(borrowerInterest + borrowerBorrowedAmount)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Total Debt</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {loans.filter((loan) => loan.status === 1).length}
              </span>
              <span className={cn(style.label)}>Current loans</span>
            </div>
          </div>
        </div>

        <div className={cn(style.lenderStats)}>
          <h4>Lender stats</h4>
          <div>
            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>{myPools.length}</span>
              <span className={cn(style.label)}>Pools</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(totalEarning)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Total earnings</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(totalEarning)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Min. Current earnings</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {lendingLoans.filter((item) => item.status === 1).length}
              </span>
              <span className={cn(style.label)}>Current loans</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(availableAmount)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Available amount</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(lenderBorrowedAmount)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Borrowed amount</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(lenderBorrowedAmount + availableAmount)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Total amount</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(depositedAmount)}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Deposited amount</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>{lendingLoans.length}</span>
              <span className={cn(style.label)}>Total loans</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>{lenderLiquidations}</span>
              <span className={cn(style.label)}>Liquidations</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {lenderTotalVolume}
                <SvgEthereum />
              </span>
              <span className={cn(style.label)}>Total Volume</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
