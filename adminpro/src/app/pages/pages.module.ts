import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgessComponent } from './progess/progess.component';
import { Graficos1Component } from './graficos1/graficos1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgessComponent,
        Graficos1Component,
        IncrementadorComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgessComponent,
        Graficos1Component,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule { }
