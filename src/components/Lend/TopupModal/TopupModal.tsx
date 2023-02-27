import { useState } from "react";
import cn from "classnames";
import style from "./TopupModal.module.css";
// import { useSettingStore } from "store";
import { AceModal, Button, Input } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { useAccountStore, useSettingStore } from "store";
import { SvgEthereum } from "assets/images/svg";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import { beautifyDecimals } from "utils/helpers/string.helpers";
import { usePikachuContract } from "utils/hooks/useContract";
import { ethers } from "ethers";
import { refreshPools } from "utils/apis/pikachu.api";

type IProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  pool: IPikachu.PoolStructOutput;
};

const TopupModal = ({ visible, setVisible, pool }: IProps) => {
  const [amount, setAmount] = useState("");

  const Pikachu = usePikachuContract();
  const { balance } = useAccountStore();
  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    setRefreshedAt,
  } = useSettingStore();

  const onConfirm = async () => {
    setTxDescription(`Depositing ${amount} ETH to this pool...`);
    setVisible(false);
    setTxConfirmationModalVisible(true);
    submitTransaction(
      Pikachu.depositToPool(pool.poolId, {
        value: ethers.utils.parseEther(amount),
      }),
      async () => {
        await refreshPools();
        setRefreshedAt(new Date());
      }
    );
  };
  return (
    <AceModal modalVisible={visible} setModalVisible={setVisible}>
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Top up funds to the pool
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          <div>
            <span>Pool size (total liquidity):</span>
            <span>
              {beautifyDecimals(pool.depositedAmount)}
              <SvgEthereum />
            </span>
          </div>

          <div>
            <span>Locked amount:</span>
            <span>
              {beautifyDecimals(pool.totalLoans)}
              <SvgEthereum />
            </span>
          </div>

          <div>
            <span>Amount available:</span>
            <span>
              {beautifyDecimals(pool.availableAmount)}
              <SvgEthereum />
            </span>
          </div>

          <div>
            <span className="">Top up amount:</span>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              icon={
                <span
                  className={cn(style.inputIcon)}
                  onClick={() => {
                    setAmount((balance - 0.01).toFixed(2));
                  }}
                >
                  MAX <SvgEthereum />
                </span>
              }
            />
          </div>

          <div>Balance: {balance.toFixed(2)} ETH</div>
        </div>
        <div className={cn(style.footer)}>
          <Button onClick={() => setVisible(false)}>Dismiss</Button>
          <Button variant="yellow" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </AceModal>
  );
};

export default TopupModal;
