import create from "zustand";
import produce from "immer";
import { TLoanStruct } from "utils/hooks/pikachu/usePools";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";

export interface NFTItem {
  contract: string;
  name: string;
  symbol: string;
  tokenId: number;
  floorPrice?: number;
  imgUrl?: string;
}

interface IAccountState {
  address: string;
  balance: number;
  nfts: NFTItem[];
  loans: TLoanStruct[];
  pools: IPikachu.PoolStructOutput[];
  allLoans: TLoanStruct[];
  initializeAccount: {
    (
      _balance: number,
      _address: string,
      _loans: TLoanStruct[],
      _pools: IPikachu.PoolStructOutput[],
      _allLoans: TLoanStruct[],
      _nfts: NFTItem[]
    ): Promise<any>;
  };
}

export const useAccountStore = create<IAccountState>((set, get) => ({
  address: "",
  balance: 0,
  nfts: [],
  loans: [],
  pools: [],
  allLoans: [],
  initializeAccount: async (
    _balance,
    _address,
    _loans,
    _pools,
    _allLoans,
    _nfts
  ) => {
    set(
      produce((state: IAccountState) => {
        state.address = _address;
        state.balance = _balance;
        state.nfts = _nfts;
        state.loans = _loans;
        state.pools = _pools;
        state.allLoans = _allLoans;
      })
    );
  },
}));
