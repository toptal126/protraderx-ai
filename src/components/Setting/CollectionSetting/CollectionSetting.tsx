import { useState } from "react";
import { useSettingStore } from "store";

import style from "./CollectionSetting.module.css";
import cn from "classnames";

import { Button, TextCopier } from "components/ui";
import CollectionModal from "../Modals/CollectionModal";
import ImageERC721 from "assets/images/template-erc721.png";
import { beautifyAddress } from "utils/helpers/string.helpers";
import { SvgEdit, SvgTrash } from "assets/images/svg";
import CollectionRemoveModal from "../Modals/CollectionRemoveModal";

const CollectionSetting = () => {
  const [collectionModalVisible, setCollectionModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  const [input, setInput] = useState("");

  const {
    // setting: { verifiedCollections },
    collections,
    replaceCollection,
  } = useSettingStore();

  const updateAddress = async (address: string) => {
    replaceCollection(input, address).then(() =>
      setCollectionModalVisible(false)
    );
  };
  const removeAddress = (address: string) => {
    replaceCollection(address, "").then(() => setRemoveModalVisible(false));
  };
  return (
    <div className={cn(style.root)}>
      <>
        <CollectionModal
          input={input}
          onSave={updateAddress}
          visible={collectionModalVisible}
          setVisible={setCollectionModalVisible}
        />
        <CollectionRemoveModal
          address={input}
          onConfirm={removeAddress}
          visible={removeModalVisible}
          setVisible={setRemoveModalVisible}
        />
      </>
      <div className={cn(style.header)}>
        <div>
          <span className="md:hidden">{collections.length} Collections</span>
        </div>
        <span>Collection</span>
        <span>Contract</span>
        <Button
          variant="yellow"
          onClick={() => {
            setInput("");
            setCollectionModalVisible(true);
          }}
        >
          Add Collection
        </Button>
      </div>

      <div className={cn(style.collections)}>
        {collections.map((collection, index) => (
          <div key={index} className={cn(style.row)}>
            <span>{index + 1}</span>

            <div className={cn(style.avatar)}>
              <img
                src={collection.imageUrl}
                alt="collection"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = ImageERC721;
                }}
              />
              <span>{collection.name}</span>
              <div>
                <span>{collection.name}</span>
                <div className={cn(style.address)}>
                  <span>{beautifyAddress(collection.contract, 4)}</span>
                  <TextCopier text={collection.contract} />
                </div>
              </div>
            </div>

            <div className={cn(style.address)}>
              <span>{beautifyAddress(collection.contract, 6)}</span>
              <TextCopier text={collection.contract} />
            </div>

            <div className={cn(style.actions)}>
              <Button
                onClick={() => {
                  setInput(collection.contract);
                  setCollectionModalVisible(true);
                }}
              >
                <SvgEdit />
              </Button>
              <Button
                onClick={() => {
                  setInput(collection.contract);
                  setRemoveModalVisible(true);
                }}
              >
                <SvgTrash />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionSetting;
