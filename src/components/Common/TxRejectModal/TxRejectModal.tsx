import style from "./TxRejectModal.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { AceModal, Button } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { useSettingStore } from "store";
import { SvgError } from "assets/images/svg";

const TxRejectModal = () => {
  const { txRejectModalVisible, setTxRejectModalVisible, txDescription } =
    useSettingStore();

  return (
    <AceModal
      modalVisible={txRejectModalVisible}
      setModalVisible={setTxRejectModalVisible}
    >
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Error
          <CloseButton setModalVisible={setTxRejectModalVisible} />
        </div>
        <div className={cn(style.body)}>
          <SvgError />
          <span>{txDescription}</span>
        </div>
        <div className={cn(style.footer)}>
          <Button variant="gray" onClick={() => setTxRejectModalVisible(false)}>
            Dismiss
          </Button>
        </div>
      </div>
    </AceModal>
  );
};

export default TxRejectModal;
