import axios from "axios";
import { NFTItem } from "store";
import { API_URL } from "utils/constants/api.constants";
import { TLoanStruct } from "utils/hooks/pikachu/usePools";

export const getSignature = async (
  collection: string
): Promise<{
  floorPrice: number;
  signature: string;
  blockNumber: number;
}> => {
  const _response = await axios.get(`${API_URL}/pools/signature/${collection}`);

  return _response.data;
};

export const refreshPools = async () => {
  await axios.get(`${API_URL}/pools/update`);
};

export const getAllLoans = async (): Promise<TLoanStruct[]> => {
  const _response = await axios.get(`${API_URL}/loans`);
  return _response.data;
};

export const getLoansByPoolIdAndBorrower = async (
  poolId: number,
  borrower: string
): Promise<TLoanStruct> => {
  const _response = await axios.get(`${API_URL}/loans/${poolId}/${borrower}`);
  return _response.data;
};

export const getLoanByPoolIdAndBorrower = async (
  poolId: number,
  borrower: string
): Promise<TLoanStruct> => {
  const _response = await axios.get(
    `${API_URL}/loans/latest/${poolId}/${borrower}`
  );
  return _response.data;
};

export const getLoansByPoolId = async (
  poolId: number
): Promise<TLoanStruct[]> => {
  const _response = await axios.get(`${API_URL}/loans/pool/${poolId}`);
  return _response.data;
};

export const getLoansByBorrower = async (
  borrower: string
): Promise<TLoanStruct[]> => {
  const _response = await axios.get(`${API_URL}/loans/borrower/${borrower}`);
  return _response.data;
};
export const updateListingItem = async (
  item: NFTItem,
  isActive: boolean,
  price: number
): Promise<TLoanStruct[]> => {
  const _response = await axios.put(`${API_URL}/marketplace`, {
    item,
    isActive,
    price,
  });
  return _response.data;
};
