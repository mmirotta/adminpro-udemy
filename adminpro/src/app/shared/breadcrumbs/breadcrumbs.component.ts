import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor( private router: Router, private titlePage: Title, private meta: Meta) {


    this.getDataRoute().subscribe( data => {
      console.log(data);
      this.title = data.title;
      this.titlePage.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.title
      };

      this.meta.updateTag(metaTag);
    });

  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
