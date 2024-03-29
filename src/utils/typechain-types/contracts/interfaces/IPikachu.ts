/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace IPikachu {
  export type AdminSettingStruct = {
    verifiedCollections: PromiseOrValue<string>[];
    stableCoins: PromiseOrValue<string>[];
    feeTo: PromiseOrValue<string>;
    minDepositAmount: PromiseOrValue<BigNumberish>;
    platformFee: PromiseOrValue<BigNumberish>;
    blockNumberSlippage: PromiseOrValue<BigNumberish>;
  };

  export type AdminSettingStructOutput = [
    string[],
    string[],
    string,
    BigNumber,
    number,
    number
  ] & {
    verifiedCollections: string[];
    stableCoins: string[];
    feeTo: string;
    minDepositAmount: BigNumber;
    platformFee: number;
    blockNumberSlippage: number;
  };
}

export interface IPikachuInterface extends utils.Interface {
  functions: {
    "borrow(uint256,address,uint256,uint256,uint256,bytes,uint256,uint256)": FunctionFragment;
    "getAdminSetting()": FunctionFragment;
    "repay(uint256)": FunctionFragment;
    "verifiedCollections()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "borrow"
      | "getAdminSetting"
      | "repay"
      | "verifiedCollections"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "borrow",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAdminSetting",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "repay",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "verifiedCollections",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "borrow", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAdminSetting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifiedCollections",
    data: BytesLike
  ): Result;

  events: {
    "CreatedLoan(uint256,address,uint256,address,uint256,uint8,uint256,uint256,uint256)": EventFragment;
    "CreatedPool(address,uint256,uint256)": EventFragment;
    "LiquidatedLoan(uint256,address,uint256)": EventFragment;
    "RepayedLoan(uint256,address)": EventFragment;
    "UpdatedPool(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreatedLoan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreatedPool"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LiquidatedLoan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RepayedLoan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdatedPool"): EventFragment;
}

export interface CreatedLoanEventObject {
  poolId: BigNumber;
  borrower: string;
  amount: BigNumber;
  collection: string;
  tokenId: BigNumber;
  interestType: number;
  interestStartRate: BigNumber;
  interestCapRate: BigNumber;
  duration: BigNumber;
}
export type CreatedLoanEvent = TypedEvent<
  [
    BigNumber,
    string,
    BigNumber,
    string,
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    BigNumber
  ],
  CreatedLoanEventObject
>;

export type CreatedLoanEventFilter = TypedEventFilter<CreatedLoanEvent>;

export interface CreatedPoolEventObject {
  poolOwner: string;
  poolId: BigNumber;
  amount: BigNumber;
}
export type CreatedPoolEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  CreatedPoolEventObject
>;

export type CreatedPoolEventFilter = TypedEventFilter<CreatedPoolEvent>;

export interface LiquidatedLoanEventObject {
  poolId: BigNumber;
  borrower: string;
  amount: BigNumber;
}
export type LiquidatedLoanEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  LiquidatedLoanEventObject
>;

export type LiquidatedLoanEventFilter = TypedEventFilter<LiquidatedLoanEvent>;

export interface RepayedLoanEventObject {
  poolId: BigNumber;
  borrower: string;
}
export type RepayedLoanEvent = TypedEvent<
  [BigNumber, string],
  RepayedLoanEventObject
>;

export type RepayedLoanEventFilter = TypedEventFilter<RepayedLoanEvent>;

export interface UpdatedPoolEventObject {
  poolOwner: string;
  poolId: BigNumber;
}
export type UpdatedPoolEvent = TypedEvent<
  [string, BigNumber],
  UpdatedPoolEventObject
>;

export type UpdatedPoolEventFilter = TypedEventFilter<UpdatedPoolEvent>;

export interface IPikachu extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IPikachuInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    borrow(
      _poolId: PromiseOrValue<BigNumberish>,
      _collection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAdminSetting(
      overrides?: CallOverrides
    ): Promise<[IPikachu.AdminSettingStructOutput]>;

    repay(
      _poolId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    verifiedCollections(overrides?: CallOverrides): Promise<[string[]]>;
  };

  borrow(
    _poolId: PromiseOrValue<BigNumberish>,
    _collection: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _duration: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    _signature: PromiseOrValue<BytesLike>,
    _floorPrice: PromiseOrValue<BigNumberish>,
    _blockNumber: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAdminSetting(
    overrides?: CallOverrides
  ): Promise<IPikachu.AdminSettingStructOutput>;

  repay(
    _poolId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  verifiedCollections(overrides?: CallOverrides): Promise<string[]>;

  callStatic: {
    borrow(
      _poolId: PromiseOrValue<BigNumberish>,
      _collection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAdminSetting(
      overrides?: CallOverrides
    ): Promise<IPikachu.AdminSettingStructOutput>;

    repay(
      _poolId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    verifiedCollections(overrides?: CallOverrides): Promise<string[]>;
  };

  filters: {
    "CreatedLoan(uint256,address,uint256,address,uint256,uint8,uint256,uint256,uint256)"(
      poolId?: PromiseOrValue<BigNumberish> | null,
      borrower?: PromiseOrValue<string> | null,
      amount?: null,
      collection?: null,
      tokenId?: null,
      interestType?: null,
      interestStartRate?: null,
      interestCapRate?: null,
      duration?: null
    ): CreatedLoanEventFilter;
    CreatedLoan(
      poolId?: PromiseOrValue<BigNumberish> | null,
      borrower?: PromiseOrValue<string> | null,
      amount?: null,
      collection?: null,
      tokenId?: null,
      interestType?: null,
      interestStartRate?: null,
      interestCapRate?: null,
      duration?: null
    ): CreatedLoanEventFilter;

    "CreatedPool(address,uint256,uint256)"(
      poolOwner?: PromiseOrValue<string> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): CreatedPoolEventFilter;
    CreatedPool(
      poolOwner?: PromiseOrValue<string> | null,
      poolId?: PromiseOrValue<BigNumberish> | null,
      amount?: null
    ): CreatedPoolEventFilter;

    "LiquidatedLoan(uint256,address,uint256)"(
      poolId?: PromiseOrValue<BigNumberish> | null,
      borrower?: PromiseOrValue<string> | null,
      amount?: null
    ): LiquidatedLoanEventFilter;
    LiquidatedLoan(
      poolId?: PromiseOrValue<BigNumberish> | null,
      borrower?: PromiseOrValue<string> | null,
      amount?: null
    ): LiquidatedLoanEventFilter;

    "RepayedLoan(uint256,address)"(
      poolId?: PromiseOrValue<BigNumberish> | null,
      borrower?: PromiseOrValue<string> | null
    ): RepayedLoanEventFilter;
    RepayedLoan(
      poolId?: PromiseOrValue<BigNumberish> | null,
      borrower?: PromiseOrValue<string> | null
    ): RepayedLoanEventFilter;

    "UpdatedPool(address,uint256)"(
      poolOwner?: PromiseOrValue<string> | null,
      poolId?: PromiseOrValue<BigNumberish> | null
    ): UpdatedPoolEventFilter;
    UpdatedPool(
      poolOwner?: PromiseOrValue<string> | null,
      poolId?: PromiseOrValue<BigNumberish> | null
    ): UpdatedPoolEventFilter;
  };

  estimateGas: {
    borrow(
      _poolId: PromiseOrValue<BigNumberish>,
      _collection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAdminSetting(overrides?: CallOverrides): Promise<BigNumber>;

    repay(
      _poolId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    verifiedCollections(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    borrow(
      _poolId: PromiseOrValue<BigNumberish>,
      _collection: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _duration: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      _signature: PromiseOrValue<BytesLike>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAdminSetting(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    repay(
      _poolId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    verifiedCollections(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
