import { useMemo, useState } from "react";
import style from "./Assets.module.css";
import cn from "classnames";
import { NFTItem, useAccountStore, useSettingStore } from "store";
import { Button, Input } from "components/ui";
import { SvgEthereum, SvgFind } from "assets/images/svg";
import ImageERC721 from "assets/images/no-image.png";
import { useSaleObjects } from "utils/hooks/pikachu/useListings";
import { ListSaleModal } from "components/Mortgage";
import { useMarketplaceContract } from "utils/hooks/useContract";
import { beautifyDecimals } from "utils/helpers/string.helpers";
import { updateListingItem } from "utils/apis/pikachu.api";

const Assets = () => {
  const [listingModalVisible, setListingModalVisible] = useState(false);

  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    setRefreshedAt,
    collections,
  } = useSettingStore();
  const { nfts, address } = useAccountStore();
  const marketplace = useMarketplaceContract();

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

  const saleObjects = useSaleObjects(validItems);

  const [selectedNft, setSelectedNft] = useState<NFTItem>({
    contract: "",
    tokenId: 0,
    name: "",
    symbol: "",
  });
  const onListSale = async (nft: NFTItem) => {
    setSelectedNft(nft);
    setListingModalVisible(true);
  };
  const onCancelListing = async (nft: NFTItem) => {
    setTxDescription("Cancel listing for sale");
    setTxConfirmationModalVisible(true);
    submitTransaction(
      marketplace.cancelSale(nft.contract, nft.tokenId),
      async () => {
        setRefreshedAt(new Date());
        await updateListingItem(nft, false, 0, address);
      }
    );
  };
  return (
    <div className={cn(style.root)}>
      <ListSaleModal
        visible={listingModalVisible}
        setVisible={setListingModalVisible}
        nft={selectedNft}
      />
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
              {saleObjects[index]?.active && (
                <span className={cn(style.price)}>
                  {beautifyDecimals(saleObjects[index].price)}
                  <SvgEthereum />
                </span>
              )}
            </span>
            <div className={cn(style.actions)}>
              {saleObjects[index]?.active ? (
                <Button
                  variant="gray"
                  sx="h-8 w-32"
                  onClick={() => onCancelListing(nft)}
                >
                  Cancel listing
                </Button>
              ) : (
                <Button
                  variant="yellow"
                  sx="h-8 w-32"
                  onClick={() => onListSale(nft)}
                >
                  List for sale
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assets;
