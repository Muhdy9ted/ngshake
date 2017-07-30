import { Component } from '@angular/core';
import { ShakeStyle } from './interface/shake'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'NgX';

  shakeStyle: ShakeStyle = {
    horizontal: 15,
    vertical: 5,
    rotation: 5,
    duration: 300,
    quantity: 'infinite',
    timingFunc: 'ease-in-out',
    interval: 10,
    max: 100,
    transformOrigin: 'center center',
    fixed: true,
    fixedStop: false,
    freez: false,
    active:  true,
    trigger: ':hover',
    elem: 'div',
  };

}
