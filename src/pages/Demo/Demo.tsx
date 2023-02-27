import React, { useState, useRef, useMemo } from "react";
import cn from "classnames";
import style from "./Demo.module.css";
import {
  useNFT1Contract,
  useNFT2Contract,
  usePikachuContract,
} from "utils/hooks/useContract";
import { useNetwork, useAccount, useSigner } from "wagmi";
import { Button } from "components/ui";
import { useERC721Balance } from "utils/hooks/useERC721Balance";
import Input from "components/ui/Input";
import { SvgEthereum, SvgWallet } from "assets/images/svg";
import Switch from "components/ui/Switch";
import {
  beautifyAddress,
  formatEther,
  toFloat,
  toInteger,
  toString,
} from "utils/helpers/string.helpers";
import { ethers } from "ethers";
import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";
import {
  useOwner,
  usePools,
  useTotalPools,
  useRepayingAmount,
  useLoanByPoolIdAndBorrower,
} from "utils/hooks/pikachu/usePools";
import { useAdminSetting } from "utils/hooks/pikachu/useAdminSetting";
import { SECONDS_PER_DAY } from "utils/constants/number.contants";
import { TestNFT } from "utils/typechain-types";
import {
  INTEREST_TYPE,
  LOAN_STATUS,
  POOL_STATUS,
} from "utils/constants/contact.constants";
const Demo = () => {
  const account = useAccount();
  const signer = useSigner();
  const network = useNetwork();
  const Pikachu = usePikachuContract();
  const NFT1 = useNFT1Contract();
  const NFT2 = useNFT2Contract();

  const nft1Balance = useERC721Balance(NFT1.address, account.address || "");
  const nft2Balance = useERC721Balance(NFT2.address, account.address || "");
  const adminSetting = useAdminSetting();
  const pools = usePools();
  const owner = useOwner();
  const totalPools = useTotalPools();

  const amIOwner = useMemo(() => {
    if (owner.length && owner === account.address) return true;
    return false;
  }, [owner, account.address]);

  // update adminsettings parameters
  const minDepositAmountRef = useRef<HTMLInputElement>(null);
  const feeRecipientRef = useRef<HTMLInputElement>(null);
  const platformFeeRef = useRef<HTMLInputElement>(null);
  const maxBlockNumberSlippageRef = useRef<HTMLInputElement>(null);
  const verifiedCollectionsRef = useRef<HTMLTextAreaElement>(null);

  // update signature parameters
  const nft1FloorPriceRef = useRef<HTMLInputElement>(null);

  // create pool parameters
  const depositAmountRef = useRef<HTMLInputElement>(null);
  const ltvRef = useRef<HTMLInputElement>(null);
  const maxDurationRef = useRef<HTMLInputElement>(null);
  const maxAmountRef = useRef<HTMLInputElement>(null);
  const [dynamicInterest, setDynamicInterest] = useState<boolean>(false);
  const interestStartingRef = useRef<HTMLInputElement>(null);
  const interestCapRef = useRef<HTMLInputElement>(null);
  const supportedCollectionsRef = useRef<HTMLTextAreaElement>(null);
  const [compoundInterest, setCompoundInterest] = useState<boolean>(false);

  // manage pool parameters

  const onWithdrawPool = async (_poolId: number) => {
    const _withdrawAmount = ethers.utils.parseEther(
      (document.getElementById(`withdrawAmount_${_poolId}`) as HTMLInputElement)
        .value
    );
    await Pikachu.withdrawFromPool(_poolId, _withdrawAmount);
  };
  const onTopupPool = async (_poolId: number) => {
    const _depositAmount = ethers.utils.parseEther(
      (document.getElementById(`depositAmount_${_poolId}`) as HTMLInputElement)
        .value
    );
    await Pikachu.depositToPool(_poolId, { value: _depositAmount });
  };

  // create loan parameters
  const [currentpoolId, setCurrentpoolId] = useState(0);
  const collectionRef = useRef<HTMLSelectElement>(null);
  const tokenIdRef = useRef<HTMLInputElement>(null);
  const loanDurationRef = useRef<HTMLInputElement>(null);
  const borrowAmountRef = useRef<HTMLInputElement>(null);
  const floorPriceRef = useRef<HTMLInputElement>(null);
  const blockNumberRef = useRef<HTMLInputElement>(null);
  const signatureRef = useRef<HTMLTextAreaElement>(null);

  const onCreatePool = async () => {
    const ltv = toInteger(ltvRef.current?.value);
    const maxDuration =
      toInteger(maxDurationRef.current?.value) * SECONDS_PER_DAY;
    const maxAmount = maxAmountRef.current?.value || "0";
    const depositAmount = ethers.utils.parseEther(
      depositAmountRef.current?.value || "0"
    );
    const interestStarting = toInteger(
      toFloat(interestStartingRef.current?.value) * 100
    );
    const interestCap = toInteger(toFloat(interestCapRef.current?.value) * 100);
    const collections = toString(supportedCollectionsRef.current?.value)
      .split("\n")
      .map((item) => item.trim());

    await Pikachu.createPool(
      ltv,
      ethers.utils.parseEther(maxAmount),
      dynamicInterest ? 1 : 0,
      interestStarting,
      interestCap,
      maxDuration,
      compoundInterest,
      collections,
      { value: depositAmount }
    );
  };
  const onUpdateAdminSettings = async () => {
    const adminSettings: IPikachu.AdminSettingStruct = {
      blockNumberSlippage: toInteger(maxBlockNumberSlippageRef.current?.value),
      feeTo: feeRecipientRef.current?.value || "",
      minDepositAmount: ethers.utils.parseEther(
        toString(minDepositAmountRef.current?.value)
      ),
      platformFee: toFloat(platformFeeRef.current?.value) * 100,
      verifiedCollections: (verifiedCollectionsRef.current?.value || "")
        .split("\n")
        .map((item) => item.trim()),
    };
    await Pikachu.updateAdminSetting(adminSettings);
  };
  const onMintNFT1 = async () => {
    console.log(await NFT1.provider.getNetwork());
    // alert(account.address);
    if (account.address) await NFT1.awardItem(account.address, "");
  };

  const onApproveERC721 = async (ERC721Contract: TestNFT) => {
    await ERC721Contract.setApprovalForAll(Pikachu.address, true);
  };
  const onGenerateSignature = async (erc721Address: string) => {
    const floorPrice = ethers.utils.parseEther(
      toString(nft1FloorPriceRef.current?.value)
    );
    const blockNumber = (await signer.data?.provider?.getBlockNumber()) || 0;

    const hash = await Pikachu.getMessageHash(
      erc721Address,
      floorPrice,
      blockNumber
    );

    const signature = await signer.data?.signMessage(
      ethers.utils.arrayify(hash)
    );
    console.log(signature, blockNumber);
  };
  const onMintNFT2 = async () => {
    console.log(await NFT2.provider.getNetwork());
    // alert(account.address);
    if (account.address) await NFT2.awardItem(account.address, "");
  };

  const onCreateLoan = async () => {
    const _collection = toString(collectionRef.current?.value);
    const _tokenId = toInteger(tokenIdRef.current?.value);
    const _duration = toInteger(loanDurationRef.current?.value) * 86400;
    const _amount = ethers.utils.parseEther(
      toString(borrowAmountRef.current?.value)
    );
    const _signature = toString(signatureRef.current?.value).trim();
    const _floorPrice = ethers.utils.parseEther(
      toString(floorPriceRef.current?.value)
    );
    const blockNumber = toInteger(blockNumberRef.current?.value);
    await Pikachu.borrow(
      currentpoolId,
      _collection,
      _tokenId,
      _duration,
      _amount,
      _signature,
      _floorPrice,
      blockNumber
    );
  };

  // manage loans
  const loan = useLoanByPoolIdAndBorrower(currentpoolId, account.address || "");

  const repayingAmount = useRepayingAmount(loan);

  const onRepayLoan = async () => {
    await Pikachu.repay(currentpoolId, { value: repayingAmount });
  };

  return (
    <div className={cn(style.root)}>
      <h3 className="text-3xl">
        {network.chain?.name} - {network.chain?.rpcUrls.public} -{" "}
        {network.chain?.id}
      </h3>
      <div className={cn(style.contracts)}>
        <div className={cn(style.contract)}>
          <span className="text-[14px]">Pikachu: {Pikachu.address}</span>

          <div className={cn(style.adminSettings)}>
            <span>Admin Settings</span>

            <div className={cn(style.inputItem)}>
              <label>Min Deposit Amount:</label>
              <Input
                innerRef={minDepositAmountRef}
                placeholder="30.25"
                defaultValue={formatEther(adminSetting.minDepositAmount)}
                icon={<SvgEthereum className="w-5 h-5" />}
              />
            </div>

            <div className={cn(style.inputItem)}>
              <label>Fee Recipient:</label>
              <Input
                innerRef={feeRecipientRef}
                placeholder="0x~~"
                defaultValue={adminSetting.feeTo}
                icon={<SvgWallet className="w-5 h-5" />}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Platform Fee:</label>
              <Input
                innerRef={platformFeeRef}
                placeholder="5"
                defaultValue={adminSetting.platformFee / 100}
                icon={<span className="font-bold">%</span>}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Block Slippage:</label>
              <Input
                innerRef={maxBlockNumberSlippageRef}
                placeholder="300"
                defaultValue={adminSetting.blockNumberSlippage}
              />
            </div>
            <textarea
              placeholder="Verified NFT Addresses(type line by line)"
              className="w-full h-24"
              ref={verifiedCollectionsRef}
            ></textarea>

            <Button variant="yellow" sx="w-56" onClick={onUpdateAdminSettings}>
              Update Admin Settings
            </Button>
          </div>
          <hr />
          <span className="text-[14px]">NFT-1: {NFT1.address}</span>
          <div className="flex gap-4">
            <Button variant="yellow" sx="w-32" onClick={onMintNFT1}>
              Mint
            </Button>

            <Button
              variant="gray"
              sx="w-40"
              onClick={() => onApproveERC721(NFT1)}
            >
              Approve Pikachu
            </Button>
          </div>
          <span>You have {nft1Balance} items</span>

          {amIOwner && (
            <div className={cn(style.adminSettings)}>
              <div className={cn(style.inputItem)}>
                <label>Floor Price:</label>
                <Input
                  innerRef={nft1FloorPriceRef}
                  placeholder="0.1"
                  icon={<SvgEthereum className="w-5 h-5" />}
                />
              </div>
              <Button
                variant="gray"
                sx="w-48"
                onClick={() => onGenerateSignature(NFT1.address)}
              >
                Gernate Signature
              </Button>
            </div>
          )}
          <hr />
          <span className="text-[14px]">NFT-2: {NFT2.address}</span>
          <Button variant="yellow" sx="w-32" onClick={onMintNFT2}>
            Mint
          </Button>

          <span>You have {nft2Balance} items</span>
        </div>
        <div className={cn(style.contract)}>
          <div className={cn(style.poolConfig)}>
            <div className={cn(style.inputItem)}>
              <label>Loan to value (LTV):</label>
              <Input
                innerRef={ltvRef}
                placeholder="40"
                icon={<span className="font-bold">%</span>}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Create the pool size:</label>
              <Input
                innerRef={depositAmountRef}
                placeholder="30.25"
                icon={<SvgEthereum className="w-5 h-5" />}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Max Duration:</label>
              <Input
                innerRef={maxDurationRef}
                placeholder="7"
                icon={<span className="font-bold">Days</span>}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Max amount per loan:</label>
              <Input
                innerRef={maxAmountRef}
                placeholder="0.05"
                icon={<SvgEthereum className="w-5 h-5" />}
              />
            </div>

            <div className={cn(style.inputItem)}>
              <label>Use dynamic interest?</label>
              <Switch
                toggled={dynamicInterest}
                setToggled={setDynamicInterest}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Interest Starting %:</label>
              <Input
                innerRef={interestStartingRef}
                placeholder="5"
                icon={<span className="font-bold">%</span>}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Interest Cap %:</label>
              <Input
                innerRef={interestCapRef}
                placeholder="4"
                icon={<span className="font-bold">%</span>}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Compound interest?</label>
              <Switch
                toggled={compoundInterest}
                setToggled={setCompoundInterest}
              />
            </div>

            <textarea
              placeholder="Input Addresses line by line"
              className="w-full h-24"
              ref={supportedCollectionsRef}
            ></textarea>
            <Button variant="yellow" sx="w-32" onClick={onCreatePool}>
              Create Pool
            </Button>
          </div>

          <div className={cn(style.poolsBox)}>
            <span>Total Pools: {totalPools}</span>
            {pools.map((pool, poolId) => (
              <div key={poolId} className={cn(style.pool)}>
                <span className={cn(style.stressed)}>
                  Pool #{poolId} Status: {POOL_STATUS[pool.status]}
                </span>
                <span>
                  Owner: <br />
                  {pool.owner}
                </span>
                <span>
                  Loan to value (LTV): {pool.loanToValue.toNumber()} %
                </span>
                <span>
                  Availabe Amount: {formatEther(pool.availableAmount)}
                  <SvgEthereum />
                </span>
                <span>
                  Max Loan: {formatEther(pool.maxAmount)}
                  <SvgEthereum />
                </span>
                <span>
                  Max Duration: {pool.maxDuration.toNumber() / SECONDS_PER_DAY}{" "}
                  Days
                </span>
                <span>Compound Interest: {pool.compound ? "Yes" : "No"}</span>
                <span>
                  Interest Type: {INTEREST_TYPE[pool.interestType]} Interest
                </span>
                <span>
                  Starting Rate: {pool.interestStartRate.toNumber() / 100}%
                </span>
                <span>
                  Cap Rate: {pool.interestCapRate.toNumber() / 100}% per Day
                </span>
                <span>
                  Supported Collections: {pool.collections.length}
                  {pool.collections.map((collection, index) => (
                    <React.Fragment key={index}>
                      <br />
                      {collection}
                    </React.Fragment>
                  ))}
                </span>

                {pool.owner === account.address && (
                  <>
                    <div className={cn(style.inputItem)}>
                      <Button
                        variant="gray"
                        sx="w-32"
                        onClick={() => onWithdrawPool(poolId)}
                      >
                        Withdraw
                      </Button>
                      <Input
                        id={`withdrawAmount_${poolId}`}
                        placeholder="0.05"
                        icon={<SvgEthereum className="w-5 h-5" />}
                      />
                    </div>
                    <div className={cn(style.inputItem)}>
                      <Button
                        variant="yellow"
                        sx="w-32"
                        onClick={() => onTopupPool(poolId)}
                      >
                        Deposit
                      </Button>
                      <Input
                        id={`depositAmount_${poolId}`}
                        placeholder="0.05"
                        icon={<SvgEthereum className="w-5 h-5" />}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={cn(style.contract)}>
          <div className={cn(style.loanConfig)}>
            <span>Create Loan</span>

            <div className={cn(style.inputItem)}>
              <label>Select Pool:</label>
              <select
                className="w-40"
                onChange={(e) => setCurrentpoolId(toInteger(e.target.value))}
              >
                {pools.map((pool, index) => (
                  <option key={index} value={index}>
                    {beautifyAddress(pool.owner, 6)}
                  </option>
                ))}
              </select>
            </div>

            <div className={cn(style.inputItem)}>
              <label>Select Collection:</label>
              <select className="w-40" ref={collectionRef}>
                {pools[currentpoolId]?.collections.map((collection, index) => (
                  <option key={index} value={collection}>
                    {beautifyAddress(collection, 6)}
                  </option>
                ))}
              </select>
            </div>

            <div className={cn(style.inputItem)}>
              <label>Token Id:</label>
              <Input
                innerRef={tokenIdRef}
                placeholder="154"
                icon={<SvgWallet className="w-5 h-5" />}
              />
            </div>

            <div className={cn(style.inputItem)}>
              <label>Loan Duration:</label>
              <Input
                innerRef={loanDurationRef}
                placeholder="7"
                icon={<span className="font-bold">Days</span>}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Borrow Amount:</label>
              <Input
                innerRef={borrowAmountRef}
                placeholder="1.5"
                icon={<SvgEthereum className="w-5 h-5" />}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Floor Price:</label>
              <Input
                innerRef={floorPriceRef}
                placeholder="0.1"
                icon={<SvgEthereum className="w-5 h-5" />}
              />
            </div>
            <div className={cn(style.inputItem)}>
              <label>Block Number:</label>
              <Input
                innerRef={blockNumberRef}
                placeholder="0.1"
                icon={<SvgEthereum className="w-5 h-5" />}
              />
            </div>
            <textarea
              placeholder="Type signature from Server"
              className="w-full h-24"
              ref={signatureRef}
            ></textarea>
            <Button variant="yellow" sx="w-32" onClick={onCreateLoan}>
              Create Loan
            </Button>
          </div>

          <div className={cn(style.loanConfig)}>
            <span>Manage Your Loan</span>

            <div className={cn(style.inputItem)}>
              <label>Select Pool:</label>
              <select
                className="w-40"
                onChange={(e) => setCurrentpoolId(toInteger(e.target.value))}
              >
                {pools.map((pool, index) => (
                  <option key={index} value={index}>
                    {beautifyAddress(pool.owner, 6)}
                  </option>
                ))}
              </select>
            </div>

            {loan?.status !== 0 && (
              <div className={cn(style.loan)}>
                <span className={cn(style.stressed)}>
                  Loan Status: {LOAN_STATUS[loan.status]}
                </span>
                <span>
                  Borrowed Amount: {formatEther(loan.amount)}
                  <SvgEthereum />
                </span>
                <span>
                  Repaying Amount: {formatEther(repayingAmount)}
                  <SvgEthereum />
                </span>
                <span>
                  Starting Rate: {toFloat(loan.interestStartRate) / 100}%
                </span>
                <span>Cap Rate: {toFloat(loan.interestCapRate) / 100}%</span>
                <span>
                  Duration: {toInteger(loan.duration) / SECONDS_PER_DAY}
                  Days
                </span>
                <span>
                  Collection: <br />
                  {loan.collection}
                </span>
                <span>Token Id: {toInteger(loan.tokenId)}</span>

                <span>Block Number: {toInteger(loan.blockNumber)}</span>
                <span>
                  Borrow Date:{" "}
                  {new Date(toInteger(loan.timestamp) * 1000).toLocaleString()}
                </span>

                {loan.status === 1 && (
                  <Button variant="gray" sx="w-24" onClick={onRepayLoan}>
                    Repay
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
