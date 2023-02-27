import axios from "axios";

export const ETHERSCAN_KEY = process.env.REACT_APP_ETHERSCAN_KEY;

export const getEtherPrice = async () => {
  try {
    const result = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_KEY}`
    );
    return result.data.result.ethusd;
  } catch (error) {
    return 0;
  }
};
