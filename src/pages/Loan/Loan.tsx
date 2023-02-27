import { Navigate, Route, Routes } from "react-router-dom";

import cn from "classnames";
import style from "./Loan.module.css";

import PlatformStatus from "components/Common/PlatformStatus";
import { Button, NavigationTab } from "components/ui";

import { SvgEthereum } from "assets/images/svg";
import { ClosedLoans, OpenLoans } from "components/Loan";
import { useAccountStore } from "store";
import { formatEther, toInteger } from "utils/helpers/string.helpers";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import LinkWithSearchParams from "components/LinkWithSearchParams";

const LoansPages = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="open" replace />} />
      <Route path="open" element={<OpenLoans />} />
      <Route path="closed" element={<ClosedLoans />} />
    </Routes>
  );
};

const Loan = () => {
  const { loans } = useAccountStore();
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <div>
          <h3>My Loans</h3>
          <p> Manage all your loans in history.</p>
        </div>
        <PlatformStatus />
      </div>

      <div className={cn(style.loaninfo)}>
        <div className={cn(style.status)}>
          <div className={cn(style.currentloans)}>
            <span>Current Loans</span>
            <div className={cn(style.info)}>
              <h3>
                {loans
                  .filter((item) => item.status === 1)
                  .reduce((prev, next) => prev + formatEther(next.amount), 0)}
              </h3>
              <SvgEthereum />
            </div>
            <p>Including all open loans and interest</p>
          </div>
          <div className={cn(style.nftlocked)}>
            <span>NFT Locked</span>
            <div className={cn(style.info)}>
              <h3>{loans.filter((item) => item.status === 1).length}</h3>
            </div>
            <div className={cn(style.addition)}>
              <p>NFT in grace period:</p>
              <b>
                {
                  loans.filter(
                    (item) =>
                      item.status === 1 &&
                      new Date(
                        new Date().getTime() +
                          1000 * (toInteger(item.duration) + SECONDS_PER_DAY)
                      ) > new Date()
                  ).length
                }
              </b>
            </div>
          </div>
        </div>
        <div className={cn(style.summary)}>
          <div>
            <span>Total Loans In History</span>
            <div className={cn(style.info)}>
              <h3>
                {loans.reduce(
                  (prev, next) => prev + formatEther(next.amount),
                  0
                )}
              </h3>
              <SvgEthereum />
            </div>
            <div className={cn(style.addition)}>
              <p>Loans made: </p>
              <b>{loans.length}</b>
              <LinkWithSearchParams to={{ pathname: "/" }}>
                <Button variant="yellow">Borrow</Button>
              </LinkWithSearchParams>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(style.navtab)}>
        <NavigationTab
          tabs={[
            {
              link: "open",
              text: `Open Loans (${
                loans.filter((item) => item.status === 1).length
              })`,
            },
            {
              link: "closed",
              text: `Closed Loans (${
                loans.filter((item) => item.status === 2 || item.status === 3)
                  .length
              })`,
            },
          ]}
        />
      </div>

      <LoansPages />
    </div>
  );
};

export default Loan;
