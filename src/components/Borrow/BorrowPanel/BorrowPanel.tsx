import style from "./BorrowPanel.module.css";
import cn from "classnames";

import { identicon } from "minidenticons";

import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import {
  beautifyAddress,
  beautifyDecimals,
  toFloat,
  // beautifyDecimals,
} from "utils/helpers/string.helpers";
import { SvgArrowUp, SvgEthereum } from "assets/images/svg";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { useMemo } from "react";
import { calculateRepayAmount } from "utils/helpers/contract.helpers";
import LinkWithSearchParams from "components/LinkWithSearchParams";

type IProps = {
  pool: IPikachu.PoolStructOutput;
  amount: number;
  duration: number;
};

const BorrowPanel = ({ pool, amount, duration }: IProps) => {
  const repayAmount = useMemo(() => {
    return calculateRepayAmount(
      amount,
      pool.interestType,
      toFloat(pool.interestStartRate),
      toFloat(pool.interestCapRate),
      duration * SECONDS_PER_DAY
    );
  }, [amount, duration, pool]);
  return (
    <div className={cn(style.root)}>
      <div>
        <div
          className={cn(style.avatar)}
          dangerouslySetInnerHTML={{
            __html: identicon(pool.owner.repeat(3) + pool.poolId),
          }}
        />

        {beautifyAddress(pool.owner)}
      </div>
      <div>
        <span>Available Amount:</span> {beautifyDecimals(pool.availableAmount)}{" "}
        <SvgEthereum />
      </div>
      <div className={cn(style.amount)}>
        <span>Loan to Value:</span> {pool.loanToValue.toNumber() / 100} %
        {/* <SvgEthereum /> */}
      </div>

      <div>
        <span>Loans Made:</span> {pool.numberOfLoans.toNumber()}
      </div>
      <div>
        <span>Interest:</span> {pool.interestStartRate.toNumber() / 100} /{" "}
        {pool.interestCapRate.toNumber() / 100} %
      </div>
      <div>
        <span>Max Duration:</span>{" "}
        {pool.maxDuration.toNumber() / SECONDS_PER_DAY} Days
      </div>
      <div>
        <span>Max Amount:</span> {beautifyDecimals(pool.maxAmount)}
        <SvgEthereum />
      </div>

      <div className={cn(style.repayment)}>
        <span>You should pay: </span>
        <div className={cn(style.value)}>{beautifyDecimals(repayAmount)}</div>
        <SvgEthereum />
      </div>

      <LinkWithSearchParams
        className={cn(style.visit)}
        to={{ pathname: `/pool/${pool.owner}/${pool.poolId}` }}
      >
        <SvgArrowUp className="rotate-90" />
      </LinkWithSearchParams>
    </div>
  );
};

export default BorrowPanel;
