import {
  Component, Input, OnInit,
  state, trigger, keyframes, animate, transition, style, NgZone,
  ViewChild, ElementRef, Renderer, AfterContentInit
} from '@angular/core';

import {
  DomSanitizer,
  SafeHtml,
  SafeUrl,
  SafeStyle
} from '@angular/platform-browser';

@Component({
  moduleId: module.id.toString(),
  selector: 'Shake',
  template: `
  <div #myDIV [ngClass]="'shaking'">
  Shaking Component
  <br>
  </div> 
  <br><br>
  `,
})
export class ShakeComponent implements OnInit, AfterContentInit {
  @Input() horizontal: number = 5;
  @Input() vertical: number = 5;
  @Input() rotation: number = 5;
  @Input() duration: number = 300;
  @Input() quantity: any = 'infinite';
  @Input() timingFunc: string = 'ease-in-out';
  @Input() interval: number = 10;
  @Input() max: number = 100;
  @Input() transformOrigin: string = 'center center';
  @Input() fixed: boolean = true;
  @Input() fixedStop: boolean = false;
  @Input() freez: boolean = false;
  @Input() active: boolean = true;
  @Input() trigger: string = ':hover';
  @Input() elem: string = 'div';

  @ViewChild('myDIV') myDIV:ElementRef;

  private shouldShakeDefault = this.fixed || (!this.fixed && this.freez);
  private shouldShakeWhenTriggered = !this.fixed && !this.freez;
  private shakeKeyframeName = 'shakeKF';
  private keyframes = this.doKeyframes();

  private shakeKeyframes = `
  @keyframes ${this.shakeKeyframeName} {
    ${this.keyframes}
  }
  `;

  private ShakeClass = `
    .shaking {
      animation-name: ${this.shouldShakeDefault && this.shakeKeyframeName};
      animation-duration: ${this.duration}ms;
      animation-iteration-count: ${this.quantity};
      display: inline-block;
      transform-origin: ${this.transformOrigin};
      animation-play-state: ${this.freez && (!this.fixed ? 'paused' : 'running')};
    }
    
    .shaking${this.trigger} {
        animation-name: ${this.shouldShakeWhenTriggered && this.shakeKeyframeName};
        animation-play-state: ${this.freez && (!this.fixed ? 'running' : 'paused')};
        animation: ${this.fixed && this.fixedStop && 'initial'};
    }
    `;

  constructor (private sanitizer: DomSanitizer, private renderer: Renderer) {
  // called first time before the ngOnInit()
  }

  setStyles(element, styles) {
    for (let i in styles) {
      this.renderer.setElementStyle(element.nativeElement, i, styles[i]);
    }
  }

  ngAfterContentInit () {
    //
  }

  ngOnInit () {
    // initialize model here
    this.initStyle();
  }

  random (max: number, min: number = 0): number {
    return (Math.random() * (max - min) - max / 2);
  }

  doKeyframes () {
    let kf = {};
    const init = 'translate(0,0) rotate(0)';
  
    for (let st = this.interval; st <= this.max; st += this.interval) {
      const x = this.random(this.horizontal);
      const y = this.random(this.vertical);
      const rot = this.random(this.rotation);
    
      kf[`${st}%`] = {
        transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
      }
    }
  
    kf[`0%`] = kf[`100%`] =  {
      transform: init,
    }
  	
    // Init if max < 100
    if (this.max < 100) {
      kf[`${this.max}%`] = {
        transform: init,
      }
    }
    
    // return kf;
    return Object.keys(kf).reduce((acc, next) => {
      return `${acc}
			${next} {
				transform: ${kf[next].transform}
			}`
    }, '');
  }

  initStyle () {
    let styleElement = this.renderer.createElement(this.myDIV.nativeElement, 'style')
    this.renderer.setElementAttribute(styleElement, 'type', 'text/css')
    this.renderer.setElementProperty(styleElement, 'innerHTML', this.shakeKeyframes + this.ShakeClass)

    let newElement = this.renderer.createElement(this.myDIV.nativeElement, this.elem)
    // this.renderer.setElementClass(newElement, 'shaking', true)
    this.renderer.createText(newElement, 'let it shake')
  }
  
}
