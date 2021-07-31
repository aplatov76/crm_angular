import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducer} from './store/reducer';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import {ReturnSalesComponent} from './components/returnsales/returnSales.component';
import {CreateReturnSaleComponent} from './components/create/create.component';
import {ReturnSalesService} from './store/services/returnSales.service';
import {ReturnSalesEffect} from './store/effects/returnSales.effect';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


const routes = [{
    path: 'return-sales',
    component: ReturnSalesComponent
}]

@NgModule({
    imports: [
        CommonModule, 
        BrowserAnimationsModule,
        //ReactiveFormsModule,
        NzPaginationModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('returnsales', reducer),
        EffectsModule.forFeature([ReturnSalesEffect]),
        NgSelectModule,
        NzDatePickerModule,
        //ReactiveFormsModule,
        FormsModule
    ],
    declarations: [ReturnSalesComponent, CreateReturnSaleComponent],
    exports: [ReturnSalesComponent],
    providers: [ReturnSalesService]
})
export class ReturnSalesModule {

}