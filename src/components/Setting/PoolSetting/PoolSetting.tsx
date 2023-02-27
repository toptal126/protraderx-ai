import { useState } from "react";
import { useSettingStore } from "store";

import style from "./PoolSetting.module.css";
import cn from "classnames";
import { Button } from "components/ui";
import { ethers } from "ethers";
import { SvgEthereum } from "assets/images/svg";
import FeeToModal from "../Modals/FeeToModal";
import PlatformFeeModal from "../Modals/PlatformFeeModal";
import MinDepositModal from "../Modals/MinDepositModal";
import BlockSlippageModal from "../Modals/BlockSlippageModal";
import { toFloat, toInteger } from "utils/helpers/string.helpers";

const PoolSetting = () => {
  const { setting, updateSetting } = useSettingStore();

  const [input, setInput] = useState("");

  const [feeToModalVisible, setFeeToModalVisible] = useState(false);
  const [platformFeeModalVisible, setPlatformFeeModalVisible] = useState(false);
  const [minDepositModalVisible, setMinDepositModalVisible] = useState(false);
  const [blockSlippageModalVisible, setBlockSlippageModalVisible] =
    useState(false);

  return (
    <div className={cn(style.root)}>
      <>
        <FeeToModal
          input={input}
          visible={feeToModalVisible}
          setVisible={setFeeToModalVisible}
          onConfirm={(value: string) => {
            updateSetting({ ...setting, feeTo: value });
            setFeeToModalVisible(false);
          }}
        />

        <PlatformFeeModal
          input={input}
          visible={platformFeeModalVisible}
          setVisible={setPlatformFeeModalVisible}
          onConfirm={(platformFee: string) => {
            updateSetting({
              ...setting,
              platformFee: toFloat(platformFee) * 100,
            });
            setPlatformFeeModalVisible(false);
          }}
        />
        <MinDepositModal
          input={input}
          visible={minDepositModalVisible}
          setVisible={setMinDepositModalVisible}
          onConfirm={(minDepositAmount: string) => {
            updateSetting({
              ...setting,
              minDepositAmount: ethers.utils.parseEther(minDepositAmount),
            });
            setMinDepositModalVisible(false);
          }}
        />
        <BlockSlippageModal
          input={input}
          visible={blockSlippageModalVisible}
          setVisible={setBlockSlippageModalVisible}
          onConfirm={(blockNumberSlippage: string) => {
            updateSetting({
              ...setting,
              blockNumberSlippage: toInteger(blockNumberSlippage),
            });
            setBlockSlippageModalVisible(false);
          }}
        />
      </>

      <div className={cn(style.fee)}>
        <span className={cn(style.label)}>Fee Settings</span>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Fee Receiving Address</span>
          <span className={cn(style.value)}>{setting.feeTo}</span>
          <Button
            variant="yellow"
            onClick={() => {
              setInput(setting.feeTo);
              setFeeToModalVisible(true);
            }}
          >
            Edit
          </Button>
        </div>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Platform Fee</span>
          <span className={cn(style.value)}>{setting.platformFee / 100}%</span>
          <Button
            variant="yellow"
            onClick={() => {
              setInput(setting.platformFee.toString());
              setPlatformFeeModalVisible(true);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className={cn(style.pool)}>
        <span className={cn(style.label)}>Pool Settings</span>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Min Deposit Amount</span>
          <span className={cn(style.value)}>
            {ethers.utils.formatEther(setting.minDepositAmount)} <SvgEthereum />
          </span>
          <Button
            variant="yellow"
            onClick={() => {
              setInput(ethers.utils.formatEther(setting.minDepositAmount));
              setMinDepositModalVisible(true);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className={cn(style.block)}>
        <span className={cn(style.label)}>Basic Settings</span>

        <div className={cn(style.row)}>
          <span className={cn(style.label)}>Block Number Slippage</span>
          <span className={cn(style.value)}>{setting.blockNumberSlippage}</span>
          <Button
            variant="yellow"
            onClick={() => {
              setInput(setting.blockNumberSlippage.toString());
              setBlockSlippageModalVisible(true);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PoolSetting;
