import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = false;

  constructor(public hospitalService: HospitalesService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(hospitales => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this.hospitalService.buscarHospital(termino).subscribe(resp => {
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital)
        .subscribe();
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'Input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        this.hospitalService.crearHospital(valor).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    });
  }

  mostrarModal(hospital: Hospital) {
    this.modalUploadService.mostrarModal('hospitales', hospital._id);
  }
}
