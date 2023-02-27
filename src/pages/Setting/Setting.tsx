import { Navigate, Route, Routes } from "react-router-dom";
import { useSettingStore } from "store";

import style from "./Setting.module.css";
import cn from "classnames";

import { Button, NavigationTab } from "components/ui";
import { CollectionSetting, PoolSetting } from "components/Setting";
import { usePikachuContract } from "utils/hooks/useContract";

const SettingPages = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="collections" replace />} />
      <Route path="collections" element={<CollectionSetting />} />
      <Route path="pools" element={<PoolSetting />} />
    </Routes>
  );
};

const Setting = () => {
  const Pikachu = usePikachuContract();

  const {
    setting,
    setTxDescription,

    setTxConfirmationModalVisible,
    submitTransaction,
  } = useSettingStore();

  const updateSetting = async () => {
    // setTxDescription("Transaction rejected");
    // setTxSubmitModalVisible(true);
    // return;

    setTxDescription("Updating Platform Setting...");
    setTxConfirmationModalVisible(true);

    submitTransaction(Pikachu.updateAdminSetting(setting));
  };

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Admin Settings</h3>

        <Button variant="yellow" onClick={updateSetting}>
          Update
        </Button>
      </div>
      <div className={cn(style.navtab)}>
        <NavigationTab
          tabs={[
            { link: "collections", text: "Verified Collections" },
            { link: "pools", text: "Pool Settings" },
          ]}
        />
      </div>
      <SettingPages />
    </div>
  );
};

export default Setting;
