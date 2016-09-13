import { Component, Input } from '@angular/core';
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
}