import {
  ADMIN_ADDRESSES,
  MARKETPLACE_ADDRESSES,
  NFT_1_ADDRESSES,
  NFT_2_ADDRESSES,
  PIKACHU_ADDRESSES,
} from "utils/constants/address.constant";
import { useChainId } from "./useChainId";

export const useAdminAddress = () => {
  const chainId = useChainId();
  return ADMIN_ADDRESSES[chainId];
};

export const usePikachuAddress = () => {
  const chainId = useChainId();
  return PIKACHU_ADDRESSES[chainId];
};

export const useMarketplaceAddress = () => {
  const chainId = useChainId();
  return MARKETPLACE_ADDRESSES[chainId];
};

export const useNFT1Address = () => {
  const chainId = useChainId();
  return NFT_1_ADDRESSES[chainId];
};

export const useNFT2Address = () => {
  const chainId = useChainId();
  return NFT_2_ADDRESSES[chainId];
};
