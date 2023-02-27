import style from "./PoolEditDrawer.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { Button, Input, Switch } from "components/ui";
import { SvgEthereum } from "assets/images/svg";
import { useState, useMemo, useEffect } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calculateRepayAmount } from "utils/helpers/contract.helpers";
import {
  beautifyDecimals,
  formatEther,
  toFloat,
  toInteger,
} from "utils/helpers/string.helpers";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import CollectionSelector from "../CollectionSelector";
import { useSettingStore } from "store";
import { usePikachuContract } from "utils/hooks/useContract";
import { ethers } from "ethers";
import { refreshPools } from "utils/apis/pikachu.api";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";

type IProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  pool: IPikachu.PoolStructOutput;
};

const PoolEditDrawer = ({ pool, setVisible }: IProps) => {
  const {
    setTxDescription,
    setTxConfirmationModalVisible,
    submitTransaction,
    setTxRejectModalVisible,
    setRefreshedAt,
  } = useSettingStore();

  const Pikachu = usePikachuContract();
  // edit pool parameters
  const [ltv, setLtv] = useState("0");
  const [maxDuration, setMaxDuration] = useState("0");
  const [maxAmount, setMaxAmount] = useState("0");

  const [dynamicInterest, setDynamicInterest] = useState<boolean>(false);
  const [interestStarting, setInterestStarting] = useState("0");
  const [interestCap, setInterestCap] = useState("0");
  const [supportedCollections, setSupportedCollections] = useState<string[]>(
    []
  );
  const [compoundInterest, setCompoundInterest] = useState<boolean>(false);
  const [termAgreed, setTermAgreed] = useState<boolean>(false);

  useEffect(() => {
    setLtv((pool.loanToValue.toNumber() / 100).toString());
    setMaxDuration((pool.maxDuration.toNumber() / SECONDS_PER_DAY).toString());
    setMaxAmount(formatEther(pool.maxAmount).toString());

    setDynamicInterest(pool.interestType === 1);

    setInterestStarting((pool.interestStartRate.toNumber() / 100).toString());
    setInterestCap((pool.interestCapRate.toNumber() / 100).toString());
    setDynamicInterest(pool.compound);

    setSupportedCollections(pool.collections.map((item) => item.toLowerCase()));
  }, [pool]);

  const data = useMemo(() => {
    const days = [1, 3, 5, 7, 9, 11, 13];
    const interests = days.map((day) => {
      return calculateRepayAmount(
        1,
        Number(dynamicInterest),
        toFloat(interestStarting) * 100,
        toFloat(interestCap) * 100,
        day * SECONDS_PER_DAY
      );
    });
    return days.map((day, index) => ({
      name: `${day}d`,
      interest: (interests[index] - 1) * 100,
    }));
  }, [dynamicInterest, interestCap, interestStarting]);

  const onSubmit = async () => {
    try {
      if (termAgreed === false) {
        setTxDescription("You need to agree the terms...");
        setTxRejectModalVisible(true);
        return;
      }
      setTxDescription("Updating Pool...");
      setTxConfirmationModalVisible(true);
      submitTransaction(
        Pikachu.updatePool(
          pool.poolId,
          toInteger(toFloat(ltv) * 100),
          ethers.utils.parseEther(maxAmount),
          dynamicInterest ? 1 : 0,
          toInteger(toFloat(interestStarting) * 100),
          toInteger(toFloat(interestCap) * 100),
          toInteger(maxDuration) * SECONDS_PER_DAY,
          compoundInterest,
          supportedCollections
        ),
        async () => {
          await refreshPools();
          setRefreshedAt(new Date());
        }
      );
    } catch (error) {}
  };

  return (
    <div className={cn(style.root)}>
      <div className={cn(style.heading)}>
        <h3>Edit the pool</h3>
        <span>Please choose the parameters of your pool</span>
      </div>

      <div className={cn(style.controls)}>
        <div>
          <span className={cn(style.label)}>Basic settings</span>

          <CollectionSelector
            options={supportedCollections}
            setOptions={setSupportedCollections}
          />

          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              The amount of liquidity in your Pool
            </span>
            The the pool size:
            <span className={cn(style.info)}>
              {beautifyDecimals(pool.availableAmount)} <SvgEthereum />
            </span>
          </div>

          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              The maximum percentage of floor price that you authorize in a
              loan, ex: for a collection with a floor price of 50 ETH, if you
              set a loan to value of 50% you will give maximum 25 ETH in the
              loan.
            </span>
            Loan to value (LTV):
            <Input
              icon={"%"}
              placeholder="40"
              value={ltv}
              onChange={(e) => setLtv(e.target.value)}
            />
          </div>
          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              The maximum amount per loan in SOL, can be useful if you want to
              do only small loans and not always the maximum.
            </span>
            Max Duration:
            <Input
              icon={"Days"}
              placeholder="7"
              value={maxDuration}
              onChange={(e) => setMaxDuration(e.target.value)}
            />
          </div>
          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              The amount of liquidity in your Pool
            </span>
            Max amount per loan:
            <Input
              icon={<SvgEthereum />}
              placeholder="0.0"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
            <span className={cn(style.info)}>No more than pool size</span>
          </div>
        </div>

        <div>
          <span className={cn(style.label)}>Interest settings</span>

          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              Dynamic interest means that the pool will auto adjust it’s
              interest depending on liquidity available, amount of the loan and
              loan duration, if you choose manual, you will have to provide a
              rate and the pool interest will be fixed.
            </span>
            Use dynamic interest?
            <Switch toggled={dynamicInterest} setToggled={setDynamicInterest} />
          </div>

          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              Daily fixed interest of the pool.
            </span>
            Basic interest:
            <Input
              icon={"%"}
              placeholder="4.75"
              value={interestStarting}
              onChange={(e) => setInterestStarting(e.target.value)}
            />
          </div>

          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              Set the short term interest, use the chart to simulate yield based
              on provided value.
            </span>
            Interest Cap %:
            <Input
              icon={"%"}
              placeholder="5.89"
              value={interestCap}
              onChange={(e) => setInterestCap(e.target.value)}
            />
          </div>

          <div className={cn(style.form, "tooltip-container")}>
            <span className={cn(style.tooltip, "tooltip top")}>
              If checked, the interest will be re-injected in the pool, allowing
              your pool to grow exponentially over time, if unchecked, interest
              will be sent to your address.
            </span>
            Compound interest?
            <Switch
              toggled={compoundInterest}
              setToggled={setCompoundInterest}
            />
          </div>
          <div className={cn(style.chart)}>
            <span>Interest Chart</span>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis interval="preserveStart" />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className={cn(style.chart_tooltip)}>
                          {`${label} loan interest : ${Number(
                            payload[0].value
                          ).toFixed(2)}%`}
                        </div>
                      );
                    }

                    return null;
                  }}
                />
                <Area
                  dot={{
                    stroke: "#37AB45",
                    fill: "#FFF",
                    strokeWidth: 2,
                    r: 4,
                    strokeDasharray: "",
                  }}
                  dataKey="interest"
                  stroke="#37AB45"
                  fill="#37AB4580"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={cn(style.term)}>
        I agree with the above terms.
        <Switch toggled={termAgreed} setToggled={setTermAgreed} />
      </div>
      <div className={cn(style.footer)}>
        <Button onClick={() => setVisible(false)}>Cancel</Button>
        <Button variant="yellow" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PoolEditDrawer;
