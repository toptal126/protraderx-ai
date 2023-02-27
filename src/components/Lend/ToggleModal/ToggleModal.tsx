import cn from "classnames";
import style from "./ToggleModal.module.css";
// import { useSettingStore } from "store";
import { AceModal, Button } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { useSettingStore } from "store";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import { usePikachuContract } from "utils/hooks/useContract";
import { refreshPools } from "utils/apis/pikachu.api";

type IProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  pool: IPikachu.PoolStructOutput;
};

const TopupModal = ({ visible, setVisible, pool }: IProps) => {
  const Pikachu = usePikachuContract();
  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    setRefreshedAt,
  } = useSettingStore();

  const onConfirm = async () => {
    setTxDescription(
      pool.paused ? `Resuming this pool...` : `Pausing this pool...`
    );
    setVisible(false);
    setTxConfirmationModalVisible(true);
    submitTransaction(
      Pikachu.setPaused(pool.poolId, !pool.paused),
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
          {pool.paused ? "Enable the pool" : "Disable the pool"}
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          {pool.paused ? (
            <p>
              Are you sure you want to enable this pool? New loans will be able
              to create in this pool.
            </p>
          ) : (
            <>
              <p>Are you sure you want to disable this pool?</p>
              <div>
                <span className="font-bold">
                  This pool will no longer display in the market and no new
                  loans will be created.
                </span>{" "}
                This operation will not affect the ongoing open loans.
              </div>
            </>
          )}
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
