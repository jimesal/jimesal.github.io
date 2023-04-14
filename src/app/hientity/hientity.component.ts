import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { sharedService } from '../shared.service';
import { sessionService } from '../session.service';
import { Transaction } from 'ethereumjs-tx';



@Component({
  selector: 'app-hientity',
  templateUrl: './hientity.component.html',
  styleUrls: ['./hientity.component.css']
})
export class HientityComponent {

  recargaForm:any ;
  wallet: any ;
  sharedSer: any ;

  marca: any  ;
  metricas: any = {
    totalRes: null ,
    promedioVal: null ,
    totalUltRes: null 
  } 
  balance: any ;
  entidad: any = {
    contract: null,
    contractAddress: null 
  }
  resenias: any ;
  
  mining:boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.recargaForm = new FormGroup({
      recarga: new FormControl(),
    });
  }

  async ngOnInit(){
    this.wallet = sessionService.wallet ;
    this.sharedSer = sharedService ;
    this.marca = sessionService.entidad.marca ;

    await this.getMetricas() ;
    await this.getBalance() ;
    await this.getResenias() ;
  }

  

  async getMetricas() {
    await sessionService.entidad.contract.methods.getMetricas().call({
      from: this.wallet.address
    }).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.metricas.totalRes = receipt._totalRes ; 
        this.metricas.promedioVal = receipt._sumaVal == 0 ? 0: receipt._sumaVal / receipt._totalRes ; 
        this.metricas.totalUltRes = receipt._totalUltRes ; 
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async getResenias() {
    await sessionService.entidad.contract.methods.getResenias().call({
      from: this.wallet.address
    }).then(
      (receipt:any) => {
        this.resenias = receipt ;
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async getBalance() {
    await sessionService.entidad.contract.methods.getContractBalance().call({
      from: this.wallet.address
    }).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.balance = receipt ;
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async recargarSaldo(formData: any){

    if (!formData.recarga) return alert("Introduzca un valor para la recarga");

    alert("Va a recargar el saldo de la entidad con " + formData.recarga + " wei.");
    this.mining = true;

    var rawData = {
      from: sessionService.wallet.address,
      to: sessionService.entidad.contractAddress,
      value: formData.recarga,
      gasPrice: sessionService.web3.utils.toHex(10000000000),
      gasLimit: sessionService.web3.utils.toHex(6000000),
      nonce: await sessionService.web3.eth.getTransactionCount(sessionService.wallet.address),
      data: sessionService.entidad.contract.methods.recargarSaldo().encodeABI()
    };

    await sharedService.sendTransaction(rawData).then(
      (receipt:any) => {
        console.log(receipt) ;
        alert("Recarga realizada correctamente.");
        this.getBalance() ;
        this.mining = false;
      },
      (error:any) => {
        this.mining = false;
        alert(error);
        console.error(error)
    })
  }
  

    
}
