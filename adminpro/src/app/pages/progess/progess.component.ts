import { Component, OnInit } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-progess',
  templateUrl: './progess.component.html',
  styles: []
})
export class ProgessComponent implements OnInit {

  percentBlue: number = 20;
  percentGreen: number = 50;

  constructor() { }

  ngOnInit() {
  }

}
