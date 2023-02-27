import { BigNumber, BigNumberish } from "ethers";
import { useCallback, useEffect, useState, useMemo } from "react";
import { toInteger } from "utils/helpers/string.helpers";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
// import { BIG_TEN } from "utils/constants/number.contants";
import { usePikachuContract } from "../useContract";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { useSettingStore } from "store";
import {
  getAllLoans,
  getLoanByPoolIdAndBorrower,
  getLoansByBorrower,
  getLoansByPoolId,
  getLoansByPoolIdAndBorrower,
} from "utils/apis/pikachu.api";

export type TLoanStruct = {
  poolId: number;
  borrower: string;
  amount: BigNumberish;
  duration: BigNumberish;
  collection?: string;
  collectionContract?: string;
  tokenId: BigNumberish;
  status: number;
  blockNumber: BigNumberish;
  timestamp: BigNumberish;
  interestType: number;
  interestStartRate: BigNumberish;
  interestCapRate: BigNumberish;
  repaidAt: string | Date;
  thumbnail?: string;
};

export const useOwner = () => {
  const Pikachu = usePikachuContract();
  const [owner, setOwner] = useState("");

  const getOwner = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _owner = await Pikachu.owner();
        setOwner(_owner);
      } catch (error) {
        setOwner("");
        console.log(error);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getOwner();
  }, [getOwner]);

  return owner;
};
export const useTotalPools = () => {
  const { refreshedAt } = useSettingStore();
  const Pikachu = usePikachuContract();
  const [totalPools, setTotalPools] = useState(0);

  const getTotalPools = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _totalPools = await Pikachu.totalPools();
        setTotalPools(_totalPools.toNumber());
      } catch (error) {
        setTotalPools(0);
        console.log(error);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getTotalPools();
  }, [getTotalPools, refreshedAt]);

  return totalPools;
};

export const usePools = () => {
  const { refreshedAt } = useSettingStore();
  const Pikachu = usePikachuContract();
  const [pools, setPools] = useState<IPikachu.PoolStructOutput[]>([]);

  const getPools = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const totalPools = await Pikachu.totalPools();
        const integerArray = Array.from(
          { length: totalPools.toNumber() },
          (_, i) => i
        );

        const _pools = await Promise.all(
          integerArray.map((index) => Pikachu.getPoolById(index))
        );
        setPools(_pools);
      } catch (error) {
        setPools([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getPools();
  }, [getPools, refreshedAt]);

  return pools;
};
export const usePoolByOwner = (owner: string) => {
  const { refreshedAt } = useSettingStore();
  const Pikachu = usePikachuContract();
  const [pools, setPools] = useState<IPikachu.PoolStructOutput[]>([]);

  const getPools = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _pools = await Pikachu.getPoolsByOwner(owner);
        setPools(_pools);
      } catch (error) {
        setPools([]);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getPools();
  }, [getPools, owner, refreshedAt]);

  return pools;
};

export const useLoanByPoolIdAndBorrower = (
  poolId: number,
  borrower: string
) => {
  const { refreshedAt } = useSettingStore();
  const [loan, setLoan] = useState<TLoanStruct>({
    poolId: 0,
    amount: 0,
    blockNumber: 0,
    borrower: "",
    collection: "",
    duration: 0,
    interestCapRate: 0,
    interestStartRate: 0,
    interestType: 0,
    status: 0,
    timestamp: 0,
    tokenId: 0,
    repaidAt: new Date(0),
  });

  const getLoan = useCallback(async () => {
    try {
      const _loan = await getLoanByPoolIdAndBorrower(poolId, borrower);
      setLoan(_loan);
    } catch (error) {
      // setLoan([]);
      // console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId, borrower]);

  useEffect(() => {
    getLoan();
  }, [getLoan, refreshedAt]);

  return loan;
};

export const useAllLoans = () => {
  const { refreshedAt } = useSettingStore();
  const [loan, setLoan] = useState<TLoanStruct[]>([]);

  const getLoan = useCallback(async () => {
    try {
      const _loan = await getAllLoans();
      setLoan(_loan);
    } catch (error) {
      // setLoan([]);
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getLoan();
  }, [getLoan, refreshedAt]);

  return loan;
};
export const useLoans = (poolId: number, borrower: string) => {
  const { refreshedAt } = useSettingStore();
  const [loan, setLoan] = useState<TLoanStruct>({
    poolId: 0,
    amount: 0,
    blockNumber: 0,
    borrower: "",
    collection: "",
    duration: 0,
    interestCapRate: 0,
    interestStartRate: 0,
    interestType: 0,
    status: 0,
    timestamp: 0,
    tokenId: 0,
    repaidAt: new Date(0),
  });

  const getLoan = useCallback(async () => {
    try {
      const _loan = await getLoansByPoolIdAndBorrower(poolId, borrower);
      setLoan(_loan);
    } catch (error) {
      // setLoan([]);
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId, borrower]);

  useEffect(() => {
    getLoan();
  }, [getLoan, refreshedAt]);

  return loan;
};

export const useLoansByPoolId = (poolId: number) => {
  const { refreshedAt } = useSettingStore();
  const [loans, setLoans] = useState<TLoanStruct[]>([]);

  const getLoans = useCallback(async () => {
    try {
      const _response = await getLoansByPoolId(poolId);
      setLoans(_response);
    } catch (error) {
      // setLoans([]);
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolId]);

  useEffect(() => {
    getLoans();
  }, [getLoans, refreshedAt]);

  return loans;
};

export const useLoansByBorrower = (address: string) => {
  const { refreshedAt } = useSettingStore();

  const [loans, setLoans] = useState<TLoanStruct[]>([]);

  const getLoans = useCallback(async () => {
    if (!address) {
      setLoans([]);
      return;
    }
    try {
      const _response = await getLoansByBorrower(address);
      setLoans(_response);
    } catch (error) {
      // setLoans([]);
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    getLoans();
  }, [getLoans, refreshedAt]);

  return loans;
};

export const useRepayingAmount = (loan: TLoanStruct) => {
  const Pikachu = usePikachuContract();
  const [repayingAmount, setRepayingAmount] = useState<BigNumberish>(
    BigNumber.from("0")
  );

  const getRepayingAmount = useCallback(async () => {
    if (Pikachu.provider && loan)
      try {
        if (loan.status === 0) {
          setRepayingAmount(0);
          return;
        }
        const _repayingAmount = await Pikachu.calculateRepayAmount(
          toInteger(new Date().getTime() / 1000) - toInteger(loan.timestamp),
          loan.interestType,
          loan.interestStartRate,
          loan.interestCapRate,
          loan.amount
        );
        setRepayingAmount(_repayingAmount);
      } catch (error) {
        setRepayingAmount(0);
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider, loan]);

  useEffect(() => {
    getRepayingAmount();
  }, [getRepayingAmount]);

  return repayingAmount;
};

export const usePoolById = (poolId: number): IPikachu.PoolStructOutput => {
  const { refreshedAt } = useSettingStore();
  const Pikachu = usePikachuContract();
  const [pool, setPool] = useState<IPikachu.PoolStructOutput>();

  const getPool = useCallback(async () => {
    if (Pikachu.provider)
      try {
        const _pool = await Pikachu.getPoolById(poolId);
        setPool(_pool);
      } catch (error) {
        console.log(error);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pikachu.provider]);

  useEffect(() => {
    getPool();
  }, [getPool, refreshedAt]);

  //@ts-ignore
  return pool;
};

export const useCalculateRepayAmount = (
  _amount: number,
  _interestType: number,
  _interestStartRate: number, // basis point
  _interestCapRate: number, // basis point
  _durationSecond: number // second
) => {
  return useMemo(() => {
    const durationInDays = Math.ceil(_durationSecond / SECONDS_PER_DAY);

    if (_interestType === 0) {
      return (
        _amount +
        (_amount * (_interestStartRate + durationInDays * _interestCapRate)) /
          10000
      );
    } else {
      return (
        _amount +
        (_amount * _interestStartRate) / 10000 +
        (_amount * Math.sqrt(durationInDays * 10000) * _interestCapRate) /
          1000000
      );
    }
  }, [
    _amount,
    _interestType,
    _interestStartRate,
    _interestCapRate,
    _durationSecond,
  ]);
};
