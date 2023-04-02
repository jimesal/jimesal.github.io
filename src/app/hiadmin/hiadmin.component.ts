import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { sessionService } from '../session.service';

@Component({
  selector: 'app-hiadmin',
  templateUrl: './hiadmin.component.html',
  styleUrls: ['./hiadmin.component.css']
})
export class HiadminComponent {

  web3:any;
  wallet:any;
  contract: any;
  walletService: any ;

  recargaForm:any

  datosUsr: any = {
    usrName: null ,
    nombreCompleto: null ,
    fechaNac: null 
  }

  metricas: any = {
    totalUsuarios: null ,
    totalEntidades: null ,
    totalResenias: null
  }
  saldo: any ;
    
  mining:boolean = false;
  seleccionada:boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.walletService = sessionService ;

    this.recargaForm = new FormGroup({
      recarga: new FormControl(),
    });
  }

  async ngOnInit(){
    this.web3 = await this.walletService.getWeb3() ;
    this.wallet = await this.walletService.getWallet() ;
    this.contract = await this.walletService.getCoreContract() ;

    await this.getSaldoSistema() ;
    await this.getMetricasSistema() ;
    console.log(this.saldo) ;

  }

  async getSaldoSistema() {
    this.contract.methods.getContractBalance().call({
      from: this.wallet.address,
    }).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.saldo = receipt ;  
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async getMetricasSistema() {
    this.contract.methods.getMetricasSistema().call({
      from: this.wallet.address
    }).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.metricas.totalUsuarios = receipt.totalUsuarios ; 
        this.metricas.totalEntidades = receipt.totalEntidades ; 
        this.metricas.totalResenias = receipt._totalRes ; 
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async cargarSaldoGlobal(formData: any) {
    alert("Va a recargar el saldo del sistema con " + formData.recarga + " wei.");

    this.mining = true ;
    this.web3.eth.sendTransaction({
      from: this.wallet.address,
      to: this.walletService.core.contractAddress,
      value: formData.recarga,
      gasPrice: this.web3.utils.toHex(10000000000),
      gasLimit: this.web3.utils.toHex(6000000),
      nonce: await this.web3.eth.getTransactionCount(this.wallet.address),
      data: this.contract.methods.cargarSaldoGlobal().encodeABI()
    }).then(
      (receipt:any) => {
        console.log(receipt) ;
      },
      (error:any) => {
        alert("Algo ha salido mal. La operación no ha sido completada.");
        console.error(error)
    }) 
  }
}
