import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservableRetry().pipe(
      retry(2)
    ).subscribe(numero => {
      console.log('subs', numero);
    }, error => {
      console.error('error', error);
    }, () => console.log('Termino el observable'));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  regresaObservableRetry(): Observable<number> {
    return new Observable( observer => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador++;
        observer.next(contador);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (contador === 2) {
          observer.error('Auxilio!!');
        }
      }, 1000);
    });
  }
/*
  regresaObservableMap(): Observable<number> {
    return new Observable( observer => {
      let contador = 1;
      const intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if (valor)
      }
      )
    );
  }*/
}
