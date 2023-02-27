import style from "./CollectionRemoveModal.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { AceModal, Button } from "components/ui";
import CloseButton from "components/ui/CloseButton";

interface IProps {
  address: string;
  onConfirm: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionRemoveModal = ({
  address,
  onConfirm,
  visible,
  setVisible,
}: IProps) => {
  return (
    <AceModal modalVisible={visible} setModalVisible={setVisible}>
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Delete Collection
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          <span>Are you sure you want to delete this collection? </span>
        </div>
        <div className={cn(style.footer)}>
          <Button variant="gray" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button variant="yellow" onClick={() => onConfirm(address)}>
            Confirm
          </Button>
        </div>
      </div>
    </AceModal>
  );
};

export default CollectionRemoveModal;
