import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './store/reducer';
import {DeliveryEffect} from './store/effects/delivery.effect'

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeliveryService } from './store/services/delivery.service';
import { DeliverysComponent } from './components/deliverys/deliverys.component';
import { CreateDeliveryComponent } from './components/create/create.delivery';
import {DeliveryComponent} from './components/delivery/delivery.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

const routes = [
    {
        path: 'delivery',
        component: DeliverysComponent
    },
    {
        path: 'delivery/:id',
        component: DeliveryComponent
    }

]
//
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('delivery', reducer),
        EffectsModule.forFeature([DeliveryEffect]),
        NzModalModule,
        NgSelectModule,
        NzTreeSelectModule
    ],
    declarations: [DeliverysComponent, CreateDeliveryComponent, DeliveryComponent],
    providers: [DeliveryService],
    exports: []
})

export class DeliveryModule {

}