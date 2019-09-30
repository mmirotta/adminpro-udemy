import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicosService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public cargando: boolean = false;
  medicos: Medico[] = [];

  constructor(public medicoService: MedicosService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();

    this.modalUploadService.notificacion.subscribe(resp => {
      this.cargarMedicos();
    });
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this.medicoService.buscarMedico(termino).subscribe(resp => {
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el medico ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this.medicoService.borrarMedico(medico._id).subscribe(resp => {
          this.cargarMedicos();
        });
      }
    });
  }

  mostrarModal(hospital: Medico) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
