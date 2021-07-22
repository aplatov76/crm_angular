import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OrdersComponent} from './components/orders/orders.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducer';
import {OrderEffect} from './store/effects/order.effect'
import {OrdersService} from './store/services/orders.service'

import {OrderItemComponent} from './components/order/order.component'
const routes = [
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'orders/:id',
        component: OrderItemComponent 
    }
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('orders', reducer),
        EffectsModule.forFeature([OrderEffect]),
    ],
    declarations: [OrdersComponent, OrderItemComponent],
    exports: [OrdersComponent],
    providers: [OrdersService]
})
export class OrdersModule {

}