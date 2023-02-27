import style from "./Pool.module.css";
import cn from "classnames";
import BackButton from "components/ui/BackButton";
import { SvgLink } from "assets/images/svg";
import { useParams } from "react-router-dom";
import { useLoansByPoolId, usePoolById } from "utils/hooks/pikachu/usePools";
import {
  beautifyAddress,
  toInteger,
  toString,
} from "utils/helpers/string.helpers";
import { PoolPanel } from "components/Pool";
import { Button, Refresh } from "components/ui";
import LoanPanel from "components/Pool/LoanPanel";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { refreshPools } from "utils/apis/pikachu.api";
import { useSettingStore } from "store";
import BorrowDrawer from "components/Pool/BorrowDrawer";

const Pool = () => {
  const account = useAccount();
  const { setRefreshedAt } = useSettingStore();
  const { poolId } = useParams();

  const [borrowDrawVisible, setBorrowDrawVisible] = useState(false);
  const pool = usePoolById(toInteger(poolId));

  const loans = useLoansByPoolId(toInteger(poolId));

  const myPool = useMemo(() => {
    return account?.address?.toLowerCase() === pool?.owner?.toLowerCase();
  }, [account, pool]);

  return (
    <div className={cn(style.root)}>
      {borrowDrawVisible ? (
        <BorrowDrawer pool={pool} setVisible={setBorrowDrawVisible} />
      ) : (
        <>
          <div className={cn(style.heading)}>
            <BackButton />
            <h3>{beautifyAddress(toString(pool?.owner))}'s Pool</h3>

            <a
              href="https://github.com/Pikachu-finance"
              target="_blank"
              rel="noreferrer"
              className={cn(style.link)}
            >
              Share Link
              <SvgLink />
            </a>

            {!myPool &&
              loans.findIndex(
                (item) =>
                  item.borrower === account.address?.toLowerCase() &&
                  item.status === 1
              ) === -1 && (
                <Button
                  variant="yellow"
                  onClick={() => setBorrowDrawVisible(true)}
                >
                  Borrow Now
                </Button>
              )}
          </div>

          <div className={cn(style.poolPanel)}>
            <div className={cn(style.head)}>
              <h4>
                <span className="hidden md:flex">Pool Contract</span>
                <span className="flex md:hidden">Pool Details</span>
              </h4>
              <span>
                <span className="text-tangerine-yellow">
                  Available Liquidity
                </span>
                / Total
              </span>
              <span>LTV</span>
              <span>Duration</span>
              <span>
                <span className="text-tangerine-yellow">Starting</span>/ Daily
                Interest
              </span>
              <span>
                <Refresh
                  action={async () => {
                    await refreshPools();
                    setRefreshedAt(new Date());
                  }}
                />
              </span>
            </div>

            {pool && (
              <PoolPanel
                pool={pool}
                poolId={toInteger(poolId)}
                buttonVisible={false}
              />
            )}
          </div>

          <h4 className={cn(style.loanHeading)}>
            All loans of the pool ({pool?.numberOfLoans.toNumber()})
          </h4>
          <div className={cn(style.loanPanel)}>
            <div className={cn(style.head)}>
              <h4>
                <span className="hidden md:flex">NFT</span>
                <span className="flex md:hidden">
                  All loans of the pool ({pool?.numberOfLoans.toNumber()})
                </span>
              </h4>
              <span>Borrower</span>
              <span>Amount + Interest</span>
              <span>Interest</span>
              <span>Fund Date</span>
              <span>Status</span>
              <span>
                <Refresh
                  action={async () => {
                    await refreshPools();
                    setRefreshedAt(new Date());
                  }}
                />
              </span>
            </div>

            {pool &&
              loans.map((loan, index) => (
                <LoanPanel key={index} loan={loan} pool={pool} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Pool;
