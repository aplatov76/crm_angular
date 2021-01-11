import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {reducer} from './store/reducers';
import { StoreModule } from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SalesComponent} from './components/sales.component';
import {SalesEffect} from './store/effects/sales.effect';
import { SalesService } from './store/services/sales.service';
import { PraisModule } from '../../utilmodules/prais/prais.module';

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
        ReactiveFormsModule,
        FormsModule,
        PraisModule
    ],
    declarations: [SalesComponent],
    exports: [SalesComponent],
    providers: [SalesService]
})
export class SalesModule {

}