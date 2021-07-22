import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
//import {OrdersComponent} from './components/orders/orders.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducer';
import {ProductsEffect} from './store/effects/effect.products';
import {AttributesEffect} from './store/effects/effect.attributes';
import {WebProductsService} from './store/services/products.service';
import {WebAttributesService} from './store/services/attributes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

//import {OrderItemComponent} from './components/order/order.component'
import {WebProductsComponent} from './components/webproducts/products.component';
import {WebProductComponent} from './components/webproduct/product.component';
import {WebFilterComponent} from './components/webdel/del.component';
import {WebGroupComponent} from './components/webgroups/group.component';
import {WebAttributesList} from './components/webAttributesList/webAttributesList.component';
import {WebAttribute} from './components/webAttribute/webAttribute.component';

import { TreeModule } from '@circlon/angular-tree-component';
//import { AngularTreeTableModule } from 'angular-tree-table';

const routes = [
    {
        path: 'webproducts',
        component: WebProductsComponent
    },
    {
        path: 'webproducts/:id',
        component: WebProductComponent
    },
    {
        path: 'webgroup/:id',
        component: WebGroupComponent
    },
    {
        path: 'webdel',
        component: WebFilterComponent
    },
    {
        path: 'web-attributes',
        component: WebAttributesList
    },
    {
        path: 'web-attributes/:id',
        component: WebAttribute
    }
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        TreeModule,
        //AngularTreeTableModule
        StoreModule.forFeature('webproducts', reducer),
        EffectsModule.forFeature([ProductsEffect, AttributesEffect]),
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule
    ],
    declarations: [WebProductsComponent, WebProductComponent, WebGroupComponent, WebFilterComponent, WebAttributesList, WebAttribute],
    providers: [WebProductsService, WebAttributesService]
})
export class WebProductsModule {

}