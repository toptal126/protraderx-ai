import style from "./MinDepositModal.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { AceModal, Button, Input } from "components/ui";
import { useRef } from "react";
import CloseButton from "components/ui/CloseButton";
import { SvgEthereum } from "assets/images/svg";

interface IProps {
  input: string;
  onConfirm: any;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FeeToModal = ({ input, onConfirm, visible, setVisible }: IProps) => {
  const addressRef = useRef<HTMLInputElement>(null);
  // const { setting } = useSettingStore();

  return (
    <AceModal modalVisible={visible} setModalVisible={setVisible}>
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Min Deposit Amount
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          <span>Min Deposit Amount Now: </span>
          <span className={cn(style.value)}>
            {input} <SvgEthereum />
          </span>
          <span>Change to:</span>
          <Input
            innerRef={addressRef}
            placeholder="0x"
            defaultValue={input}
            icon={<SvgEthereum />}
            // onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className={cn(style.footer)}>
          <Button variant="gray" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button
            variant="yellow"
            onClick={() => onConfirm(addressRef.current?.value)}
          >
            Save
          </Button>
        </div>
      </div>
    </AceModal>
  );
};

export default FeeToModal;
