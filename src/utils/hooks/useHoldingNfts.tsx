import { useCallback, useState, useEffect } from "react";
import { NFTItem, useSettingStore } from "store";
import alchemy from "utils/apis/alchemy.api";
import { toInteger, toString } from "utils/helpers/string.helpers";

export const useHoldingNfts = (address: string) => {
  const { refreshedAt } = useSettingStore();
  const [nfts, setNfts] = useState<NFTItem[]>([]);

  const fetchNfts = useCallback(async () => {
    if (!address) {
      setNfts([]);
      return;
    }
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
    const _nfts: NFTItem[] = nftsForOwner.ownedNfts.map((nft) => ({
      contract: nft.contract.address,
      name: toString(nft.contract.name),
      symbol: toString(nft.contract.symbol),
      tokenId: toInteger(nft.tokenId),
      imgUrl: nft.media[0]?.thumbnail,
    }));
    setNfts(_nfts);
  }, [address]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts, address, refreshedAt]);

  return nfts;
};
