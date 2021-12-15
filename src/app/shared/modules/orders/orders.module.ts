import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrdersComponent } from './components/orders/orders.component';
import { reducer } from './store/reducer';
import { OrderEffect } from './store/effects/order.effect';
import { OrdersService } from './store/services/orders.service';

import { OrderItemComponent } from './components/order/order.component';
import { CreateOrderComponent } from './components/create/create.component';

const routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/:id',
    component: OrderItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('orders', reducer),
    EffectsModule.forFeature([OrderEffect]),
    NzModalModule,
    NgSelectModule
  ],
  declarations: [
    OrdersComponent,
    OrderItemComponent,
    CreateOrderComponent
  ],
  exports: [OrdersComponent],
  providers: [OrdersService]
})
export class OrdersModule {}
