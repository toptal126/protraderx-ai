import style from "./Overview.module.css";
import cn from "classnames";
import { beautifyDecimals } from "utils/helpers/string.helpers";
import { SvgEthereum } from "assets/images/svg";

const Overview = () => {
  const totalLoans = 24;

  const borrowerBorrowedAmount =
    486.2 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 86400) * 2;

  const borrowerLiquidation =
    12.56 + (new Date().getTime() - 1677507683 * 1000) / 1000 / 864000;

  const borrowerTotalVolume =
    2415.12 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 86400) * 5;

  const borrowerInterest =
    11.92 + +((new Date().getTime() - 1677507683 * 1000) / 1000 / 864000);

  const myPools = ["", ""];

  const totalEarning =
    724.58 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 86400) * 3;

  const lendingLoans = ["", ""];

  const availableAmount =
    59.44 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 864000) * 2;

  const lenderBorrowedAmount =
    268.21 + (new Date().getTime() - 1677507683 * 1000) / 1000 / 86400;

  const depositedAmount =
    841.36 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 86400) * 3;

  const lenderLiquidations =
    36.14 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 864000) * 1.5;

  const lenderTotalVolume =
    5685.1 + ((new Date().getTime() - 1677507683 * 1000) / 1000 / 86400) * 20;

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.stats)}>
        <div className={cn(style.borrowerStats)}>
          <h4>Borrower stats</h4>
          <div>
            <div className={cn(style.box)}>
              <span className={cn(style.value)}>{totalLoans}</span>
              <span className={cn(style.label)}>Total loans</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(borrowerLiquidation)}
              </span>
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
              <span className={cn(style.value)}>4</span>
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
              <span className={cn(style.value)}>{lendingLoans.length} </span>
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
              <span className={cn(style.value)}>
                {beautifyDecimals(lenderLiquidations)}
              </span>
              <span className={cn(style.label)}>Liquidations</span>
            </div>

            <div className={cn(style.box, "tooltip-container")}>
              <span className={cn(style.tooltip, "tooltip top")}>
                You Pools earned a total of {beautifyDecimals(totalEarning)} ETH
              </span>
              <span className={cn(style.value)}>
                {beautifyDecimals(lenderTotalVolume)}
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
