import { Injectable } from '@angular/core';
import moment from 'moment';
import Common from 'ethereumjs-common';
import { Transaction } from 'ethereumjs-tx';
import { sessionService } from './session.service';


@Injectable({
  providedIn: 'root'
})
class SharedService {

  chain: any ;

  constructor() { 
    this.chain = Common.forCustomChain(
      'mainnet',
      {
          chainId: 11155111, //Sepolia
      },
      'istanbul',
    );
  }

  sendTransaction(rawData: any){
    if(sessionService.metamask){
      return sessionService.web3.eth.sendTransaction(rawData) ;
    }else{
      var transaction = new Transaction(rawData, { common: this.chain });
      transaction.sign(sessionService.wallet.privateKey);
      const serialized = "0x" + transaction.serialize().toString("hex");
      return sessionService.web3.eth.sendSignedTransaction(serialized) ;
    }
  }

  dateToEthTimestamp(fechaOrig: any){
    const date = new Date(fechaOrig) ;
    return date.getTime() / 1000 ;
  }

  dateToJSTimestamp(fechaOrig: any){
    const date = new Date(fechaOrig * 1000) ;
    return moment(date).format('D-MM-YYYY') ;
  }
}

export const sharedService = new SharedService() ;

