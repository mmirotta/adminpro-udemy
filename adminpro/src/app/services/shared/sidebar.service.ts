import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Dashboard',
          icon: '',
          url: '/dashboard'
        },
        {
          title: 'ProgressBar',
          icon: '',
          url: '/progress'
        },
        {
          title: 'Graficos',
          icon: '',
          url: '/graficos1'
        }

      ]
    }
  ];

  constructor() { }
}
