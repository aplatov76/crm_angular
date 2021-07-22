import {Component, Input} from '@angular/core';


@Component({
    selector: 'left-nav',
    templateUrl: './leftNav.component.html',
    styleUrls: ['./leftNav.component.scss']
})
export class LeftNav {
    @Input() view: boolean;
}