import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducer';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import {OrderCmComponent} from './components/orders/ordercm.component';
import {OrderCmService} from './store/services/ordercm.service';
import {CurrentCmOrderComponent} from './components/current/current.component';

import {CmOrderEffect} from './store/effects/effect.ordercm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [{
    path: 'ordercm',
    component: OrderCmComponent
}]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('cmorders', reducer),
        EffectsModule.forFeature([CmOrderEffect]),
        NzModalModule,
        NgSelectModule,
        NzDatePickerModule,
        NzPaginationModule
    ],
    declarations: [OrderCmComponent, CurrentCmOrderComponent],
    providers: [OrderCmService],
    exports: []
})

export class OrderCmModule {

}