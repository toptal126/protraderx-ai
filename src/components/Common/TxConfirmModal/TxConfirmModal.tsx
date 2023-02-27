import style from "./TxConfirmModal.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { AceModal } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { useSettingStore } from "store";
import { SvgLoaders } from "assets/images/svg";

const TxConfirmModal = () => {
  const {
    txConfirmationModalVisible,
    setTxConfirmationModalVisible,
    txDescription,
  } = useSettingStore();

  return (
    <AceModal
      modalVisible={txConfirmationModalVisible}
      setModalVisible={setTxConfirmationModalVisible}
    >
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Waiting for confirmation
          <CloseButton setModalVisible={setTxConfirmationModalVisible} />
        </div>
        <div className={cn(style.body)}>
          <SvgLoaders />
          <span>{txDescription}</span>
        </div>
        <div className={cn(style.footer)}>
          <span>Confirm this transaction in your wallet</span>
        </div>
      </div>
    </AceModal>
  );
};

export default TxConfirmModal;
