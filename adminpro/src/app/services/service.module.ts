import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SharedService, SidebarService, UsuarioService, SubirArchivoService,
         HospitalesService, MedicosService} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import { LoginGuard, AdminGuard, VerificaTokenGuard } from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService, SharedService, SidebarService,
              UsuarioService, SubirArchivoService,
              ModalUploadService, HospitalesService,
              MedicosService,
              LoginGuard,
              AdminGuard,
              VerificaTokenGuard],
})
export class ServiceModule { }
