import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ShakeComponent } from './shake/shake.component';
import { ShakeDirective } from './directive/shake.directive';

@NgModule({
  declarations: [
    AppComponent,
    ShakeComponent,
    ShakeDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
