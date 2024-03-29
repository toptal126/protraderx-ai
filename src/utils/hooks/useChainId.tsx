import { useNetwork } from "wagmi";

export const useChainId = (): "1" | "80001" => {
  const network = useNetwork();
  //   @ts-ignore

  return (network.chain?.id === 80001 ? 80001 : 1).toString();
};
