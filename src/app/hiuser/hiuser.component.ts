import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { sessionService } from '../session.service';
import { sharedService } from '../shared.service';

@Component({
  selector: 'app-hiuser',
  templateUrl: './hiuser.component.html',
  styleUrls: ['./hiuser.component.css'],
})

export class HiuserComponent implements OnInit {

  wallet:any;

  datosUsr: any = {
    usrName: null ,
    nombreCompleto: null ,
    fechaNac: null 
  }

  entidades: any  ; 
    
  mining:boolean = false;
  seleccionada:boolean = false;

  constructor(private router: Router) {
  }

  async ngOnInit(){
    this.wallet = await sessionService.wallet ;

    await this.getDatosUser() ;
    await this.getEntidades() ;
  }

  async getDatosUser() {
    await sessionService.core.contract.methods.getDatosUsuario().call({
      from: this.wallet.address
    }).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.datosUsr.usrName = receipt.usrName ; 
        this.datosUsr.nombreCompleto = receipt.nameCompleto ; 
        this.datosUsr.fechaNac = sharedService.dateToJSTimestamp(receipt.fechaNac) ; 
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async getEntidades() {
    await sessionService.core.contract.methods.getEntidades().call({
      from: this.wallet.address
    }).then(
      (receipt:any) => {
        this.entidades = receipt ;
        console.log(this.entidades) ;
      },
      (error:any) => {
        console.error(error)
    }) 
  }

  async seleccionEntidad(nombre: string) {
    this.seleccionada = true ;

    await sessionService.core.contract.methods.getContratoEnt(nombre).call({
      from: this.wallet.address
    }).then(
      async (receipt:any) => {
        console.log(receipt) ;
        sessionService.setEntidad(receipt, nombre)
        this.router.navigate(['/valorar']) ;
      },
      (error:any) => {
        console.error(error)
    }) 
  }
  


}
