import create from "zustand";
import produce from "immer";
import { TAdminSettingStruct } from "utils/hooks/pikachu/useAdminSetting";
import axios from "axios";
import { API_URL } from "utils/constants/api.constants";
import { ContractTransaction, ethers } from "ethers";
import { getEtherPrice } from "utils/apis/etherscan.api";

interface ISettingState {
  etherusd: number;
  refreshedAt: Date;
  setRefreshedAt: {
    (_refreshedAt: Date): void;
  };

  setting: TAdminSettingStruct;
  collections: ICollection[];
  initializeSetting: {
    (_setting: TAdminSettingStruct): Promise<void>;
  };
  replaceCollection: {
    (_old: string, _new: string): Promise<void>;
  };
  updateSetting: {
    (_setting: TAdminSettingStruct): void;
  };

  txDescription: string;
  txConfirmationModalVisible: boolean;
  setTxConfirmationModalVisible: {
    (_visible: boolean): void;
  };

  txRejectModalVisible: boolean;
  setTxRejectModalVisible: {
    (_visible: boolean): void;
  };

  txSubmitModalVisible: boolean;
  setTxSubmitModalVisible: {
    (_visible: boolean): void;
  };

  setTxDescription: {
    (_description: string): void;
  };

  submitTransaction: {
    (_txObj: Promise<ContractTransaction>, _callback?: any): Promise<any>;
  };
}

export interface ICollection {
  contract: string;
  name: string;
  symbol: string;
  imageUrl?: string;
  externalUrl?: string;
  description?: string;
  totalSupply: number;
  floorPrice: number;
  contractDeployer?: string;
  deployedBlockNumber?: number;
}

export const useSettingStore = create<ISettingState>((set, get) => ({
  etherusd: 0,

  refreshedAt: new Date(),
  setRefreshedAt: (_refreshedAt) => {
    set(
      produce((state: ISettingState) => {
        state.refreshedAt = _refreshedAt;
      })
    );
  },

  setting: {
    blockNumberSlippage: 0,
    feeTo: "",
    minDepositAmount: 0,
    platformFee: 0,
    verifiedCollections: [],
    stableCoins: [],
  },
  collections: [],

  initializeSetting: async (_setting) => {
    if (_setting.feeTo === "" || get().setting.feeTo === _setting.feeTo) return;
    const [_response, _etherusd] = await Promise.all([
      axios.post(`${API_URL}/pools/collections`, {
        verifiedCollections: _setting.verifiedCollections.map((item) =>
          item.toLowerCase()
        ),
      }),
      getEtherPrice(),
    ]);
    set(
      produce((state: ISettingState) => {
        state.setting = _setting;
        state.collections = _response.data;
        state.etherusd = _etherusd;
      })
    );
  },

  replaceCollection: async (_old, _new) => {
    if (_new === "") {
      set(
        produce((state: ISettingState) => {
          state.setting.verifiedCollections =
            state.setting.verifiedCollections.filter(
              (_item) => _item.toLowerCase() !== _old.toLowerCase()
            );
        })
      );
      set(
        produce((state: ISettingState) => {
          state.collections = state.collections.filter(
            (_item) => _item.contract !== _old
          );
        })
      );
      return;
    }
    if (!ethers.utils.isAddress(_new)) return;
    if (_old === "") {
      const _response = await axios.get(`${API_URL}/pools/collection/${_new}`);

      set(
        produce((state: ISettingState) => {
          state.setting.verifiedCollections.push(_new);
        })
      );

      set(
        produce((state: ISettingState) => {
          state.collections.push(_response.data);
        })
      );
    }
  },

  updateSetting: (_setting) => {
    set(
      produce((state: ISettingState) => {
        state.setting = _setting;
      })
    );
  },

  txDescription: "",
  txConfirmationModalVisible: false,
  setTxConfirmationModalVisible: (_visible) => {
    set(
      produce((state: ISettingState) => {
        state.txConfirmationModalVisible = _visible;
      })
    );
  },
  setTxDescription: (_description) => {
    set(
      produce((state: ISettingState) => {
        state.txDescription = _description;
      })
    );
  },

  txRejectModalVisible: false,
  setTxRejectModalVisible: (_visible) => {
    set(
      produce((state: ISettingState) => {
        state.txRejectModalVisible = _visible;
      })
    );
  },

  txSubmitModalVisible: false,
  setTxSubmitModalVisible: (_visible) => {
    set(
      produce((state: ISettingState) => {
        state.txSubmitModalVisible = _visible;
      })
    );
  },

  submitTransaction: async (_txObj, _callback) => {
    _txObj
      .then((result) => {
        get().setTxConfirmationModalVisible(false);
        get().setTxDescription(result.hash);
        get().setTxSubmitModalVisible(true);

        result.wait().then(() => {
          if (_callback) _callback();
        });

        // console.log(result);
      })
      .catch((error) => {
        get().setTxConfirmationModalVisible(false);
        get().setTxRejectModalVisible(true);
        if (error.code === "ACTION_REJECTED")
          get().setTxDescription("Transaction rejected");
        else
          get().setTxDescription(
            `The transaction cannot succeed due to error: ${error.code}.`
          );
      });
  },
}));
