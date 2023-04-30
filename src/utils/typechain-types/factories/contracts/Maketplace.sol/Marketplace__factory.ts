/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Marketplace,
  MarketplaceInterface,
} from "../../../contracts/Maketplace.sol/Marketplace";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IPikachu",
        name: "_masterAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "SaleCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "SaleCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "SaleCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "cancelSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "createSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "sales",
    outputs: [
      {
        internalType: "address",
        name: "nftAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "active",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161098938038061098983398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b6108f6806100936000396000f3fe60806040526004361061003f5760003560e01c806316f3a95b146100445780633a1c83ac146100665780639f161af214610103578063cce7ec1314610123575b600080fd5b34801561005057600080fd5b5061006461005f36600461083b565b610136565b005b34801561007257600080fd5b506100c961008136600461083b565b60016020818152600093845260408085209091529183529120805491810154600282015460038301546004909301546001600160a01b03948516949293919092169160ff1685565b604080516001600160a01b039687168152602081019590955292909416838301526060830152911515608082015290519081900360a00190f35b34801561010f57600080fd5b5061006461011e366004610867565b6102f9565b61006461013136600461083b565b6105d9565b6001600160a01b038083166000908152600160208181526040808420868552825292839020835160a081018552815486168152928101549183019190915260028101549093169181018290526003830154606082015260049092015460ff161515608083015233146101ef5760405162461bcd60e51b815260206004820152601b60248201527f4f6e6c792073656c6c65722063616e2063616e63656c2073616c65000000000060448201526064015b60405180910390fd5b60408181015160208301519151632142170760e11b81523060048201526001600160a01b03918216602482015260448101929092528491908216906342842e0e90606401600060405180830381600087803b15801561024d57600080fd5b505af1158015610261573d6000803e3d6000fd5b505050506001600160a01b0384166000818152600160208181526040808420888552825280842080546001600160a01b0319908116825593810185905560028101805490941690935560038301939093556004909101805460ff191690559051918252849133917f8dcbcc19445d8231a7895431f4e4912f7d57775b251dcffa5e98e092f009abfd910160405180910390a350505050565b600081116103495760405162461bcd60e51b815260206004820152601c60248201527f5072696365206d7573742062652067726561746572207468616e20300000000060448201526064016101e6565b6040516331a9108f60e11b815260048101839052839033906001600160a01b03831690636352211e90602401602060405180830381865afa158015610392573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b6919061089c565b6001600160a01b03161461040c5760405162461bcd60e51b815260206004820181905260248201527f4f6e6c7920746f6b656e206f776e65722063616e206372656174652073616c6560448201526064016101e6565b604051632142170760e11b8152336004820152306024820152604481018490526001600160a01b038216906342842e0e90606401600060405180830381600087803b15801561045a57600080fd5b505af115801561046e573d6000803e3d6000fd5b5050505060006040518060a00160405280866001600160a01b03168152602001858152602001336001600160a01b031681526020018481526020016001151581525090508060016000876001600160a01b03166001600160a01b03168152602001908152602001600020600086815260200190815260200160002060008201518160000160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506020820151816001015560408201518160020160006101000a8154816001600160a01b0302191690836001600160a01b031602179055506060820151816003015560808201518160040160006101000a81548160ff02191690831515021790555090505083336001600160a01b03167fcacf94283cfd6aa91430302d58e00cf68ee078b40a9c3de3e0de7fc12b3063ef87866040516105ca9291906001600160a01b03929092168252602082015260400190565b60405180910390a35050505050565b6001600160a01b038083166000908152600160208181526040808420868552825292839020835160a08101855281548616815281840154928101929092526002810154909416928101929092526003830154606083015260049092015460ff161515608082018190529091146106865760405162461bcd60e51b815260206004820152601260248201527153616c65206973206e6f742061637469766560701b60448201526064016101e6565b80606001513410156106cf5760405162461bcd60e51b8152602060048201526012602482015271496e73756666696369656e742066756e647360701b60448201526064016101e6565b6020810151604051632142170760e11b8152306004820152336024820152604481019190915283906001600160a01b038216906342842e0e90606401600060405180830381600087803b15801561072557600080fd5b505af1158015610739573d6000803e3d6000fd5b50505060408084015190519091506001600160a01b038216903480156108fc02916000818181858888f19350505050158015610779573d6000803e3d6000fd5b506001600160a01b0385811660008181526001602081815260408084208a8552825280842080546001600160a01b0319908116825593810185905560028101805490941690935560038301939093556004909101805460ff19169055868201516060880151835194855291840191909152879333939116917f6c66c353e1e24b88b0aaf169abd5f5b7e5e7f91e1e381476918b2d11f402aef8910160405180910390a45050505050565b6001600160a01b038116811461083857600080fd5b50565b6000806040838503121561084e57600080fd5b823561085981610823565b946020939093013593505050565b60008060006060848603121561087c57600080fd5b833561088781610823565b95602085013595506040909401359392505050565b6000602082840312156108ae57600080fd5b81516108b981610823565b939250505056fea2646970667358221220c1ffe7008a7d8aec849a3e2dd540d0d81488369d37f78bfeb03f5662f6555de464736f6c63430008110033";

type MarketplaceConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarketplaceConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Marketplace__factory extends ContractFactory {
  constructor(...args: MarketplaceConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _masterAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Marketplace> {
    return super.deploy(
      _masterAddress,
      overrides || {}
    ) as Promise<Marketplace>;
  }
  override getDeployTransaction(
    _masterAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_masterAddress, overrides || {});
  }
  override attach(address: string): Marketplace {
    return super.attach(address) as Marketplace;
  }
  override connect(signer: Signer): Marketplace__factory {
    return super.connect(signer) as Marketplace__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarketplaceInterface {
    return new utils.Interface(_abi) as MarketplaceInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Marketplace {
    return new Contract(address, _abi, signerOrProvider) as Marketplace;
  }
}