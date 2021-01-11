import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {WebOrdersComponent} from './components/webOrders.component';

const routes = [{
    path: 'web-orders',
    component: WebOrdersComponent
}]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [WebOrdersComponent],
    exports: [WebOrdersComponent]
})
export class WebOrdersModule {

}