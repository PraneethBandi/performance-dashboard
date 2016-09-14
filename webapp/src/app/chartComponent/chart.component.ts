import { Component, Input, Output, EventEmitter,
    AfterViewInit, Renderer, ViewChild, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import {CORE_DIRECTIVES, NgClass} from '@angular/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
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
            datasets: this.chartDatasources,
            borderWidth: 1,
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
        }
        settings.options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        this.chartObj = new window.Chart(this.canvasCtx, settings);
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
}

interface chartDataSource{
    datasets: Array<number>;
}

