import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import cn from "classnames";
import style from "./ConnectButton.module.css";
import { useDisconnect, useAccount } from "wagmi";
import {
  SvgDisconnect,
  SvgEthereum,
  SvgMoney,
  SvgSetting,
  SvgWallet,
} from "assets/images/svg";
import {
  beautifyAddress,
  beautifyDecimals,
} from "utils/helpers/string.helpers";
import { useEffect, useRef, useState } from "react";
import LinkWithSearchParams from "components/LinkWithSearchParams";
import { useAdminAddress } from "utils/hooks/useAddress";
import { identicon } from "minidenticons";
import { Button, TextCopier } from "components/ui";
import { useAccountStore, useSettingStore } from "store";

const ConnectButton = () => {
  const account = useAccount();
  const adminAddress = useAdminAddress();
  const { disconnect } = useDisconnect();

  const [expanded, setExpanded] = useState(false);

  const { balance } = useAccountStore();
  const { etherusd } = useSettingStore();

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

  return (
    <>
      {!account.isConnected && (
        <RainbowConnectButton
          // showBalance={false}
          accountStatus="address"
          // chainStatus="none"
        />
      )}

      {account.address && (
        <div ref={ref} className={cn(style.root)}>
          <button
            className={cn(style.button)}
            onClick={() => setExpanded(!expanded)}
          >
            <SvgWallet />
            <span>{beautifyAddress(account.address || "")}</span>
          </button>

          {expanded && (
            <div className={cn(style.dropdown)}>
              <div className={cn(style.account)}>
                <div>
                  <div
                    className={cn(style.avatar)}
                    dangerouslySetInnerHTML={{
                      __html: identicon(account.address),
                    }}
                  />

                  <span className={cn(style.address)}>
                    {beautifyAddress(account.address)}
                  </span>

                  <TextCopier text={account.address} />
                </div>
                <span className={cn(style.balance)}>
                  {beautifyDecimals(balance)} <SvgEthereum />
                </span>
                <span className={cn(style.usd)}>
                  {" "}
                  ${beautifyDecimals(etherusd * balance)} USD
                </span>
                <Button variant="yellow">
                  <LinkWithSearchParams
                    to={{ pathname: "/dashboard" }}
                    onClick={() => {
                      setExpanded(false);
                    }}
                  >
                    Dashboard
                  </LinkWithSearchParams>
                </Button>
              </div>

              <LinkWithSearchParams
                to={{ pathname: "/lend" }}
                onClick={() => {
                  setExpanded(false);
                }}
              >
                <SvgMoney />
                My Pools
              </LinkWithSearchParams>

              <span
                className={cn(style.disconnect)}
                onClick={() => {
                  disconnect();
                }}
              >
                <SvgDisconnect />
                Disconnect
              </span>

              {account.address === adminAddress && (
                <LinkWithSearchParams
                  to={{ pathname: "/setting/collections" }}
                  onClick={() => {
                    setExpanded(false);
                  }}
                >
                  <SvgSetting />
                  Admin setting
                </LinkWithSearchParams>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConnectButton;
