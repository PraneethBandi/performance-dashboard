import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CORE_DIRECTIVES, NgClass} from '@angular/common';

@Component({
    selector: 'grid',
    templateUrl: "./grid.template.html",
    directives: [NgClass, CORE_DIRECTIVES]
})
export class Grid{
    @Input()
    gridSettings: any;
    @Input()
    gridData: Array<any>;

    @Output() runSelected = new EventEmitter();

    runClick(rowdata: any, i: number) {
        console.log(rowdata);
        this.runSelected.emit(rowdata);
    }

}