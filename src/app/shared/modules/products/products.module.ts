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
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

//import {OrderItemComponent} from './components/order/order.component'
import {ProductsComponent} from './components/products/products.component';
import {ProductComponent} from './components/product/product.component';
import {FilterComponent} from './components/del/del.component';
import {GroupComponent} from './components/groups/group.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { ModalModule } from 'ngx-bootstrap/modal';
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
        FormsModule,
        RouterModule.forChild(routes),
        TreeModule,
        ModalModule,
        NzTreeSelectModule,
        //AngularTreeTableModule
        StoreModule.forFeature('products', reducer),
        EffectsModule.forFeature([ProductsEffect]),
        ReactiveFormsModule,
        
        NgSelectModule
    ],
    declarations: [ProductsComponent, ProductComponent, GroupComponent, FilterComponent],
    providers: [ProductsService]
})
export class ProductsModule {

}