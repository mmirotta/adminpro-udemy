import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  changeColor(tema: string, link: any) {
    this.ajustes.aplicarTema(tema);
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.ajustes.ajustes.tema;
    for (const ref of selectores) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
