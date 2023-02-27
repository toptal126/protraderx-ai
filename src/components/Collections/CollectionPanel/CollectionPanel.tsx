import { useMemo, useState } from "react";
import style from "./CollectionPanel.module.css";
import cn from "classnames";

import {
  SvgArrowDown,
  SvgEthereum,
  // SvgTemplateChart,
} from "assets/images/svg";
import ImageERC721 from "assets/images/template-erc721.png";

import { Button } from "components/ui";
import { ICollection, useAccountStore } from "store";
import { beautifyDecimals, toInteger } from "utils/helpers/string.helpers";
import PoolRow from "../PoolRow";
import LinkWithSearchParams from "components/LinkWithSearchParams";

interface Props {
  collection: ICollection;
  index: number;
}

const CollectionPanel = ({ collection, index }: Props) => {
  const { pools, allLoans, nfts } = useAccountStore();
  const [expanded, setExpanded] = useState(false);

  const relatedPools = useMemo(() => {
    return pools.filter((pool) =>
      pool.collections.find(
        (item) => item.toLowerCase() === collection.contract
      )
    );
  }, [pools, collection]);

  const bestPool = useMemo(() => {
    return relatedPools.find(
      (item) =>
        toInteger(item.loanToValue) ===
        Math.max.apply(
          Math,
          relatedPools.map((item) => toInteger(item.loanToValue))
        )
    );
  }, [relatedPools]);

  const relatedLoans = useMemo(() => {
    return allLoans.filter(
      (loan) =>
        loan.collectionContract === collection.contract && loan.status === 1
    );
  }, [allLoans, collection]);

  const isHoldingItem = useMemo(() => {
    return nfts.find((item) => item.contract === collection.contract);
  }, [nfts, collection]);

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.collectionInfo)}>
        <div>{index + 1}</div>
        <div className={cn(style.nftImg)}>
          <img src={ImageERC721} alt="nft" />
          <div>
            <span className={cn(style.collectionName)}>{collection.name}</span>
            <span className="flex md:hidden items-center gap-x-2">
              <span className={cn(style.label)}>Floor: </span>{" "}
              {beautifyDecimals(collection.floorPrice)}
              <SvgEthereum />
            </span>
            <span className="flex md:hidden items-center gap-x-2">
              <span className={cn(style.label)}>Total: </span>{" "}
              {collection.totalSupply} items
            </span>
            <span className="flex md:hidden items-center gap-x-2">
              <span className={cn(style.label)}>Available: </span>{" "}
              {relatedPools.length} pools
            </span>
            <span className="flex md:hidden items-center gap-x-2">
              <span className={cn(style.label)}>Used in </span>{" "}
              {relatedLoans.length} loans
            </span>
          </div>
        </div>
        <div>
          {beautifyDecimals(collection.floorPrice)}
          <SvgEthereum />
        </div>
        <div>{collection.totalSupply}</div>
        <div>{relatedPools.length}</div>
        <div>{relatedLoans.length}</div>
        <div>
          <LinkWithSearchParams
            to={{
              pathname: `/pool/${bestPool?.owner}/${bestPool?.poolId}/borrow`,
            }}
          >
            {bestPool ? (
              <Button
                variant="yellow"
                disabled={bestPool === undefined || !isHoldingItem}
              >
                Borrow{" "}
                {(
                  (toInteger(bestPool.loanToValue) / 10000) *
                  collection.floorPrice
                ).toFixed()}
                <SvgEthereum />
              </Button>
            ) : (
              <Button disabled={bestPool === undefined || !isHoldingItem}>
                No loan pool
              </Button>
            )}
          </LinkWithSearchParams>
          <Button
            sx={`h-10 w-10 bg-white/30 hover:bg-white/40  ${
              expanded ? "rotate-180" : ""
            }`}
            onClick={() => setExpanded(!expanded)}
            disabled={!bestPool}
          >
            <SvgArrowDown />
          </Button>
        </div>
      </div>

      {expanded && bestPool && (
        <div className={cn(style.poolDetails)}>
          <hr />
          <div className={cn(style.header)}>
            <div>Pool Creator</div>
            <div>
              <span className="text-tangerine-yellow">
                Available Liquidity{" "}
              </span>
              / Total
            </div>
            <div>LTV</div>
            <div>Duration</div>
            <div>Daily Interest</div>
          </div>

          {relatedPools.map((pool, index) => (
            <PoolRow
              pool={pool}
              floorPrice={collection.floorPrice}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPanel;
