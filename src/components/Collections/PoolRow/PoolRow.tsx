import style from "./PoolRow.module.css";
import cn from "classnames";

import {
  SvgEthereum,
  // SvgTemplateChart,
} from "assets/images/svg";

import { Button, TextCopier } from "components/ui";
import {
  beautifyAddress,
  beautifyDecimals,
  formatEther,
  toInteger,
} from "utils/helpers/string.helpers";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { identicon } from "minidenticons";

interface Props {
  pool: IPikachu.PoolStructOutput;
  floorPrice: number;
}

const PoolRow = ({ pool, floorPrice }: Props) => {
  return (
    <div className={cn(style.root)}>
      <div>
        <span className={cn(style.label)}>Creator: </span>
        <div
          className={cn(style.avatar)}
          dangerouslySetInnerHTML={{
            __html: identicon(pool.owner.repeat(3) + pool.poolId),
          }}
        />
        {beautifyAddress(pool.owner)} <TextCopier text={pool.owner} />
      </div>
      <div>
        <span className={cn(style.label)}>Avalabile/Total: </span>
        <span className="text-tangerine-yellow">
          {beautifyDecimals(formatEther(pool.availableAmount))}
        </span>{" "}
        / {beautifyDecimals(formatEther(pool.depositedAmount))}
        <SvgEthereum />
      </div>
      <div>
        <span className={cn(style.label)}>Loan to Value: </span>
        {toInteger(pool.loanToValue) / 100}%
      </div>
      <div>
        <span className={cn(style.label)}>Max Duration: </span>
        {toInteger(pool.maxDuration) / SECONDS_PER_DAY} Days
      </div>
      <div>
        <span className={cn(style.label)}>Daily Interest: </span>
        {toInteger(pool.interestCapRate) / 100}%
        <LinkWithSearchParams
          to={{ pathname: `/pool/${pool.owner}/${pool.poolId}` }}
        >
          <Button variant="yellow">
            Borrow{" "}
            {((toInteger(pool.loanToValue) / 10000) * floorPrice).toFixed()}
            <SvgEthereum />
          </Button>
        </LinkWithSearchParams>
      </div>

      <hr />
    </div>
  );
};

export default PoolRow;
