import { Component, Input, Output, EventEmitter,
    AfterViewInit, Renderer, ViewChild, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import {CORE_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
var _ = require('lodash');
// var Chart = require('../../../node_modules/chart.js/src/chart');

@Component({
    selector: 'chart',
    templateUrl: "./chart.template.html",
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES]
})
export class MyChart implements AfterViewInit, OnChanges, OnDestroy{
    @Input()
    chartDatasources: any;

    @ViewChild('canvas') canvas: ElementRef;

    canvasCtx: any;
    chartObj: any;
    initFlag = false;

    constructor(private renderer: Renderer) {
    }

    buildChart() {

        let settings: any = {};
        settings.type = 'line';
        settings.data = {
            datasets: this.getDataSets(),
            borderWidth: 1,
            fill: false,
            labels: this.getLables()
        }
        settings.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    display: true,
                }],
            }
        }
        this.chartObj = new window.Chart(this.canvasCtx, settings);
    }

    getDataSets() {
        let datasets: Array<any> = [];
        if (this.chartDatasources && this.chartDatasources.length > 0) {
            let counter = this.chartDatasources.length < 6 ? this.chartDatasources.length : 6;
            for (let i: number = 0; i < counter; i++){
                this.lineChartColours[i].data = this.chartDatasources[i].data;
                datasets.push(this.lineChartColours[i]);
            }
        }
        return datasets;
    }

    getLables(): Array<number> {
        let lables: Array<number> = [];
        if (this.chartDatasources && this.chartDatasources.length > 0) {
            let max = _.maxBy(this.chartDatasources, function (i: any) { return i.data.length; });
            for (let i:number = 1; i <= max.data.length; i++){
                lables.push(i);
            }
        }
        return lables;
    }

    refreshChart() {
        this.ngOnDestroy();
        if (this.chartDatasources && this.chartDatasources.length > 0) {
            this.buildChart();
        }
    }

    ngOnDestroy() {
        if (this.chartObj) {
            this.chartObj.destroy();
            this.chartObj = null;
        }
    }

    ngOnChanges() {
        if (this.initFlag) {
            this.refreshChart();
        }
    }

    ngAfterViewInit() {
        this.canvasCtx = this.canvas.nativeElement.getContext("2d");
            //this.renderer.invokeElementMethod(this.canvas.nativeElement, 'getContext', ["2d"]);
        this.initFlag = true;
        if (this.chartDatasources && this.chartDatasources.length > 0) {
            this.refreshChart()
        }
    }

    lineChartColours: Array<any> = [
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: '#C91F37',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
        },
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: '#5B3256',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)',
            fill: false
        },
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: '#19B5FE',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
        },
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: '#7A942E',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
        },
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: '#36D7B7',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
        },
        {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: '#FFA631',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false
        }
    ];
}

interface chartDataSource{
    datasets: Array<number>;
}

