import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from "@angular/common";

import {reducer} from './store/reducers';
import { StoreModule } from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SalesComponent} from './components/sales/sales.component';
import {CurrentSaleComponent} from './components/current/current.component';
import {ReportComponent} from './components/report/report.component';
import {CassaModalComponent} from './components/cassamodal/cassamodal.component';

import {SalesEffect} from './store/effects/sales.effect';
import { SalesService } from './store/services/sales.service';
import { PraisModule } from '../../utilmodules/prais/prais.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

const routes = [{
    path: 'sales',
    component: SalesComponent
}]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('sales', reducer),
        EffectsModule.forFeature([SalesEffect]),
        NgSelectModule,
        NzModalModule,
        NzAutocompleteModule,
        ReactiveFormsModule,
        FormsModule,
        PraisModule
    ],
    declarations: [SalesComponent, CurrentSaleComponent, ReportComponent, CassaModalComponent],
    exports: [SalesComponent],
    providers: [SalesService, DatePipe]
})
export class SalesModule {

}