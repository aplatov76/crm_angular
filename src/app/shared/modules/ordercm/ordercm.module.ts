import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {OrderCmComponent} from './components/ordercm.component';
import {OrderCmService} from './store/services/ordercm.service';

const routes = [{
    path: 'ordercm',
    component: OrderCmComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [OrderCmComponent],
    providers: [OrderCmService],
    exports: []
})
export class OrderCmModule {

}