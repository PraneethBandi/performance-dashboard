import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import {dataservice} from './services/dataservice';


import { AppComponent } from './app.component';

require('../../node_modules/chart.js/src/Chart');

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    dataservice
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
