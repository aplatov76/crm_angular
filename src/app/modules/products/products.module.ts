import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsService } from './store/services/products.service';
import { ProductsEffect } from './store/effects/effect.products';
import { reducer } from './store/reducer';

const routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'products/:id',
    component: ProductComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    // nz modules
    NzTreeModule,
    NzTreeSelectModule,
    NzModalModule,
    NzIconModule,
    NgSelectModule,
    // ngrx modules
    StoreModule.forFeature('products', reducer),
    EffectsModule.forFeature([ProductsEffect])
  ],
  declarations: [ProductsComponent, ProductComponent],
  providers: [ProductsService, { provide: NZ_I18N, useValue: en_US }]
})
export class ProductsModule {}
