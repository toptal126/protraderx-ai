import { useState } from "react";
import cn from "classnames";
import style from "./ListSaleModal.module.css";
import { AceModal, Button, Input } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { NFTItem, useAccountStore, useSettingStore } from "store";
import { SvgEthereum } from "assets/images/svg";
import {
  useERC721Contract,
  useMarketplaceContract,
} from "utils/hooks/useContract";
import { ethers } from "ethers";
import { useIsApprovedForAll } from "utils/hooks/pikachu/useListings";
import { useMarketplaceAddress } from "utils/hooks/useAddress";
import { updateListingItem } from "utils/apis/pikachu.api";
import { toFloat } from "utils/helpers/string.helpers";

type IProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  nft: NFTItem;
};

const ListSaleModal = ({ visible, setVisible, nft }: IProps) => {
  const [amount, setAmount] = useState("");

  const { address } = useAccountStore();

  const marketplace = useMarketplaceContract();
  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    setRefreshedAt,
  } = useSettingStore();
  const isApprovedForAll = useIsApprovedForAll(nft);
  const nftContract = useERC721Contract(nft.contract);
  const marketplaceAddress = useMarketplaceAddress();

  const onConfirm = async () => {
    console.log(isApprovedForAll);
    if (!isApprovedForAll) {
      setVisible(false);
      setTxDescription("Approve the marketplace to operate your items.");
      setTxConfirmationModalVisible(true);
      submitTransaction(
        nftContract.setApprovalForAll(marketplaceAddress, true),
        async () => {
          setRefreshedAt(new Date());
          onSubmitListing();
        }
      );
    } else onSubmitListing();
  };

  const onSubmitListing = async () => {
    setVisible(false);
    setTxDescription("Listing item for sale");
    setTxConfirmationModalVisible(true);
    submitTransaction(
      marketplace.createSale(
        nft.contract,
        nft.tokenId,
        ethers.utils.parseEther(amount)
      ),
      async () => {
        setRefreshedAt(new Date());
        await updateListingItem(nft, true, toFloat(amount), address);
      }
    );
  };

  return (
    <AceModal modalVisible={visible} setModalVisible={setVisible}>
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          List {nft.symbol}#{nft.tokenId} for Sale
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          <div>
            <span className="">Set Price:</span>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              icon={<SvgEthereum />}
            />
          </div>
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

export default ListSaleModal;
