/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TestNFT,
  TestNFTInterface,
} from "../../../../contracts/test/ERC721_TEST.sol/TestNFT";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "awardItem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a7d38038062001a7d833981016040819052620000349162000123565b818160006200004483826200021c565b5060016200005382826200021c565b5050505050620002e8565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008657600080fd5b81516001600160401b0380821115620000a357620000a36200005e565b604051601f8301601f19908116603f01168101908282118183101715620000ce57620000ce6200005e565b81604052838152602092508683858801011115620000eb57600080fd5b600091505b838210156200010f5785820183015181830184015290820190620000f0565b600093810190920192909252949350505050565b600080604083850312156200013757600080fd5b82516001600160401b03808211156200014f57600080fd5b6200015d8683870162000074565b935060208501519150808211156200017457600080fd5b50620001838582860162000074565b9150509250929050565b600181811c90821680620001a257607f821691505b602082108103620001c357634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021757600081815260208120601f850160051c81016020861015620001f25750805b601f850160051c820191505b818110156200021357828155600101620001fe565b5050505b505050565b81516001600160401b038111156200023857620002386200005e565b62000250816200024984546200018d565b84620001c9565b602080601f8311600181146200028857600084156200026f5750858301515b600019600386901b1c1916600185901b17855562000213565b600085815260208120601f198616915b82811015620002b95788860151825594840194600190910190840162000298565b5085821015620002d85787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61178580620002f86000396000f3fe6080604052600436106100dd5760003560e01c806370a082311161007f578063b88d4fde11610059578063b88d4fde14610256578063c87b56dd14610276578063cf37834314610296578063e985e9c5146102a957600080fd5b806370a08231146101f357806395d89b4114610221578063a22cb4651461023657600080fd5b8063095ea7b3116100bb578063095ea7b31461017157806323b872dd1461019357806342842e0e146101b35780636352211e146101d357600080fd5b806301ffc9a7146100e257806306fdde0314610117578063081812fc14610139575b600080fd5b3480156100ee57600080fd5b506101026100fd36600461114f565b6102f2565b60405190151581526020015b60405180910390f35b34801561012357600080fd5b5061012c610344565b60405161010e91906111bc565b34801561014557600080fd5b506101596101543660046111cf565b6103d6565b6040516001600160a01b03909116815260200161010e565b34801561017d57600080fd5b5061019161018c366004611204565b6103fd565b005b34801561019f57600080fd5b506101916101ae36600461122e565b610517565b3480156101bf57600080fd5b506101916101ce36600461122e565b610548565b3480156101df57600080fd5b506101596101ee3660046111cf565b610563565b3480156101ff57600080fd5b5061021361020e36600461126a565b6105c3565b60405190815260200161010e565b34801561022d57600080fd5b5061012c610649565b34801561024257600080fd5b50610191610251366004611285565b610658565b34801561026257600080fd5b5061019161027136600461134d565b610667565b34801561028257600080fd5b5061012c6102913660046111cf565b61069f565b6102136102a43660046113c9565b6107af565b3480156102b557600080fd5b506101026102c436600461142b565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061032357506001600160e01b03198216635b5e139f60e01b145b8061033e57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546103539061145e565b80601f016020809104026020016040519081016040528092919081815260200182805461037f9061145e565b80156103cc5780601f106103a1576101008083540402835291602001916103cc565b820191906000526020600020905b8154815290600101906020018083116103af57829003601f168201915b5050505050905090565b60006103e1826107e6565b506000908152600460205260409020546001600160a01b031690565b600061040882610563565b9050806001600160a01b0316836001600160a01b03160361047a5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b0382161480610496575061049681336102c4565b6105085760405162461bcd60e51b815260206004820152603d60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c0000006064820152608401610471565b6105128383610848565b505050565b61052133826108b6565b61053d5760405162461bcd60e51b815260040161047190611498565b610512838383610934565b61051283838360405180602001604052806000815250610667565b6000818152600260205260408120546001600160a01b03168061033e5760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610471565b60006001600160a01b03821661062d5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b6064820152608401610471565b506001600160a01b031660009081526003602052604090205490565b6060600180546103539061145e565b610663338383610aa5565b5050565b61067133836108b6565b61068d5760405162461bcd60e51b815260040161047190611498565b61069984848484610b73565b50505050565b60606106aa826107e6565b600082815260066020526040812080546106c39061145e565b80601f01602080910402602001604051908101604052809291908181526020018280546106ef9061145e565b801561073c5780601f106107115761010080835404028352916020019161073c565b820191906000526020600020905b81548152906001019060200180831161071f57829003601f168201915b50505050509050600061075a60408051602081019091526000815290565b9050805160000361076c575092915050565b81511561079e5780826040516020016107869291906114e5565b60405160208183030381529060405292505050919050565b6107a784610ba6565b949350505050565b6000806107bb60075490565b90506107c78482610c19565b6107d18184610db2565b6107df600780546001019055565b9392505050565b6000818152600260205260409020546001600160a01b03166108455760405162461bcd60e51b8152602060048201526018602482015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b6044820152606401610471565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061087d82610563565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806108c283610563565b9050806001600160a01b0316846001600160a01b0316148061090957506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806107a75750836001600160a01b0316610922846103d6565b6001600160a01b031614949350505050565b826001600160a01b031661094782610563565b6001600160a01b03161461096d5760405162461bcd60e51b815260040161047190611514565b6001600160a01b0382166109cf5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610471565b6109dc8383836001610e45565b826001600160a01b03166109ef82610563565b6001600160a01b031614610a155760405162461bcd60e51b815260040161047190611514565b600081815260046020908152604080832080546001600160a01b03199081169091556001600160a01b0387811680865260038552838620805460001901905590871680865283862080546001019055868652600290945282852080549092168417909155905184937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610b065760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610471565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610b7e848484610934565b610b8a84848484610ecd565b6106995760405162461bcd60e51b815260040161047190611559565b6060610bb1826107e6565b6000610bc860408051602081019091526000815290565b90506000815111610be857604051806020016040528060008152506107df565b80610bf284610fce565b604051602001610c039291906114e5565b6040516020818303038152906040529392505050565b6001600160a01b038216610c6f5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610471565b6000818152600260205260409020546001600160a01b031615610cd45760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610471565b610ce2600083836001610e45565b6000818152600260205260409020546001600160a01b031615610d475760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610471565b6001600160a01b038216600081815260036020908152604080832080546001019055848352600290915280822080546001600160a01b0319168417905551839291907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000828152600260205260409020546001600160a01b0316610e2d5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b6064820152608401610471565b600082815260066020526040902061051282826115f9565b6001811115610699576001600160a01b03841615610e8b576001600160a01b03841660009081526003602052604081208054839290610e859084906116cf565b90915550505b6001600160a01b03831615610699576001600160a01b03831660009081526003602052604081208054839290610ec29084906116e2565b909155505050505050565b60006001600160a01b0384163b15610fc357604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610f119033908990889088906004016116f5565b6020604051808303816000875af1925050508015610f4c575060408051601f3d908101601f19168201909252610f4991810190611732565b60015b610fa9573d808015610f7a576040519150601f19603f3d011682016040523d82523d6000602084013e610f7f565b606091505b508051600003610fa15760405162461bcd60e51b815260040161047190611559565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506107a7565b506001949350505050565b60606000610fdb83611061565b600101905060008167ffffffffffffffff811115610ffb57610ffb6112c1565b6040519080825280601f01601f191660200182016040528015611025576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a850494508461102f57509392505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106110a05772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef810000000083106110cc576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106110ea57662386f26fc10000830492506010015b6305f5e1008310611102576305f5e100830492506008015b612710831061111657612710830492506004015b60648310611128576064830492506002015b600a831061033e5760010192915050565b6001600160e01b03198116811461084557600080fd5b60006020828403121561116157600080fd5b81356107df81611139565b60005b8381101561118757818101518382015260200161116f565b50506000910152565b600081518084526111a881602086016020860161116c565b601f01601f19169290920160200192915050565b6020815260006107df6020830184611190565b6000602082840312156111e157600080fd5b5035919050565b80356001600160a01b03811681146111ff57600080fd5b919050565b6000806040838503121561121757600080fd5b611220836111e8565b946020939093013593505050565b60008060006060848603121561124357600080fd5b61124c846111e8565b925061125a602085016111e8565b9150604084013590509250925092565b60006020828403121561127c57600080fd5b6107df826111e8565b6000806040838503121561129857600080fd5b6112a1836111e8565b9150602083013580151581146112b657600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156112f2576112f26112c1565b604051601f8501601f19908116603f0116810190828211818310171561131a5761131a6112c1565b8160405280935085815286868601111561133357600080fd5b858560208301376000602087830101525050509392505050565b6000806000806080858703121561136357600080fd5b61136c856111e8565b935061137a602086016111e8565b925060408501359150606085013567ffffffffffffffff81111561139d57600080fd5b8501601f810187136113ae57600080fd5b6113bd878235602084016112d7565b91505092959194509250565b600080604083850312156113dc57600080fd5b6113e5836111e8565b9150602083013567ffffffffffffffff81111561140157600080fd5b8301601f8101851361141257600080fd5b611421858235602084016112d7565b9150509250929050565b6000806040838503121561143e57600080fd5b611447836111e8565b9150611455602084016111e8565b90509250929050565b600181811c9082168061147257607f821691505b60208210810361149257634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602d908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526c1c881bdc88185c1c1c9bdd9959609a1b606082015260800190565b600083516114f781846020880161116c565b83519083019061150b81836020880161116c565b01949350505050565b60208082526025908201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060408201526437bbb732b960d91b606082015260800190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b601f82111561051257600081815260208120601f850160051c810160208610156115d25750805b601f850160051c820191505b818110156115f1578281556001016115de565b505050505050565b815167ffffffffffffffff811115611613576116136112c1565b61162781611621845461145e565b846115ab565b602080601f83116001811461165c57600084156116445750858301515b600019600386901b1c1916600185901b1785556115f1565b600085815260208120601f198616915b8281101561168b5788860151825594840194600190910190840161166c565b50858210156116a95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b8181038181111561033e5761033e6116b9565b8082018082111561033e5761033e6116b9565b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061172890830184611190565b9695505050505050565b60006020828403121561174457600080fd5b81516107df8161113956fea2646970667358221220304604389c8f0bce41b1f55f1cab80b3bab9e62fd1b20ee860a8b484413bec5264736f6c63430008110033";

type TestNFTConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TestNFTConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TestNFT__factory extends ContractFactory {
  constructor(...args: TestNFTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TestNFT> {
    return super.deploy(name, symbol, overrides || {}) as Promise<TestNFT>;
  }
  override getDeployTransaction(
    name: PromiseOrValue<string>,
    symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  override attach(address: string): TestNFT {
    return super.attach(address) as TestNFT;
  }
  override connect(signer: Signer): TestNFT__factory {
    return super.connect(signer) as TestNFT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestNFTInterface {
    return new utils.Interface(_abi) as TestNFTInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestNFT {
    return new Contract(address, _abi, signerOrProvider) as TestNFT;
  }
}