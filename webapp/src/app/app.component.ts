import { Component, OnInit } from '@angular/core';
import '../../public/css/styles.css';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import './app.component.css';
var _ = require('lodash');

import {dataservice} from './services/dataservice';
import {Grid} from './gridComponent/grid.component'
import {MyChart} from './chartComponent/chart.component';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  directives: [NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, Grid, MyChart],
  providers: [dataservice]
})
export class AppComponent implements OnInit { 
  
  constructor(private service: dataservice) { 
  };

  public getRunData(): void{
    this.service.getRuns()
      .then(girdData => this.datasource = Array.from(girdData.json()))
      .catch(function(err){
        console.log("error------" + err);
      });
  }
  
  ngOnInit(): void {
    this.getRunData();
  }

  public girdData: Array<any>;
  public datasource: Array<any>;
  
  runGroups: Array<any> = [];
  showRunDetails: boolean = false;
  chartDatalist: Array<any> = [{
    data: [12, 19, 3, 5, 2, 3]
  },
  {
    data: [10, 12, 12, 6, 7, 15]
  }];

  public girdSettings = {
    rowHeight: '40px',
    gridPanelHeading: 'Service Runs',
    columns: [
      {
        name: 'id',
        title: 'ID',
        width: '50px'
      },
      {
        name: 'name',
        title: 'Run Name',
        width: '50px'
      },
      {
        name: 'starttime',
        title: 'SarttTime',
        width: '50px'
      },
      {
        name: 'elapsed',
        title: 'Elapsed(sec)',
        width: '50px'
      },
      {
        name: 'metadata',
        title: "Description",
        width: '200px'
      }
    ]
  };

  getRunDetails(runData: any) {
    this.service.getRunDetails(runData.id)
      .then(girdData => this.parseRunDetails(Array.from(girdData.json())))
      .catch(function(err){
        console.log("error------" + err);
      });
  }

  addAvgNumbers(items: Array<any>): any {
    let mean = _.meanBy(items, 'elapsedNumber');
    items.push({
      body: 'Mean time',
      elapsed: mean
    });
    return items;
  }

  parseRunDetails(list: Array<any>): void{
    if (!list)
      return;
    
    let groupsList: Array<any> = [];
    let columns: Array<any> = [];
    let _this = this;

    _.forEach(list, function (item: any) {
      let i = _.round((item.elapsed / 1000), 3);
      item.elapsed = i + ' sec';
      item.elapsedNumber = i;
    })
    
    let groups = _.groupBy(list, 'uri');
    _.forEach(groups, function (value: Array<any>, key: string) {

      groupsList.push({
        girdSettings: {
          gridPanelHeading: key.replace(/&/g, " ")
        },
        datasource: _this.addAvgNumbers(value)
      });
    });

      if (groupsList.length > 0) {
        let data = groupsList[0].datasource[0]
        _.forEach(data, function (value: string, key: string) {
          if (key !== '_id' && key !== 'id' && key !== 'request' && key !== 'uri' && key !== 'exception') {
            columns.push({
              name: key,
              title: key
            });
          }
        });

        _.forEach(groupsList, function (item:any) {
          item.girdSettings.columns = columns;
        });

        this.showRunDetails = true;
        this.runGroups = groupsList;
      }

   

    console.log(groupsList);
  }


  // lineChart
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series asdfasdasdfasdfasdfasdfasda asdfasdf sadfasdf asdfasd asdfasd A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColours:Array<any> = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: '#61dc88',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: '#41a3ca',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: '#ef6363',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  
}
