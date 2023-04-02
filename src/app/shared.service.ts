import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
class SharedService {

  constructor() { 

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

