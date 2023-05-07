import { ethers } from "ethers";

import cn from "classnames";
import style from "./BorrowDrawer.module.css";
import { useMemo, useState } from "react";
import { useCalculateRepayAmount } from "utils/hooks/pikachu/usePools";

import { NFTItem, useAccountStore, useSettingStore } from "store";

import {
  beautifyDecimals,
  formatEther,
  toFloat,
  toInteger,
} from "utils/helpers/string.helpers";
import { SvgEthereum, SvgWarning } from "assets/images/svg";
import nftImage from "assets/images/nftImage.png";
import DurationPicker from "components/ui/DurationPicker";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { Button, Input, Refresh } from "components/ui";
import NFTSelector from "components/Pool/NFTSelector";
import { useERC721Contract, usePikachuContract } from "utils/hooks/useContract";
import { getSignature, refreshPools } from "utils/apis/pikachu.api";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";

type IProps = {
  pool: IPikachu.PoolStructOutput;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Borrow = ({ pool, setVisible }: IProps) => {
  const { address, balance, nfts } = useAccountStore();
  const {
    setTxDescription,
    setTxConfirmationModalVisible,
    setTxRejectModalVisible,
    submitTransaction,
    setRefreshedAt,
  } = useSettingStore();

  const Pikachu = usePikachuContract();

  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState("");

  const [currentItem, setCurrentItem] = useState<NFTItem>({
    contract: "",
    name: "",
    symbol: "",
    tokenId: 0,
    floorPrice: 0,
  });

  const nftContract = useERC721Contract(currentItem.contract);

  const validItems = useMemo(() => {
    return nfts.filter((nft) =>
      pool?.collections.find(
        (contract) => contract.toLowerCase() === nft.contract.toLowerCase()
      )
    );
  }, [pool, nfts]);

  const repayAmount = useCalculateRepayAmount(
    toFloat(amount),
    pool?.interestType,
    pool?.interestStartRate.toNumber(),
    pool?.interestCapRate.toNumber(),
    duration * SECONDS_PER_DAY
  );

  const onRequest = async () => {
    if (
      toFloat(amount) === 0 ||
      toFloat(amount) > formatEther(pool.maxAmount) ||
      toFloat(amount) > formatEther(pool.availableAmount)
    ) {
      setTxDescription("Invalid Arguments!");
      setTxRejectModalVisible(true);
      return;
    }
    setTxDescription("Checking Availability...");
    setTxConfirmationModalVisible(true);

    try {
      const [operator, isApprovedForAll] = await Promise.all([
        nftContract.getApproved(currentItem.tokenId),
        await nftContract.isApprovedForAll(address, Pikachu.address),
      ]);

      if (operator !== Pikachu.address && isApprovedForAll === false) {
        setTxDescription(
          "Need to approve ProtradeX to collateralize your NFT..."
        );
        const txObj = await nftContract.approve(
          Pikachu.address,
          currentItem.tokenId
        );

        setTxDescription("Waiting to be included...");

        await txObj.wait();
      }

      setTxDescription(`Borrowing ${beautifyDecimals(amount)} ETH ...`);
      const signedObj = await getSignature(currentItem.contract);

      submitTransaction(
        Pikachu.borrow(
          toInteger(pool.poolId),
          currentItem.contract,
          currentItem.tokenId,
          duration * SECONDS_PER_DAY,
          ethers.utils.parseEther(amount),
          signedObj.signature,
          ethers.utils.parseEther(signedObj.floorPrice.toString()),
          signedObj.blockNumber
        ),
        async () => {
          await refreshPools();
          setRefreshedAt(new Date());
        }
      );
    } catch (error: any) {
      setTxConfirmationModalVisible(false);
      setTxRejectModalVisible(true);
      setTxDescription(
        `The transaction cannot succeed due to error: ${error.code}.`
      );
      console.log(error);
    }
  };

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Borrow</h3>

        <span>
          <Refresh
            action={async () => {
              await refreshPools();
              setRefreshedAt(new Date());
            }}
          />
        </span>
      </div>

      <p>
        Select the NFT you want to collaterize, loan to value is 40% in this
        pool.
      </p>

      <div className={cn(style.collection)}>
        <img src={nftImage} alt="collection" className={cn(style.nftImg)} />
        <div className={cn(style.sellections)}>
          <NFTSelector
            pool={pool}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
          <div>
            Floor Price:
            <h4 className="ml-2 mr-1.5">
              {beautifyDecimals(currentItem.floorPrice)}
            </h4>
            <SvgEthereum />
          </div>
          <div>
            Borrow Amount (Max{" "}
            {beautifyDecimals(
              (toFloat(currentItem.floorPrice) * toInteger(pool?.loanToValue)) /
                10000
            )}{" "}
            ETH):
            <Input
              icon={<SvgEthereum />}
              defaultValue="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={cn(style.duration)}>
            Select your loan duration (Max{" "}
            {toInteger(pool?.maxDuration) / SECONDS_PER_DAY} days):
            <DurationPicker
              value={duration}
              onChange={setDuration}
              min={1}
              max={toInteger(pool?.maxDuration) / SECONDS_PER_DAY}
            />
          </div>
          <div>
            Estimated interest:
            <h4 className="ml-2 mr-1.5">{beautifyDecimals(repayAmount)}</h4>
            <SvgEthereum />
          </div>
        </div>
      </div>

      <div className={cn(style.warnings)}>
        {validItems.length === 0 && (
          <div>
            <SvgWarning /> You don't have any NFTs from verified collections.
          </div>
        )}

        <div>
          <SvgWarning /> The Maximum loanable amount from this pool is{" "}
          {beautifyDecimals(pool?.maxAmount)} ETH.
        </div>

        <div>
          <SvgWarning /> Your balance is {beautifyDecimals(balance)} ETH, and at
          least 0.001 ETH (including transaction fees) is required.
        </div>
        <div>
          <SvgWarning /> Only {beautifyDecimals(pool?.availableAmount)} ETH is
          available in this pool.
        </div>

        <LinkWithSearchParams
          to={{ pathname: "/" }}
          className="text-tangerine-yellow"
        >
          By clicking Borrow you agree with the above terms.
        </LinkWithSearchParams>
      </div>

      <div className={cn(style.buttons)}>
        <Button variant="gray" sx="h-10 w-44" onClick={() => setVisible(false)}>
          Cancel
        </Button>
        <Button variant="yellow" sx="h-10 w-48" onClick={onRequest}>
          Request {beautifyDecimals(amount)} <SvgEthereum className="ml-1.5" />
        </Button>
      </div>
    </div>
  );
};

export default Borrow;
