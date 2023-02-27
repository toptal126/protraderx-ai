import { useMemo, useState } from "react";
import { BigNumber } from "ethers";
import style from "./PoolPanel.module.css";
import cn from "classnames";

import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import {
  beautifyAddress,
  beautifyDecimals,
  formatEther,
  toFloat,
  toInteger,
} from "utils/helpers/string.helpers";
import {
  SvgArrowDown,
  SvgEthereum,
  // SvgTemplateChart,
} from "assets/images/svg";
import ImageERC721 from "assets/images/template-erc721.png";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import {
  INTEREST_TYPE,
  POOL_DISABLED,
  POOL_READY,
} from "utils/constants/contact.constants";
import { Button, TextCopier } from "components/ui";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { calculateRepayAmount } from "utils/helpers/contract.helpers";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAccountStore } from "store";
import { identicon } from "minidenticons";

interface Props {
  pool: IPikachu.PoolStructOutput;
  poolId: number;
  buttonVisible: boolean;
}

const PoolPanel = ({ pool, buttonVisible }: Props) => {
  const { allLoans } = useAccountStore();
  const [expanded, setExpanded] = useState(false);

  const data = useMemo(() => {
    const {
      interestType: dynamicInterest,
      interestStartRate: interestStarting,
      interestCapRate: interestCap,
    } = pool;

    const days = [1, 3, 5, 7, 9, 11, 13];
    const interests = days.map((day) => {
      return calculateRepayAmount(
        1,
        Number(dynamicInterest),
        toFloat(interestStarting),
        toFloat(interestCap),
        day * SECONDS_PER_DAY
      );
    });
    return days.map((day, index) => ({
      name: `${day}d`,
      interest: (interests[index] - 1) * 100,
    }));
  }, [pool]);

  const openLoans = useMemo(() => {
    return allLoans.filter(
      (item) => item.poolId === toInteger(pool.poolId) && item.status === 1
    );
  }, [allLoans, pool]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.poolInfo)}>
        <span>
          <span className={cn(style.label)}>Creator:</span>
          <div
            className={cn(style.avatar)}
            dangerouslySetInnerHTML={{
              __html: identicon(pool.owner.repeat(3) + pool.poolId),
            }}
          />
          {beautifyAddress(pool.owner)} <TextCopier text={pool.owner} />
        </span>
        <span>
          <span className={cn(style.label)}>Available:</span>
          <span className="text-tangerine-yellow">
            {beautifyDecimals(pool.availableAmount)}
          </span>
          /{" "}
          {beautifyDecimals(
            formatEther(pool.availableAmount) +
              openLoans.reduce(
                (prev, next) => prev + formatEther(next.amount),
                0
              )
          )}
          <SvgEthereum />
        </span>
        <span>
          <span className={cn(style.label)}>LTV:</span>
          {toFloat(pool.loanToValue) / 100}%
        </span>
        <span>
          <span className={cn(style.label)}>Max Duration:</span>
          {pool.maxDuration.toNumber() / SECONDS_PER_DAY} Days
        </span>
        <span>
          <span className={cn(style.label)}>Interest Rate:</span>
          <span className="text-tangerine-yellow">
            {pool.interestStartRate.toNumber() / 100}
          </span>
          / {pool.interestCapRate.toNumber() / 100}%
        </span>
        <span>
          {buttonVisible && (
            <>
              {pool.status === POOL_READY &&
              pool.availableAmount.gt(BigNumber.from(0)) ? (
                pool.paused ? (
                  <Button variant="gray" sx="h-8 w-28 md:h-10 md:w-36" disabled>
                    Paused
                  </Button>
                ) : (
                  <LinkWithSearchParams
                    to={{ pathname: `/pool/${pool.owner}/${pool.poolId}` }}
                  >
                    <Button variant="yellow" sx="h-8 w-28 md:h-10 md:w-36">
                      Borrow Now
                    </Button>
                  </LinkWithSearchParams>
                )
              ) : (
                <Button variant="gray" sx="h-8 w-28 md:h-10 md:w-36" disabled>
                  Insufficient
                </Button>
              )}
              {pool.status === POOL_DISABLED && (
                <Button variant="gray" sx="h-8 w-28 md:h-10 md:w-36" disabled>
                  Paused
                </Button>
              )}
            </>
          )}
          <Button
            variant="blue"
            sx={`h-8 md:h-10 w-8 md:w-10 ml-auto ${
              expanded ? "rotate-180" : ""
            }`}
            onClick={() => setExpanded(!expanded)}
          >
            <SvgArrowDown />
          </Button>
        </span>
      </div>

      {expanded && (
        <div className={cn(style.poolDetails)}>
          <div className={cn(style.loanInfo)}>
            <div>
              <span>Loans made: </span>
              <span>{toInteger(pool.numberOfLoans)}</span>
            </div>
            <div>
              <span>Open loans: </span>
              <span>{toInteger(pool.numberOfOpenLoans)}</span>
            </div>
            <div>
              <span>Liquidations: </span>
              <span>{toInteger(pool.numberOfLiquidations)}</span>
            </div>
            <div>
              <span>Max duration: </span>
              <span>{pool.maxDuration.toNumber() / SECONDS_PER_DAY} Days</span>
            </div>
            <div>
              <span>Max amount: </span>
              <span>
                {formatEther(pool.maxAmount)}
                <SvgEthereum />
              </span>
            </div>
          </div>
          <div className={cn(style.loanDetails)}>
            <div className={cn(style.interestInfo)}>
              <div className={cn(style.figures)}>
                <div>
                  <span>Interest type:</span>
                  <span>{INTEREST_TYPE[pool.interestType]}</span>
                </div>
                <div>
                  <span>Interest earned:</span>
                  <span>{beautifyDecimals(pool.totalInterest)} ETH</span>
                </div>
              </div>
              <div className={cn(style.chart)}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis interval="preserveStart" />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className={cn(style.chart_tooltip)}>
                              {`${label} loan interest : ${Number(
                                payload[0].value
                              ).toFixed(2)}%`}
                            </div>
                          );
                        }

                        return null;
                      }}
                    />
                    <Area
                      dot={{
                        stroke: "#37AB45",
                        fill: "#FFF",
                        strokeWidth: 2,
                        r: 4,
                        strokeDasharray: "",
                      }}
                      dataKey="interest"
                      stroke="#37AB45"
                      fill="#37AB4580"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={cn(style.collectionsInfo)}>
              <div className={cn(style.collectionsCount)}>
                <span>Supported collections:</span>
                <span>{pool.collections.length}</span>
              </div>

              <div className={cn(style.collectionsList)}>
                {pool.collections.map((collection, index) => (
                  <img key={index} src={ImageERC721} alt="erc721" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolPanel;
