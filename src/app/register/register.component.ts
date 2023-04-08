import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { sessionService } from '../session.service';
import { sharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usrTypeOpt: any = ['Usuario', 'Entidad'];
  usrType: any;

  isUser:boolean = false ;
  mining:boolean = false;

  registerFormUsr: any;
  registerFormEnt: any;

  constructor(private router: Router) {
    this.registerFormUsr = new FormGroup({
      usrName: new FormControl(),
      nombreCompleto: new FormControl(),
      fechaNac: new FormControl(),
    });

    this.registerFormEnt = new FormGroup({
      nombreComercial: new FormControl(),
      saldoIni: new FormControl(),
    });
  }

  async ngOnInit() {   
    //Si ya hay sesión iniciada
    const tipoUsr = sessionService.sesion ;
    if(tipoUsr != null) this.navigateTo(tipoUsr) ;
    else await this.esUsuario() ; 
  }

  async esUsuario() {
    this.mining = true ;
    console.log(sessionService.wallet.address) ;
    await sessionService.core.contract.methods.isRegistered().call({
      from: sessionService.wallet.address
    }).then(
      (receipt:any) => {
        console.log(receipt)
        this.isUser = receipt.registered;
        this.mining = false;
        if(this.isUser){
          this.navigateTo(receipt.tipo)
        } 
      },
      (error:any) => {
        this.mining = false;
        console.error(error)
    }) 
  }

  async registrarUsuario(registerData:any) {
  
    if (!registerData.usrName) return alert("Introduce un nombre de usuario");
    if (!registerData.nombreCompleto) return alert("Introduce tu nombre completo");

    this.mining = true;

    var rawData = {
      from: sessionService.wallet.address,
      to: sessionService.core.contractAddress,
      gasPrice: sessionService.web3.utils.toHex(20000000000),
      gasLimit: sessionService.web3.utils.toHex(6000000),
      nonce: await sessionService.web3.eth.getTransactionCount(sessionService.wallet.address),
      data: sessionService.core.contract.methods.addNuevoUsuario(registerData.usrName,registerData.nombreCompleto, sharedService.dateToEthTimestamp(registerData.fechaNac)).encodeABI()
    };

    sharedService.sendTransaction(rawData).then(
      (receipt:any) => {
        this.mining = false;
        sessionService.sesion = "usuario" ;
        this.router.navigate(['/hiuser']) ;
      },
      (error:any) => {
        this.mining = false;
        alert("Algo ha salido mal. La operación no ha sido completada.");
        console.error(error)
    })
  }

  async registrarEntidad(registerData:any) {
    
    if (!registerData.nombreComercial) return alert("Introduce el nombre comercial de la entidad");
    if (!registerData.saldoIni) return alert("Es obligatorio aportar un saldo inicial");

    this.mining = true ;

    var rawData = {
      from: sessionService.wallet.address,
      to: sessionService.core.contractAddress,
      value: registerData.saldoIni,
      gasPrice: sessionService.web3.utils.toHex(20000000000),
      gasLimit: sessionService.web3.utils.toHex(6000000),
      nonce: await sessionService.web3.eth.getTransactionCount(sessionService.wallet.address),
      data: sessionService.core.contract.methods.addNuevaEntidad(registerData.nombreComercial).encodeABI()
    };

    await sharedService.sendTransaction(rawData).then(
      (receipt:any) => {
        console.log(receipt) ;
        this.mining = false;
        sessionService.sesion = "entidad" ;
        this.router.navigate(['/hientity']) ;
      },
      (error:any) => {
        this.mining = false;
        alert("Algo ha salido mal. La operación no ha sido completada.");
        console.error(error)
    }) 
    
  }

  navigateTo(tipoUsuario: any){
    switch(tipoUsuario){
      case 'usuario': {
        this.router.navigate(['/hiuser']) ; 
        break ;
      }
      case 'entidad': {
        this.router.navigate(['/hientity']) ;
        break ;
      }
      case 'admin': {
        this.router.navigate(['/hiadmin']) ;
        break ;
      }
      default : console.log("Tipo de cliente no reconocido")
    }
  }

  usrTypeChanged(value: any) {
    this.usrType = value ;
  }

}
