import cn from "classnames";
import style from "./Collections.module.css";

import PlatformStatus from "components/Common/PlatformStatus";
import { SvgArrowDown } from "assets/images/svg";
import { Refresh } from "components/ui";
import { useSettingStore } from "store";
import { refreshPools } from "utils/apis/pikachu.api";
import CollectionPanel from "components/Collections/CollectionPanel";

const Collections = () => {
  const { collections, setRefreshedAt } = useSettingStore();
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <div>
          <h3>Collections</h3>
          <PlatformStatus />
        </div>
        <p>
          We support the top 30 verified collections on Etherscan. Contact us on
          Discord to get more collections verifed.
        </p>
      </div>

      <div className={cn(style.collectionList)}>
        <div className={cn(style.head)}>
          <span />
          <h4>Collection </h4>
          <span>
            Floor Price
            <SvgArrowDown />
          </span>
          <span>
            Items
            <SvgArrowDown />
          </span>
          <span>
            Pools
            <SvgArrowDown />
          </span>
          <span>
            Open loans
            <SvgArrowDown />
          </span>
          <span>
            <Refresh
              action={async () => {
                await refreshPools();
                setRefreshedAt(new Date());
              }}
            />
          </span>
        </div>

        {collections.map((collection, index) => (
          <CollectionPanel collection={collection} key={index} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Collections;
