import { useState, useCallback, useEffect } from "react";
import { NFTItem, useAccountStore, useSettingStore } from "store";

import { useERC721Contract, useMarketplaceContract } from "../useContract";
import { BigNumberish } from "ethers";
import { useMarketplaceAddress } from "../useAddress";

export type TSaleStruct = {
  nftAddress: string;
  tokenId: BigNumberish;
  seller: string;
  price: BigNumberish;
  active: boolean;
};

export const useSaleObjects = (nfts: NFTItem[]) => {
  const { refreshedAt } = useSettingStore();
  const marketplace = useMarketplaceContract();
  const [saleObjects, setSaleObjects] = useState<TSaleStruct[]>([]);

  const getObjects = useCallback(async () => {
    if (marketplace.provider)
      try {
        const _saleObjects = await Promise.all(
          nfts.map((nft) => marketplace.sales(nft.contract, nft.tokenId))
        );
        setSaleObjects(_saleObjects);
      } catch (error) {
        setSaleObjects([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketplace.provider, nfts]);

  useEffect(() => {
    getObjects();
  }, [getObjects, nfts, refreshedAt]);

  return saleObjects;
};

export const useIsApprovedForAll = (nft: NFTItem) => {
  const { refreshedAt } = useSettingStore();
  const marketplaceAddress = useMarketplaceAddress();
  const nftContract = useERC721Contract(nft.contract);
  const { address } = useAccountStore();
  const [isApprovedForAll, setIsApprovedForAll] = useState(false);

  const getResult = useCallback(async () => {
    if (nftContract.provider)
      try {
        const _isApprovedForAll = await nftContract.isApprovedForAll(
          address,
          marketplaceAddress
        );
        setIsApprovedForAll(_isApprovedForAll);
      } catch (error) {
        setIsApprovedForAll(false);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nftContract.provider, nft]);

  useEffect(() => {
    getResult();
  }, [getResult, nft, refreshedAt]);

  return isApprovedForAll;
};
