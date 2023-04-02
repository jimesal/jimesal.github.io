import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import { sessionService } from '../session.service';


@Component({
  selector: 'app-valorar',
  templateUrl: './valorar.component.html',
  styleUrls: ['./valorar.component.css'],
})

export class ValorarComponent implements OnInit {

  valForm: any;

  entidadContract: any ;
  marca: any ;

  promedioVal: any ;
  notaSeleccionada: any;
  
  mining:boolean = false ;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.valForm = new FormGroup({
      titulo: new FormControl(),
      val: new FormControl(),
      comentario: new FormControl()
    });

  }

  async ngOnInit(){
    this.marca = sessionService.entidad.marca ;
    await this.getPromedioVal() ;
  }

  async getPromedioVal() {
    await sessionService.entidad.contract.methods.getPromedioVal().call({
      from: sessionService.wallet.address
    }).then(
      (receipt:any) => {
        this.promedioVal = receipt._sumaVal == 0 ? 0: receipt._sumaVal / receipt._totalRes ; 
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async sendValoracion(formData: any){
    this.mining = true;

    var rawData = {
      from: sessionService.wallet.address,
      to: sessionService.entidad.contractAddress,
      gasPrice: sessionService.web3.utils.toHex(10000000000),
      gasLimit: sessionService.web3.utils.toHex(6000000),
      nonce: await sessionService.web3.eth.getTransactionCount(sessionService.wallet.address),
      data: sessionService.entidad.contract.methods.valorar(this.notaSeleccionada, formData.titulo, formData.comentario).encodeABI()
    };

    await sessionService.web3.eth.sendTransaction(rawData).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.mining = false;
        this.router.navigate(['/hiuser']) ;
      },
      (error:any) => {
        this.mining = false;
        alert("La operación no ha sido completada.\n" + error);
        this.router.navigate(['/hiuser']) ;
        console.error(error)
    })
  }

  changeSelection(event: any, index: any) {
    this.notaSeleccionada = event.target.checked ? index : undefined;
  }
}
