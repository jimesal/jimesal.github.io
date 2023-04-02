import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HiuserComponent } from './hiuser/hiuser.component';
import { RegisterComponent } from './register/register.component';
import { HientityComponent } from './hientity/hientity.component';
import { HiadminComponent } from './hiadmin/hiadmin.component';
import { ValorarComponent } from './valorar/valorar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HiuserComponent,
    RegisterComponent,
    HientityComponent,
    HiadminComponent,
    ValorarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'hiuser', component: HiuserComponent},
      {path: 'hientity', component: HientityComponent},
      {path: 'hiadmin', component: HiadminComponent},
      {path: 'valorar', component: ValorarComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
