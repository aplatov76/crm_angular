import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
//import {OrdersComponent} from './components/orders/orders.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducer';
import {ProductsEffect} from './store/effects/effect.products';
import {ProductsService} from './store/services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

//import {OrderItemComponent} from './components/order/order.component'
import {ProductsComponent} from './components/products/products.component';
import {ProductComponent} from './components/product/product.component';
import {GroupComponent} from './components/groups/group.component';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

const routes = [
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'products/:id',
        component: ProductComponent
    },
    {
        path: 'group/:id',
        component: GroupComponent
    }
]

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        //nz modules
        NzTreeModule,
        NzTreeSelectModule,
        NzModalModule,
        NzIconModule,
        NgSelectModule,
        //ngrx modules
        StoreModule.forFeature('products', reducer),
        EffectsModule.forFeature([ProductsEffect])
        
    ],
    declarations: [ProductsComponent, ProductComponent, GroupComponent],
    providers: [ProductsService, { provide: NZ_I18N, useValue: en_US }]
})
export class ProductsModule {

}