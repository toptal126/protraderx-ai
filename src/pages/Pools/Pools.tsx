import style from "./Pools.module.css";
import cn from "classnames";
import { SvgLink, SvgArrowDown } from "assets/images/svg";
import { PoolPanel } from "components/Pool";
import PlatformStatus from "components/Common/PlatformStatus";
import { useAccountStore, useSettingStore } from "store";
import { Refresh } from "components/ui";
import { refreshPools } from "utils/apis/pikachu.api";
// import Example from "assets/"
const Pools = () => {
  const { pools } = useAccountStore();
  const { setRefreshedAt } = useSettingStore();
  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Pools</h3>
        <PlatformStatus />
      </div>

      <div className={cn(style.help)}>
        Borrow ETH with your NFTs within 5 minutes and get instant NFT Liquidity
        on Ethereum.
        <a
          href="https://github.com/Pikachu-finance"
          target="_blank"
          rel="noreferrer"
        >
          How to use ProtradeX
          <SvgLink />
        </a>
      </div>

      <div className={cn(style.poolList)}>
        <div className={cn(style.head)}>
          <h4>Pools ({pools.length})</h4>
          <span>
            <span className="text-tangerine-yellow">Available Liquidity</span>
            / Total
            <SvgArrowDown />
          </span>
          <span>
            LTV
            <SvgArrowDown />
          </span>
          <span>
            Duration
            <SvgArrowDown />
          </span>
          <span>
            <span className="text-tangerine-yellow">Starting</span>
            / Daily Interest
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

        {pools.map((pool, index) => (
          <PoolPanel
            key={index}
            pool={pool}
            poolId={index}
            buttonVisible={true}
          />
        ))}

        {pools.length === 0 && (
          <div className={cn(style.empty)}>
            You don’t have any pool. Create one to see it displayed here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Pools;
