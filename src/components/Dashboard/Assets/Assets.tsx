import { useMemo, useState } from "react";
import style from "./Assets.module.css";
import cn from "classnames";
import { useAccountStore, useSettingStore } from "store";
import { Input } from "components/ui";
import { SvgFind } from "assets/images/svg";
import ImageERC721 from "assets/images/no-image.png";

const Assets = () => {
  const { collections } = useSettingStore();
  const { nfts } = useAccountStore();

  const [query, setQuery] = useState("");

  const validItems = useMemo(() => {
    return nfts
      .filter((nft) =>
        collections.find((collection) => collection.contract === nft.contract)
      )
      .filter(
        (item) =>
          item.name.includes(query) ||
          item.symbol.includes(query) ||
          item.tokenId.toString().includes(query)
      );
  }, [nfts, collections, query]);

  return (
    <div className={cn(style.root)}>
      <Input
        placeholder="Search NFT (e.g: ABC #0001)"
        icon={<SvgFind />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className={cn(style.items)}>
        {validItems.map((nft, index) => (
          <div key={index} className={cn(style.itemWrapper)}>
            <img src={nft.imgUrl || ImageERC721} alt={nft.name} />
            <span className={cn(style.symbol)}>
              {nft.symbol} #{nft.tokenId}
            </span>
            {/* <div className={cn(style.actions)}>
              <Button>
                <SvgDots />
              </Button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;
