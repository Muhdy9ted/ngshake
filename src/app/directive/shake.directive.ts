import { Directive, ElementRef, HostListener, Input, OnInit, Renderer } from '@angular/core';
import { ShakeStyle } from '../interface/shake'

@Directive({
  selector: '[shake]'
})
export class ShakeDirective implements OnInit {

  @Input('shake') shakeStyle: ShakeStyle;

  private horizontal: number = 5;
  private vertical: number = 5;
  private rotation: number = 5;
  private duration: number = 300;
  private quantity: any = 'infinite';
  private timingFunc: string = 'ease-in-out';
  private interval: number = 10;
  private max: number = 100;
  private transformOrigin: string = 'center center';
  private fixed: boolean = true;
  private fixedStop: boolean = false;
  private freez: boolean = false;
  private active: boolean = true;
  private trigger: string = ':hover';
  private elem: string = 'div';

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

  @HostListener('mouseenter', ['$event']) onMouseEnter(event: any) {
    this.mouseEnterFunc(event);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.mouseLeaveFunc(event);
  }

  constructor(private myElem: ElementRef, private renderer: Renderer) {
  	// 
  }

  ngOnInit() {
  	Object.assign(this, this.shakeStyle);
	this.initStyle();
  }

  mouseEnterFunc(event: any) {
  	this.renderer.setElementClass(this.myElem.nativeElement, 'shaking', false)
  }

  mouseLeaveFunc(event: any) {
  	this.renderer.setElementClass(this.myElem.nativeElement, 'shaking', true)
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
  	this.renderer.setElementClass(this.myElem.nativeElement, 'shaking', true)

    let styleElement = this.renderer.createElement(this.myElem.nativeElement, 'style')
    this.renderer.setElementAttribute(styleElement, 'type', 'text/css')
    this.renderer.setElementProperty(styleElement, 'innerHTML', this.shakeKeyframes + this.ShakeClass)

    this.renderer.createElement(this.myElem.nativeElement, 'br')

    let newElement = this.renderer.createElement(this.myElem.nativeElement, this.elem)
    // this.renderer.setElementClass(newElement, 'shaking', true)
    this.renderer.createText(newElement, 'let it shake')
  }


}
