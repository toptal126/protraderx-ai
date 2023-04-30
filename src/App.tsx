import { useEffect } from "react";
import Footer from "components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home";
import Header from "components/Header";
import Demo from "pages/Demo";
import Pool from "pages/Pool";
import Pools from "pages/Pools";
// import Borrow from "pages/BorrowDrawer";
import { useSigner, useAccount } from "wagmi";
import { useAccountStore, useSettingStore } from "store";
import { toFloat, toString } from "utils/helpers/string.helpers";
import { ethers } from "ethers";
import Setting from "pages/Setting";
import { useAdminSetting } from "utils/hooks/pikachu/useAdminSetting";
import { TxConfirmModal } from "components/Common";
import TxRejectModal from "components/Common/TxRejectModal";
import TxSubmitModal from "components/Common/TxSubmitModal";
import Lend from "pages/Lend";
import Loan from "pages/Loan";
import Dashboard from "pages/Dashboard";

import {
  useAllLoans,
  useLoansByBorrower,
  usePools,
} from "utils/hooks/pikachu/usePools";
import Collections from "pages/Collections";
// import Borrow from "pages/Borrow";
import { useHoldingNfts } from "utils/hooks/useHoldingNfts";
import Navbar from "components/Navbar";
import Mortgage from "pages/Mortgage/Mortgage";

function App() {
  const account = useAccount();
  const signer = useSigner();

  const { initializeAccount } = useAccountStore();
  const { initializeSetting, refreshedAt } = useSettingStore();

  const adminSetting = useAdminSetting();
  const myLoans = useLoansByBorrower(account?.address || "");
  const pools = usePools();
  const allLoans = useAllLoans();
  const nfts = useHoldingNfts(account?.address || "");

  useEffect(() => {
    initializeSetting(adminSetting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminSetting]);

  useEffect(() => {
    if (signer.data)
      signer.data?.getBalance().then(async (balance) => {
        initializeAccount(
          toFloat(ethers.utils.formatEther(balance)),
          toString(account.address).toLowerCase(),
          myLoans,
          pools,
          allLoans,
          nfts
        );
      });
    else {
      initializeAccount(
        0,
        toString(account.address).toLowerCase(),
        myLoans,
        pools,
        allLoans,
        nfts
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    account.address,
    initializeAccount,
    refreshedAt,
    myLoans,
    pools,
    allLoans,
    nfts,
  ]);
  return (
    <div className="main-container">
      <>
        <TxConfirmModal />
        <TxRejectModal />
        <TxSubmitModal />
      </>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/setting/*" element={<Setting />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/loan/*" element={<Loan />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/pool/:owner/:poolId" element={<Pool />} />
          <Route path="/mortgage/*" element={<Mortgage />} />
          {/* <Route path="/pool/:owner/:poolId/borrow" element={<Borrow />} /> */}
        </Routes>
      </main>
      <Footer />
      <Navbar />
    </div>
  );
}
export default App;
