import {
  Marketplace__factory,
  Pikachu__factory,
  TestNFT__factory,
} from "utils/typechain-types";
import { useSigner, useProvider } from "wagmi";

import {
  useMarketplaceAddress,
  useNFT1Address,
  useNFT2Address,
  usePikachuAddress,
} from "./useAddress";

// const useERC20Contract = (address: string) => {
//   const { data: signer } = useSigner();
//   // @ts-ignore
//   return Erc20__factory.connect(address, signer).deployed();
// };

export const usePikachuContract = () => {
  const { data: signer } = useSigner();
  const address = usePikachuAddress();
  const provider = useProvider();

  // @ts-ignore
  return Pikachu__factory.connect(address, signer || provider);
};

export const useMarketplaceContract = () => {
  const { data: signer } = useSigner();
  const address = useMarketplaceAddress();
  const provider = useProvider();

  // @ts-ignore
  return Marketplace__factory.connect(address, signer || provider);
};

export const useERC721Contract = (address: string) => {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const _address = useNFT2Address();

  // @ts-ignore
  return TestNFT__factory.connect(address || _address, signer || provider);
};
export const useNFT1Contract = () => {
  const { data: signer } = useSigner();
  const address = useNFT1Address();
  const provider = useProvider();

  // @ts-ignore
  return TestNFT__factory.connect(address, signer || provider);
};

export const useNFT2Contract = () => {
  const { data: signer } = useSigner();
  const address = useNFT2Address();
  const provider = useProvider();

  // @ts-ignore
  return TestNFT__factory.connect(address, signer || provider);
};
