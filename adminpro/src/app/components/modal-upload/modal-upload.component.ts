import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  oculto: string = '';

  imagenSubir: File;
  imagenTemp: any;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  seleccionImage(file: File) {
    if (!file) {
      this.imagenSubir = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = file;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }
}
