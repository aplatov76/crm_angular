import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {reducer} from './store/reducer';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {ReturnSalesComponent} from './components/returnsales/returnSales.component';
import {CreateReturnSaleComponent} from './components/create/create.component';
import {ReturnSalesService} from './store/services/returnSales.service';
import {ReturnSalesEffect} from './store/effects/returnSales.effect';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

const routes = [{
    path: 'return-sales',
    component: ReturnSalesComponent
}]

@NgModule({
    imports: [
        CommonModule, 
        CollapseModule,
        BrowserAnimationsModule,
        //ReactiveFormsModule,
        ModalModule,
        BsDatepickerModule,
        PaginationModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('returnsales', reducer),
        EffectsModule.forFeature([ReturnSalesEffect]),
        NgSelectModule,
        
        //ReactiveFormsModule,
        FormsModule
    ],
    declarations: [ReturnSalesComponent, CreateReturnSaleComponent],
    exports: [ReturnSalesComponent],
    providers: [ReturnSalesService]
})
export class ReturnSalesModule {

}