import style from "./TxSubmitModal.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { AceModal, Button } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { useSettingStore } from "store";
import { SvgLink, SvgSuccess } from "assets/images/svg";

const TxSubmitModal = () => {
  const { txSubmitModalVisible, setTxSubmitModalVisible, txDescription } =
    useSettingStore();

  return (
    <AceModal
      modalVisible={txSubmitModalVisible}
      setModalVisible={setTxSubmitModalVisible}
    >
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Transaction submitted
          <CloseButton setModalVisible={setTxSubmitModalVisible} />
        </div>
        <div className={cn(style.body)}>
          <SvgSuccess />
          <a
            href={`https://etherscan.io/tx/${txDescription}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
            <SvgLink />
          </a>
        </div>
        <div className={cn(style.footer)}>
          <Button
            variant="yellow"
            onClick={() => setTxSubmitModalVisible(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </AceModal>
  );
};

export default TxSubmitModal;
