import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/reducers';

import { PraisEffect } from './store/effects/prais.effect';
import { PraisService } from './store/services/prais.service';
import { ProductEffect } from './store/effects/product.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('prais', reducer),
    EffectsModule.forFeature([PraisEffect, ProductEffect]),
    NgSelectModule,
    FormsModule
  ],
  declarations: [],
  exports: [],
  providers: [PraisService]
})
export class PraisModule {}
