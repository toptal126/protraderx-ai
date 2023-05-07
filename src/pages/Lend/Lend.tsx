import { SvgLink } from "assets/images/svg";
import cn from "classnames";
import style from "./Lend.module.css";

import { Button, Refresh } from "components/ui";

import { refreshPools } from "utils/apis/pikachu.api";
import { usePoolByOwner } from "utils/hooks/pikachu/usePools";
import { useAccount } from "wagmi";
import { toString } from "utils/helpers/string.helpers";
import { LendPanel, PoolCreateDrawer } from "components/Lend";
import { useState } from "react";
import { useSettingStore } from "store";
import PoolEditDrawer from "components/Lend/PoolEditDrawer";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";

const Lend = () => {
  const account = useAccount();
  const { setRefreshedAt } = useSettingStore();
  const pools = usePoolByOwner(toString(account.address));

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editPool, setEditPool] = useState<IPikachu.PoolStructOutput>(pools[0]);

  return (
    <div className={cn(style.root)}>
      {createModalVisible ? (
        <PoolCreateDrawer setVisible={setCreateModalVisible} />
      ) : editModalVisible ? (
        <PoolEditDrawer setVisible={setEditModalVisible} pool={editPool} />
      ) : (
        <>
          <div className={cn(style.heading)}>
            <h3>Lend</h3>

            <div className={cn(style.help)}>
              Create a pool in 5 minutes and provide instant NFT Liquidity on
              Ethereum.
              <a
                href="https://protradex-pro.gitbook.io/protradex-pro/"
                target="_blank"
                rel="noreferrer"
              >
                How to create
                <SvgLink />
              </a>
              <Button
                variant="yellow"
                onClick={() => setCreateModalVisible(true)}
              >
                Create Pool
              </Button>
            </div>
          </div>

          <div className={cn(style.poolList)}>
            <div className={cn(style.head)}>
              <h4>
                <span className="hidden md:flex">Pools ({pools.length})</span>
                <span className="flex md:hidden">Pool Details</span>
              </h4>
              <span>
                <span className="text-tangerine-yellow">
                  Available Liquidity
                </span>
                / Total
              </span>
              <span>LTV</span>
              <span>Interest</span>
              <span>Open loans</span>
              <span>Operation</span>
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
              <LendPanel
                pool={pool}
                key={index}
                onEditPool={() => {
                  setEditPool(pool);
                  setEditModalVisible(true);
                }}
              />
            ))}
            {pools.length === 0 && (
              <div className={cn(style.empty)}>
                You don’t have any pool. Create one to see it displayed here.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Lend;
