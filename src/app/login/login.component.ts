import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import * as Mnemonic from "bitcore-mnemonic";
import { sessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

// edge maximum weapon pluck quality wheel approve creek evolve mixed fiction album
// test@METAMASK22
  
  loginForm: any;
  registerForm: any;

  wallet:any = {
    address: ""
  };

  encrypted:string|null = '';
  window: any;

  mining: boolean = false ;

  constructor(@Inject(DOCUMENT) private document:Document, private router: Router) {
    this.encrypted = window.localStorage.getItem("seeds");
    this.loginForm = new FormGroup({
      seeds: new FormControl(),
      password: new FormControl()
    });
    this.window = this.document.defaultView;

  }

  async ngOnInit() {
    // PALABRAS: edge maximum weapon pluck quality wheel approve creek evolve mixed fiction album
    // PASSWORD: test@METAMASK22
    
    this.wallet = await sessionService.initWallet('project fix century now fringe hawk service juice uncover gorilla van glide');
    if(this.wallet.address){
      this.router.navigate(['/register']) ;
    }
  }

  async loginWithMetamask() {
    await this.window.ethereum.enable().then(async (accounts:any) => {
      var address = accounts[0]
      sessionService.wallet = {
        address,
        balance: await sessionService.web3.eth.getBalance(address).then((result:any) => {
          return sessionService.web3.utils.fromWei(result, 'ether');
        })
      }
    });
    this.router.navigate(['/register']) ;
  }


  async sendLogin(loginData:any) {
    if (!Mnemonic.isValid(loginData.seeds)) {
      return alert("Las semillas no son validas");
    }

    this.wallet = await sessionService.initWallet(loginData.seeds).then(
      () => this.router.navigate(['/register']) 
    );
  }

  removeSeeds() {
    window.localStorage.removeItem("seeds");
    this.encrypted = null;

    this.wallet = {
      address: ""
    };
  }
}



