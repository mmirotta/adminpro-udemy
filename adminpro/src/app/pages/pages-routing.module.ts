import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Graficos1Component } from './graficos1/graficos1.component';
import { PagesComponent } from './pages.component';


const pagesRoutes: Routes = [
  { 
    path: '', 
    component: PagesComponent, 
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'progress', component: ProgessComponent},
      {path: 'graficas1', component: Graficos1Component},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PageRouterModule { }