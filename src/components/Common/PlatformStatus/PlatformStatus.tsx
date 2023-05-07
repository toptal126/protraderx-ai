import style from "./PlatformStatus.module.css";
import cn from "classnames";
import { useMemo } from "react";
import {
  beautifyDecimals,
  formatEther,
  toFloat,
} from "utils/helpers/string.helpers";
import { useAccountStore, useSettingStore } from "store";

const PlatformStatus = () => {
  const { etherusd } = useSettingStore();
  const { pools, allLoans } = useAccountStore();

  const platformStatus = useMemo(() => {
    const availableLiquidity =
      10 *
      pools.reduce(
        (prev, next) => toFloat(prev + formatEther(next.availableAmount)),
        0
      );

    return [
      {
        label: "Total Pools:",
        value: pools.length,
      },
      {
        label: "Total Open Loans:",
        value: `${beautifyDecimals(
          allLoans.reduce(
            (prev, next) =>
              toFloat(prev + next.status === 1 ? formatEther(next.amount) : 0),
            0
          )
        )} ETH`,
      },
      {
        label: "Available Liquidity:",

        value: `${beautifyDecimals(availableLiquidity)} ETH ($${(
          etherusd * availableLiquidity
        ).toFixed()})`,
      },
    ];
  }, [pools, etherusd, allLoans]);

  return (
    <div className={cn(style.root)}>
      {platformStatus.map((status, index) => (
        <div key={index}>
          <span className="text-white">{status.label}</span>
          <span>{status.value}</span>
        </div>
      ))}
    </div>
  );
};

export default PlatformStatus;
