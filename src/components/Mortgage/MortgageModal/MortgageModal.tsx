import { useMemo, useState } from "react";
import cn from "classnames";
import style from "./MortgageModal.module.css";
import { AceModal, Button, DurationPicker, Input } from "components/ui";
import CloseButton from "components/ui/CloseButton";
import { useAccountStore, useSettingStore } from "store";

import ImageERC721 from "assets/images/no-image.png";
import { SvgEthereum } from "assets/images/svg";
import { usePikachuContract } from "utils/hooks/useContract";
import { TListingStruct } from "utils/hooks/pikachu/useListings";
import {
  beautifyAddress,
  beautifyDecimals,
  toFloat,
} from "utils/helpers/string.helpers";
import { identicon } from "minidenticons";
import { toInteger } from "utils/helpers/string.helpers";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { calculateRepayAmount } from "utils/helpers/contract.helpers";
import { ethers } from "ethers";
import { updateListingItem } from "utils/apis/pikachu.api";

type IProps = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  nft: TListingStruct;
};

const MortgageModal = ({ visible, setVisible, nft }: IProps) => {
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(0);

  const { pools } = useAccountStore();
  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    setRefreshedAt,
  } = useSettingStore();

  const bestPool = useMemo(() => {
    return pools
      .filter((pool) => pool.poolType === 1)
      .filter((pool) =>
        pool.collections.find(
          (collection) =>
            collection.toLowerCase() === nft.contract.toLowerCase()
        )
      )
      .filter((pool) => toFloat(pool.maxAmount) >= amount)
      .filter(
        (pool) => toInteger(pool.maxDuration) / SECONDS_PER_DAY >= duration
      )[0];
  }, [pools, nft, amount, duration]);

  const requiredAmount = useMemo(() => {
    if (!bestPool) return 0;
    return calculateRepayAmount(
      amount,
      bestPool.interestType,
      toInteger(bestPool.interestStartRate),
      toInteger(bestPool.interestCapRate),
      duration * SECONDS_PER_DAY
    );
  }, [amount, bestPool, duration]);

  const pikachu = usePikachuContract();

  const onRequest = async () => {
    if (amount === 0) {
      onSubmitPurchase();
      return;
    }
    setVisible(false);
    setTxDescription(`Requesting ${amount} ETH of mortgage to down payment`);
    setTxConfirmationModalVisible(true);
    submitTransaction(
      pikachu.purchaseViaMortgage(
        bestPool.poolId,
        nft.contract,
        nft.tokenId,
        duration * SECONDS_PER_DAY,
        {
          value: ethers.utils.parseEther((nft.price - amount).toString()),
        }
      ),

      async () => {
        await updateListingItem(nft, false, 0, nft.seller);
        setRefreshedAt(new Date());
      }
    );
  };

  const onSubmitPurchase = async () => {};

  return (
    <AceModal modalVisible={visible} setModalVisible={setVisible}>
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Request Mortage to Purchase {nft.symbol}#{nft.tokenId}
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          <div className={cn(style.image)}>
            <img src={nft.imgUrl || ImageERC721} alt={nft.name} />
          </div>
          <div className={cn(style.values)}>
            <span className="font-medium">Amount to borrow *</span>
            <Input
              value={amount}
              onChange={(e) =>
                setAmount(Math.min(toFloat(e.target.value), nft.price))
              }
              type="number"
              min={0}
              max={nft.price}
              icon={<SvgEthereum />}
            />

            <span className="font-medium">Select loan duration *</span>
            <DurationPicker value={duration} onChange={setDuration} min={1} />
          </div>

          <div className={cn(style.review)}>
            <span>Review</span>
            <span>
              You are asking to borrow
              <div className={cn(style.stressed1)}>
                {amount}
                <SvgEthereum />
              </div>
            </span>
            <span>
              To buy
              <div className={cn(style.stressed1)}>
                {nft.symbol}#{nft.tokenId}
              </div>
              for
              <div className={cn(style.stressed1)}>
                {nft.price}
                <SvgEthereum />
              </div>
            </span>
            <span>
              You have for
              <div className={cn(style.stressed1)}>{duration} Days</div> to
              repay it
            </span>
            <span>
              You will pay
              <div className={cn(style.stressed2)}>
                {beautifyDecimals(requiredAmount)}
                <SvgEthereum />
              </div>
              of interest
            </span>
          </div>

          <div className={cn(style.confirm)}>
            <h4>{bestPool ? "Best Pool" : "Can't find matching pool"}</h4>
            {bestPool && (
              <span className={cn(style.stressed1)}>
                <div
                  className={cn(style.avatar)}
                  dangerouslySetInnerHTML={{
                    __html: identicon(
                      bestPool.owner.repeat(3) + bestPool.poolId
                    ),
                  }}
                />
                {beautifyAddress(bestPool.owner)}'s Pool
              </span>
            )}
            <span>By clicking "Request" you agree to the above terms.</span>
            <Button
              variant="yellow"
              onClick={onRequest}
              disabled={bestPool === undefined}
            >
              Request
            </Button>
          </div>
        </div>
        <div className={cn(style.footer)} />
      </div>
    </AceModal>
  );
};

export default MortgageModal;
