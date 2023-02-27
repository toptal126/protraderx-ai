import { useCallback, useEffect, useState } from "react";
// import { BIG_TEN } from "utils/constants/number.contants";
import { useERC721Contract } from "./useContract";

export const useERC721Balance = (
  erc721Address: string,
  ownerAddress: string
) => {
  const NFT1Contract = useERC721Contract(erc721Address);
  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(async () => {
    if (ownerAddress) {
      try {
        const data = await NFT1Contract.balanceOf(ownerAddress);
        setBalance(data.toNumber());
      } catch (error) {
        setBalance(0);
        console.log(error);
      }
    }
  }, [NFT1Contract, ownerAddress]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
};
