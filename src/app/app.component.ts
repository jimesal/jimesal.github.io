import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reseg_v2';

  constructor(private router: Router){}

  logout(){
    window.localStorage.removeItem("seeds");
    sessionService.encrypted = null;

    sessionService.wallet = null ;

    sessionService.sesion = null ;
    sessionService.metamask = false ;
    this.router.navigate(['/login']) ;
  }
}
