import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import style from "./CollectionSelector.module.css";

import { useSettingStore } from "store";

import nftImage from "assets/images/nftImage.png";

import {
  SvgArrowDown,
  SvgArrowRight,
  SvgEthereum,
  SvgFind,
  SvgLink,
} from "assets/images/svg";
import { Button } from "components/ui";
import Input from "components/ui/Input";
import { beautifyDecimals } from "utils/helpers/string.helpers";

interface Props {
  options: string[];
  setOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const CollectionSelector = ({ options, setOptions }: Props) => {
  const [_state, updateState] = useState<any>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const { collections } = useSettingStore();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const queriedItems = useMemo(() => {
    return collections.filter(
      (nft) => nft.name.includes(query) || nft.symbol.includes(query)
    );
  }, [collections, query]);

  const selectedNames = useMemo(() => {
    const _names = options.map(
      (contract) => collections.find((item) => item.contract === contract)?.name
    );

    return _names.join(", ").slice(0, 15);
    // eslint-disable-next-line
  }, [options, collections, _state]);

  return (
    <div className={cn(style.root)} ref={ref}>
      <div
        className={cn(style.selection)}
        onClick={() => setExpanded(!expanded)}
      >
        {options.length > 0 ? (
          <div>
            <p className="hidden md:block">
              Select the supported collections of collateral
            </p>
            <span>
              {selectedNames}... total {options.length} collections
            </span>
          </div>
        ) : (
          <div>
            <p>Select the supported collections of collateral</p>
          </div>
        )}

        <Button
          sx={`h-8 md:h-10 w-8 md:w-10 ${expanded ? "rotate-180" : ""}`}
          onClick={() => setExpanded(!expanded)}
        >
          <SvgArrowDown />
        </Button>
      </div>
      {expanded && (
        <div className={cn(style.collections)}>
          <div className={cn(style.searchBox)}>
            <div className={cn(style.count)}>
              <SvgArrowRight /> Verified Collections ({collections.length})
            </div>

            <Input
              placeholder="Search by collection name..."
              sx="h-12"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              icon={<SvgFind className="mt-2" />}
            />
          </div>

          <div className={cn(style.list)}>
            {queriedItems.map((nft, index) => (
              <div
                className={cn(style.row)}
                key={index}
                onClick={() => {
                  setOptions((_option) => {
                    const _included = _option.indexOf(nft.contract);
                    if (_included >= 0) _option.splice(_included, 1);
                    else _option.push(nft.contract);

                    return _option;
                  });
                  forceUpdate();
                }}
              >
                <img
                  src={nft.imageUrl || nftImage}
                  alt="collection"
                  className={cn(style.nftImg)}
                />
                <div className={cn(style.item)}>
                  <a
                    href={`https://opensea.io`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{nft.name}</span>
                    <SvgLink />
                  </a>
                  <span>{nft.totalSupply} items</span>
                </div>

                <div className={cn(style.floorPrice)}>
                  {beautifyDecimals(
                    collections.find((item) => item.contract === nft.contract)
                      ?.floorPrice
                  )}{" "}
                  <SvgEthereum />
                </div>

                <input
                  type="checkbox"
                  className={cn(style.checkbox)}
                  onChange={() => {}}
                  checked={options.includes(nft.contract)}
                />

                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionSelector;
