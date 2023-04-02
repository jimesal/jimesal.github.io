import { Injectable } from '@angular/core';

import * as Mnemonic from "bitcore-mnemonic";
import * as util from "ethereumjs-util";
import { hdkey } from "ethereumjs-wallet";
import * as bip39 from "bip39";
import Web3 from 'web3';

const CoreContract = require('./../../build/contracts/Core.json') ;
const EntidadContract = require('./../../build/contracts/Entidad.json') ;

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  web3:any;
  wallet:any;

  sesion: any ;
  core : any = {
    contract: null ,
    contractAddress : '0xa07487C67059BDA9910AB7394dEeA308288AFc5F',
  }
  entidad : any  = {
    contract : null ,
    contractAddress: null ,
    marca: null 
  }

  constructor() {
    this.init() ;
  }

  async init() {
    this.web3 = await this.initWeb3() ;
    this.core.contract = new this.web3.eth.Contract(CoreContract.abi, this.core.contractAddress);
    return this ;
  }

  async initWeb3() {
    this.web3 = new Web3;

    this.web3.setProvider(
      //new this.web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/f2ac4d7638cd4cb189dfed009aaa4c87')
      new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
    );

    return this.web3;
  }

  async initWallet(seeds:string) {
    var mnemonic = new Mnemonic(seeds);
    var seed = await bip39.mnemonicToSeed(mnemonic.toString());
    var path = "m/44'/60'/0'/0/8";

    var wallet = hdkey
      .fromMasterSeed(seed)
      .derivePath(path)
      .getWallet();

    var privateKey = wallet.getPrivateKey();
    var publicKey = util.privateToPublic(privateKey);
    var address = "0x" + util.pubToAddress(publicKey).toString("hex");

    return this.wallet = {
      address: address,
      publicKey: publicKey,
      privateKey: privateKey,
      balance: await this.web3.eth.getBalance(address).then((result:any) => {
        return this.web3.utils.fromWei(result, 'ether');
      })
    };
  }

  setEntidad(entidadContractAddress:any, marca: any) {
    this.entidad.contractAddress = entidadContractAddress
    this.entidad.marca = marca ;
    this.entidad.contract = new this.web3.eth.Contract(EntidadContract.abi, this.entidad.contractAddress) ;

  }
}

export const sessionService = new SessionService() ;

