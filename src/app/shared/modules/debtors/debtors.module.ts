import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DebtorsComponent} from './components/debtors/debtors.component';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {reducer} from './store/reducer';
import {DebtorEffect} from './store/effects/debtor.effect'
import { DebtorsService } from './store/services/debtors.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { DebtorComponent } from './components/debtor/debtor.component';
import {UpdateComponent} from './components/update/update.component';
import {CreateDebtorComponent} from './components/create/create.component';

const routes = [
    {
        path: 'debtors',
        component: DebtorsComponent,
    },
    {
        path: 'debtors/:id',
        component: DebtorComponent,
    }
]
//
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('debtors', reducer),
        EffectsModule.forFeature([DebtorEffect]),
        NzModalModule,
        NgSelectModule
    ],
    declarations: [DebtorsComponent, DebtorComponent, UpdateComponent, CreateDebtorComponent],
    providers: [DebtorsService],
    exports: []
})
export class DebtorsModule {

}