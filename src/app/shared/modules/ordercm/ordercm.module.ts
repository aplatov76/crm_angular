import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducer';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import {OrderCmComponent} from './components/orders/ordercm.component';
import {OrderCmService} from './store/services/ordercm.service';
import {CurrentCmOrderComponent} from './components/current/current.component';

import {CmOrderEffect} from './store/effects/effect.ordercm';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [{
    path: 'ordercm',
    component: OrderCmComponent
}]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('cmorders', reducer),
        EffectsModule.forFeature([CmOrderEffect]),
        NzModalModule

    ],
    declarations: [OrderCmComponent, CurrentCmOrderComponent],
    providers: [OrderCmService],
    exports: []
})

export class OrderCmModule {

}