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
import {FilterComponent} from './components/del/del.component';
import {GroupComponent} from './components/groups/group.component';
import { TreeModule } from '@circlon/angular-tree-component';
//import { AngularTreeTableModule } from 'angular-tree-table';

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
    },
    {
        path: 'del',
        component: FilterComponent
    }
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        TreeModule,
        //AngularTreeTableModule
        StoreModule.forFeature('products', reducer),
        EffectsModule.forFeature([ProductsEffect]),
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule
    ],
    declarations: [ProductsComponent, ProductComponent, GroupComponent, FilterComponent],
    providers: [ProductsService]
})
export class ProductsModule {

}