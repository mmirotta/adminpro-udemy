import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgessComponent } from './pages/progess/progess.component';
import { Graficos1Component } from './pages/graficos1/graficos1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
