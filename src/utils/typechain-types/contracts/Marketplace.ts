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
} from "../common";

export interface MarketplaceInterface extends utils.Interface {
  functions: {
    "buy(address,uint256)": FunctionFragment;
    "cancelSale(address,uint256)": FunctionFragment;
    "createSale(address,uint256,uint256)": FunctionFragment;
    "sales(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "buy" | "cancelSale" | "createSale" | "sales"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "buy",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "cancelSale",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createSale",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sales",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "cancelSale", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "createSale", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sales", data: BytesLike): Result;

  events: {
    "SaleCancelled(address,address,uint256)": EventFragment;
    "SaleCompleted(address,address,address,uint256,uint256)": EventFragment;
    "SaleCreated(address,address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SaleCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SaleCompleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SaleCreated"): EventFragment;
}

export interface SaleCancelledEventObject {
  nftAddress: string;
  seller: string;
  tokenId: BigNumber;
}
export type SaleCancelledEvent = TypedEvent<
  [string, string, BigNumber],
  SaleCancelledEventObject
>;

export type SaleCancelledEventFilter = TypedEventFilter<SaleCancelledEvent>;

export interface SaleCompletedEventObject {
  nftAddress: string;
  seller: string;
  buyer: string;
  tokenId: BigNumber;
  price: BigNumber;
}
export type SaleCompletedEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  SaleCompletedEventObject
>;

export type SaleCompletedEventFilter = TypedEventFilter<SaleCompletedEvent>;

export interface SaleCreatedEventObject {
  nftAddress: string;
  seller: string;
  tokenId: BigNumber;
  price: BigNumber;
}
export type SaleCreatedEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  SaleCreatedEventObject
>;

export type SaleCreatedEventFilter = TypedEventFilter<SaleCreatedEvent>;

export interface Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketplaceInterface;

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
    buy(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    cancelSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sales(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, boolean] & {
        nftAddress: string;
        tokenId: BigNumber;
        seller: string;
        price: BigNumber;
        active: boolean;
      }
    >;
  };

  buy(
    _nftAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  cancelSale(
    _nftAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createSale(
    _nftAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _price: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sales(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, string, BigNumber, boolean] & {
      nftAddress: string;
      tokenId: BigNumber;
      seller: string;
      price: BigNumber;
      active: boolean;
    }
  >;

  callStatic: {
    buy(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    cancelSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    sales(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, string, BigNumber, boolean] & {
        nftAddress: string;
        tokenId: BigNumber;
        seller: string;
        price: BigNumber;
        active: boolean;
      }
    >;
  };

  filters: {
    "SaleCancelled(address,address,uint256)"(
      nftAddress?: null,
      seller?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): SaleCancelledEventFilter;
    SaleCancelled(
      nftAddress?: null,
      seller?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null
    ): SaleCancelledEventFilter;

    "SaleCompleted(address,address,address,uint256,uint256)"(
      nftAddress?: null,
      seller?: PromiseOrValue<string> | null,
      buyer?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): SaleCompletedEventFilter;
    SaleCompleted(
      nftAddress?: null,
      seller?: PromiseOrValue<string> | null,
      buyer?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): SaleCompletedEventFilter;

    "SaleCreated(address,address,uint256,uint256)"(
      nftAddress?: null,
      seller?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): SaleCreatedEventFilter;
    SaleCreated(
      nftAddress?: null,
      seller?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): SaleCreatedEventFilter;
  };

  estimateGas: {
    buy(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    cancelSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sales(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buy(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    cancelSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createSale(
      _nftAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _price: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sales(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
