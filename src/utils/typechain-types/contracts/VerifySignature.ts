/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface VerifySignatureInterface extends utils.Interface {
  functions: {
    "getEthSignedMessageHash(bytes32)": FunctionFragment;
    "getMessageHash(address,uint256,uint256)": FunctionFragment;
    "recoverSigner(bytes32,bytes)": FunctionFragment;
    "splitSignature(bytes)": FunctionFragment;
    "verify(address,address,uint256,uint256,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getEthSignedMessageHash"
      | "getMessageHash"
      | "recoverSigner"
      | "splitSignature"
      | "verify"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getEthSignedMessageHash",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessageHash",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverSigner",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "splitSignature",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "verify",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "getEthSignedMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "splitSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "verify", data: BytesLike): Result;

  events: {};
}

export interface VerifySignature extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VerifySignatureInterface;

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
    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getMessageHash(
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, number] & { r: string; s: string; v: number }>;

    verify(
      _signer: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  getEthSignedMessageHash(
    _messageHash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getMessageHash(
    _collection: PromiseOrValue<string>,
    _floorPrice: PromiseOrValue<BigNumberish>,
    _blockNumber: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  recoverSigner(
    _ethSignedMessageHash: PromiseOrValue<BytesLike>,
    _signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  splitSignature(
    sig: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, string, number] & { r: string; s: string; v: number }>;

  verify(
    _signer: PromiseOrValue<string>,
    _collection: PromiseOrValue<string>,
    _floorPrice: PromiseOrValue<BigNumberish>,
    _blockNumber: PromiseOrValue<BigNumberish>,
    signature: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getMessageHash(
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, string, number] & { r: string; s: string; v: number }>;

    verify(
      _signer: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMessageHash(
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verify(
      _signer: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getEthSignedMessageHash(
      _messageHash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMessageHash(
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    recoverSigner(
      _ethSignedMessageHash: PromiseOrValue<BytesLike>,
      _signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    splitSignature(
      sig: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verify(
      _signer: PromiseOrValue<string>,
      _collection: PromiseOrValue<string>,
      _floorPrice: PromiseOrValue<BigNumberish>,
      _blockNumber: PromiseOrValue<BigNumberish>,
      signature: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
