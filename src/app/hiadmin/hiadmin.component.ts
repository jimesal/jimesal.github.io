import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { sessionService } from '../session.service';
import { sharedService } from '../shared.service';

@Component({
  selector: 'app-hiadmin',
  templateUrl: './hiadmin.component.html',
  styleUrls: ['./hiadmin.component.css']
})
export class HiadminComponent {

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
    this.recargaForm = new FormGroup({
      recarga: new FormControl(),
    });
  }

  async ngOnInit(){
    await this.getSaldoSistema() ;
    await this.getMetricasSistema() ;
    console.log(this.saldo) ;

  }

  async getSaldoSistema() {
    sessionService.core.contract.methods.getContractBalance().call({
      from: sessionService.wallet.address,
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
    sessionService.core.contract.methods.getMetricasSistema().call({
      from: sessionService.wallet.address
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

  async recargarSaldoGlobal(formData: any) {
    if (!formData.recarga) return alert("Introduzca un valor para la recarga");

    alert("Va a recargar el saldo del sistema con " + formData.recarga + " wei.");

    this.mining = true ;

    var rawData = {
      from: sessionService.wallet.address,
      to: sessionService.core.contractAddress,
      value: formData.recarga,
      gasPrice: sessionService.web3.utils.toHex(10000000000),
      gasLimit: sessionService.web3.utils.toHex(6000000),
      nonce: await sessionService.web3.eth.getTransactionCount(sessionService.wallet.address),
      data: sessionService.core.contract.methods.cargarSaldoGlobal().encodeABI()
    };

    await sharedService.sendTransaction(rawData).then(
      (receipt:any) => {
        this.getSaldoSistema() ;
        console.log(receipt) ;
      },
      (error:any) => {
        alert("Algo ha salido mal. La operación no ha sido completada.");
        console.error(error)
    }) 
  }
}
