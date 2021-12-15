import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { reducer } from './store/reducer';

import { ReturnSalesComponent } from './components/returnsales/returnSales.component';
import { CreateReturnSaleComponent } from './components/create/create.component';
import { ReturnSalesService } from './store/services/returnSales.service';
import { ReturnSalesEffect } from './store/effects/returnSales.effect';

const routes = [
  {
    path: 'return-sales',
    component: ReturnSalesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NzPaginationModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('returnsales', reducer),
    EffectsModule.forFeature([ReturnSalesEffect]),
    NgSelectModule,
    NzDatePickerModule,
    FormsModule
  ],
  declarations: [ReturnSalesComponent, CreateReturnSaleComponent],
  exports: [ReturnSalesComponent],
  providers: [ReturnSalesService]
})
export class ReturnSalesModule {}
