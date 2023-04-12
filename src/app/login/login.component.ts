import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

import * as Mnemonic from "bitcore-mnemonic";
import { sessionService } from '../session.service';

import detectEthereumProvider from '@metamask/detect-provider';
import { sharedService } from '../shared.service';
import Web3 from 'web3';


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

  window: any;

  mining: boolean = false ;

  constructor(@Inject(DOCUMENT) private document:Document, private router: Router) {
    sessionService.encrypted = window.localStorage.getItem("seeds");
    this.loginForm = new FormGroup({
      seeds: new FormControl(),
      password: new FormControl()
    });
    this.window = this.document.defaultView;

  }

  async ngOnInit() {
    // PALABRAS: edge maximum weapon pluck quality wheel approve creek evolve mixed fiction album
    // PASSWORD: test@METAMASK22
    
    await sessionService.initWallet('project fix century now fringe hawk service juice uncover gorilla van glide');
    sessionService.metamask = true ;
    sessionService.web3.setProvider(
      new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545')
    );
    if(sessionService.wallet){
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
    }).then(async () => {
      sessionService.metamask = true ;
      sessionService.web3.setProvider(await detectEthereumProvider()) ; ;
      this.router.navigate(['/register'])
    }) ;

  }


  async sendLogin(loginData:any) {
    if (!Mnemonic.isValid(loginData.seeds)) {
      return alert("Las semillas no son validas");
    }

    await sessionService.initWallet(loginData.seeds).then(
      () => this.router.navigate(['/register']) 
    );
  }
}



