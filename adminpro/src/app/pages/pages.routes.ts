import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficos1Component } from './graficos1/graficos1.component';
import { ProgessComponent } from './progess/progess.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

import { AdminGuard, VerificaTokenGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' }, canActivate: [VerificaTokenGuard] },
    { path: 'progress', component: ProgessComponent, data: { title: 'Progress' }  },
    { path: 'graficos1', component: Graficos1Component, data: { title: 'Graficos' }  },
    { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas' }  },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'Observables' }  },
    { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema' }  },
    { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de usuario' }  },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { title: 'Búsqueda' }  },
    // Mantenimiento
    { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimiento de usuarios' }, canActivate: [AdminGuard]  },
    { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de hospitales' }  },
    { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de medicos' }  },
    { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar medico' }  },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
