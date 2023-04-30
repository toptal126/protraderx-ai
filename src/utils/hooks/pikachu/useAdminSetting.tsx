import { BigNumber, BigNumberish } from "ethers";
import { useCallback, useEffect, useState } from "react";
// import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
// import { BIG_TEN } from "utils/constants/number.contants";
import { usePikachuContract } from "../useContract";

export type TAdminSettingStruct = {
  feeTo: string;
  minDepositAmount: BigNumberish;
  platformFee: number;
  blockNumberSlippage: number;
  verifiedCollections: string[];
  stableCoins: string[];
};

export const useAdminSetting = () => {
  const Pikachu = usePikachuContract();
  const [adminSetting, setAdminSetting] = useState<TAdminSettingStruct>({
    feeTo: "",
    minDepositAmount: BigNumber.from("0"),
    platformFee: 0,
    blockNumberSlippage: 300,
    verifiedCollections: [],
    stableCoins: [],
  });

  const getAdminSetting = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const [_adminSetting, verifiedCollections] = await Promise.all([
          Pikachu.adminSetting(),
          Pikachu.verifiedCollections(),
        ]);

        setAdminSetting({
          ..._adminSetting,
          verifiedCollections,
          stableCoins: [],
        });
      } catch (error) {
        // setAdminSetting(0);
        console.log(error);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getAdminSetting();
  }, [getAdminSetting]);

  return adminSetting;
};
