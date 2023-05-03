import { useMemo, useState } from "react";
import style from "./Mortgage.module.css";
import cn from "classnames";
import { useAccountStore, useSettingStore } from "store";
import { Button, Input } from "components/ui";
import { SvgEthereum, SvgFind } from "assets/images/svg";
import ImageERC721 from "assets/images/no-image.png";
import {
  TListingStruct,
  useAllListings,
} from "utils/hooks/pikachu/useListings";
import { MortgageModal } from "components/Mortgage";
import { useMarketplaceContract } from "utils/hooks/useContract";
import { ethers } from "ethers";
import { refreshPools, updateListingItem } from "utils/apis/pikachu.api";

const Mortgage = () => {
  const { address } = useAccountStore();

  const {
    setTxConfirmationModalVisible,
    setTxDescription,
    submitTransaction,
    setRefreshedAt,
  } = useSettingStore();

  const [mortgageModalVisible, setMortgageModalVisible] = useState(false);

  const listedItems = useAllListings();
  const marketplace = useMarketplaceContract();

  const [query, setQuery] = useState("");

  const validItems = useMemo(() => {
    return listedItems.filter(
      (item) =>
        item.name.includes(query) ||
        item.symbol.includes(query) ||
        item.tokenId.toString().includes(query)
    );
  }, [listedItems, query]);

  const [selectedNft, setSelectedNft] = useState<TListingStruct>({
    contract: "",
    imgUrl: "",
    isActive: true,
    name: "",
    price: 0,
    seller: "",
    symbol: "",
    tokenId: 0,
  });
  const onBuy = async (nft: TListingStruct) => {
    setTxDescription(
      `Purchase ${nft.symbol}#${nft.tokenId} for ${nft.price}ETH`
    );
    setTxConfirmationModalVisible(true);
    submitTransaction(
      marketplace.buy(nft.contract, nft.tokenId, {
        value: ethers.utils.parseEther(nft.price.toString()),
      }),
      async () => {
        await refreshPools();
        await updateListingItem(nft, false, 0, address);
        setRefreshedAt(new Date());
      }
    );
  };

  const onRequestMortgage = async (nft: TListingStruct) => {
    setSelectedNft(nft);
    setMortgageModalVisible(true);
  };
  return (
    <div className={cn(style.root)}>
      <Button
        onClick={async () => {
          await refreshPools();
          // await updateListingItem(nft, false, 0, address);
          setRefreshedAt(new Date());
        }}
      >
        test
      </Button>
      <MortgageModal
        visible={mortgageModalVisible}
        setVisible={setMortgageModalVisible}
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
              <span className={cn(style.price)}>
                {nft.price}
                <SvgEthereum />
              </span>
            </span>
            <div className={cn(style.actions)}>
              {nft.seller === address && (
                <Button variant="gray" sx="h-8 w-32">
                  Cancel listing
                </Button>
              )}
              {nft.seller !== address && (
                <>
                  <span>Purchase</span>
                  <div className={cn(style.payments)}>
                    <Button
                      variant="blue"
                      sx="h-8 w-24"
                      onClick={() => onBuy(nft)}
                    >
                      Full Pay
                    </Button>
                    <Button
                      variant="yellow"
                      sx="h-8 w-24"
                      onClick={() => onRequestMortgage(nft)}
                    >
                      Down Pay
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mortgage;
