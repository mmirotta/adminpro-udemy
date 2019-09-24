import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Input() percent: number = 50;
  @Input() legend: string = 'Leyenda';

  @Output() changeValueEmitter: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtPercent', { read: null, static: false}) txtPercent: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: number) {

    if (newValue >= 100) {
      this.percent = 100;
    } else if (newValue <= 0) {
      this.percent = 0;
    } else {
      this.percent = newValue;
    }

    this.txtPercent.nativeElement.value = this.percent;

    this.changeValueEmitter.emit(this.percent);
  }

  changeValue(value: number) {
    if (this.percent >= 100 && value > 0) {
      this.percent = 100;
      return;
    }

    if (this.percent <= 0 && value < 0) {
      this.percent = 0;
      return;
    }

    this.percent = this.percent + value;
    this.changeValueEmitter.emit(this.percent);
    this.txtPercent.nativeElement.focus();
  }

}
