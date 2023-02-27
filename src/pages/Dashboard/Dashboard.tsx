import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import cn from "classnames";
import style from "./Dashboard.module.css";

import PlatformStatus from "components/Common/PlatformStatus";

import { useAccountStore, useSettingStore } from "store";
import FlexTab from "components/ui/FlexTab";
import { Assets, Overview, Loans, LendingLoans } from "components/Dashboard";

const DashboardPages = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="" replace />} />
      <Route path="" element={<Overview />} />
      <Route path="assets" element={<Assets />} />
      <Route path="openloans" element={<LendingLoans />} />
      <Route path="activity" element={<Loans />} />
    </Routes>
  );
};

const Dashboard = () => {
  const { collections } = useSettingStore();
  const { nfts } = useAccountStore();

  const validItems = useMemo(() => {
    return nfts.filter((nft) =>
      collections.find((collection) => collection.contract === nft.contract)
    );
  }, [nfts, collections]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <div>
          <h3>Dashboard</h3>
        </div>
        <PlatformStatus />
      </div>

      <div className={cn(style.navtab)}>
        <FlexTab
          tabs={[
            {
              link: "/dashboard",
              text: (
                <span>
                  Overview
                  <span className={cn(style.ribbon)}>New</span>
                </span>
              ),
            },
            {
              link: "/dashboard/assets",
              text: (
                <span>
                  Assets
                  <span className={cn(style.badge)}>{validItems.length}</span>
                </span>
              ),
            },
            {
              link: "/dashboard/openloans",
              text: <span>Open loans</span>,
            },
            {
              link: "/dashboard/activity",
              text: <span>Activity</span>,
            },
          ]}
        />
      </div>

      <DashboardPages />
    </div>
  );
};

export default Dashboard;
