import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { TLoanStruct } from "utils/hooks/pikachu/usePools";
import { formatEther, toFloat, toInteger } from "./string.helpers";

export const calculateRepayAmount = (
  _amount: number,
  _interestType: number,
  _interestStartRate: number, // basis point
  _interestCapRate: number, // basis point
  _durationSecond: number // second
) => {
  const durationInDays = toInteger(_durationSecond / SECONDS_PER_DAY);

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
      (_amount * Math.sqrt(durationInDays * 10000) * _interestCapRate) / 1000000
    );
  }
};

export const calculateRepayAmountFromLoan = (loan: TLoanStruct) => {
  let durationInDays = 0;
  if (loan.status === 1)
    durationInDays = Math.floor(
      (new Date().getTime() - toInteger(loan.timestamp)) /
        1000 /
        SECONDS_PER_DAY
    );
  else
    durationInDays = Math.floor(
      (new Date(loan.repaidAt).getTime() - toInteger(loan.timestamp)) /
        1000 /
        SECONDS_PER_DAY
    );

  if (loan.interestType === 0) {
    return (
      formatEther(loan.amount) +
      (formatEther(loan.amount) *
        (toFloat(loan.interestStartRate) * 100 +
          durationInDays * toFloat(loan.interestCapRate) * 100)) /
        10000
    );
  } else {
    return (
      formatEther(loan.amount) +
      (formatEther(loan.amount) * toFloat(loan.interestStartRate) * 100) /
        10000 +
      (formatEther(loan.amount) *
        Math.sqrt(durationInDays * 10000) *
        toFloat(loan.interestCapRate) *
        100) /
        1000000
    );
  }
};

// console.log(calculateRepayAmount(1, 0, 0, 876, 7));
