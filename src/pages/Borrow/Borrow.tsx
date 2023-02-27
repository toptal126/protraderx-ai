import style from "./Borrow.module.css";
import cn from "classnames";
import { NFTItem, useAccountStore, useSettingStore } from "store";
import { NFTSelector } from "components/Pool";
import { useEffect, useMemo, useState } from "react";
import {
  SvgArrowDown,
  SvgEthCoin,
  SvgEthereum,
  // SvgUSDC,
  // SvgUSDT,
} from "assets/images/svg";
import { DurationPicker, Input } from "components/ui";
import {
  beautifyDecimals,
  formatEther,
  toFloat,
} from "utils/helpers/string.helpers";
import BorrowPanel from "components/Borrow/BorrowPanel";
import { calculateRepayAmount } from "utils/helpers/contract.helpers";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";

const Borrow = () => {
  const { pools } = useAccountStore();

  const [moreVisible, setMoreVisible] = useState(false);
  const [amount, setAmount] = useState("");

  const { nfts } = useAccountStore();
  const { collections } = useSettingStore();
  const [currentItem, setCurrentItem] = useState<NFTItem>({
    contract: "",
    name: "",
    symbol: "",
    tokenId: 0,
    floorPrice: 0,
  });

  const findFloorPrice = (contract: string) => {
    return toFloat(
      collections.find(
        (item) => item.contract.toLowerCase() === contract.toLowerCase()
      )?.floorPrice
    );
  };

  const setMinimalNft = () => {
    if (nfts.length === 0) return;
    setCurrentItem(
      nfts.reduce(
        (prev, next) =>
          findFloorPrice(prev.contract) < findFloorPrice(next.contract)
            ? next
            : prev,
        nfts[0]
      )
    );
  };
  const setMaximalNft = () => {
    if (nfts.length === 0) return;
    let maxItem = nfts.reduce((prev, next) => {
      return findFloorPrice(prev.contract) < findFloorPrice(next.contract)
        ? next
        : prev;
    }, nfts[0]);
    maxItem = { ...maxItem, floorPrice: findFloorPrice(maxItem.contract) };
    setCurrentItem(maxItem);
  };

  const [duration, setDuration] = useState(1);

  const topPools = useMemo(() => {
    // filter nft holding
    let filteredPool = pools.filter((pool) => {
      return pool.collections.find(
        (item) => item.toLowerCase() === currentItem.contract
      );
    });

    // filter amount
    filteredPool = filteredPool.filter((pool) => {
      return formatEther(pool.availableAmount) >= toFloat(amount);
    });

    // filter paused
    filteredPool = filteredPool.filter((pool) => {
      return !pool.paused;
    });
    // filter duration
    filteredPool = filteredPool.filter((pool) => {
      return pool.maxDuration.toNumber() / SECONDS_PER_DAY >= duration;
    });

    // sort by interest

    filteredPool = filteredPool.sort((a, b) => {
      return (
        calculateRepayAmount(
          1,
          a.interestType,
          toFloat(a.interestStartRate),
          toFloat(a.interestCapRate),
          duration * SECONDS_PER_DAY
        ) -
        calculateRepayAmount(
          1,
          b.interestType,
          toFloat(b.interestStartRate),
          toFloat(b.interestCapRate),
          duration * SECONDS_PER_DAY
        )
      );
    });

    return filteredPool;
  }, [currentItem, pools, amount, duration]);

  useEffect(() => {
    if (topPools.length)
      setAmount(
        beautifyDecimals(
          (formatEther(currentItem.floorPrice) *
            topPools[0].loanToValue.toNumber()) /
            10000
        ).toString()
      );
    // eslint-disable-next-line
  }, [currentItem]);

  const onFindMaxLoan = () => {
    if (topPools.length)
      setAmount(
        beautifyDecimals(
          (formatEther(currentItem.floorPrice) *
            topPools[0].loanToValue.toNumber()) /
            10000
        ).toString()
      );
  };

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Borrow</h3>
      </div>
      <div className={cn(style.panel)}>
        <div className={cn(style.choice)}>
          <span>You Collateralize</span>
          <div className={cn(style.buttons)}>
            <span onClick={setMinimalNft}>MIN</span>
            <span onClick={setMaximalNft}>MAX</span>
          </div>
        </div>

        <div className={cn(style.collateral)}>
          <NFTSelector
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        </div>

        <span>You Receive</span>
        <div className={cn(style.receive)}>
          <div className={cn(style.coins)}>
            <SvgEthCoin />
            {/* <SvgUSDC className="grayscale" />
            <SvgUSDT className="grayscale" /> */}
          </div>

          <span onClick={onFindMaxLoan}>Max</span>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount..."
            icon={<SvgEthereum />}
          />
        </div>

        <div className={cn(style.duration)}>
          <DurationPicker value={duration} onChange={setDuration} min={1} />
        </div>
        <span className={cn("tooltip-container")}>
          <span className={cn(style.tooltip, "tooltip right")}>
            {topPools.length
              ? `Best loans out of total of ${topPools.length} loans`
              : `No pools matching your requirements`}
          </span>
          Top Loans
        </span>

        {topPools.length ? (
          <div className={cn(style.loanlist)}>
            {topPools
              .filter((pool, index) => moreVisible || index < 3)
              .map((pool, index) => (
                <BorrowPanel
                  key={`${pool.owner}${index}`}
                  pool={pool}
                  amount={toFloat(amount) || toFloat(currentItem.floorPrice)}
                  duration={duration}
                />
              ))}

            {!moreVisible && topPools.length > 3 && (
              <div
                className={cn(style.showmore)}
                onClick={() => setMoreVisible(true)}
              >
                <SvgArrowDown /> More
              </div>
            )}
            {moreVisible && topPools.length > 3 && (
              <div
                className={cn(style.showmore)}
                onClick={() => setMoreVisible(false)}
              >
                <SvgArrowDown className="rotate-180" /> Show less
              </div>
            )}
          </div>
        ) : (
          <div className={cn(style.noloans)}>
            There are no pools matching your requirements
          </div>
        )}
      </div>
    </div>
  );
};

export default Borrow;
