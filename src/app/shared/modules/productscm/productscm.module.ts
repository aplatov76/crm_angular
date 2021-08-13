import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
//import {OrdersComponent} from './components/orders/orders.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {reducer} from './store/reducer';
import {ProductsCmEffects} from './store/effects/effects.productscm';
import {ProductsCmService} from './store/services/productscm.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

//import {OrderItemComponent} from './components/order/order.component'
import {ProductsCmComponent} from './components/products/products.component';
import {CurrentCmProductComponent} from './components/current/current.component';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const routes = [
    {
        path: 'productscm',
        component: ProductsCmComponent
    },

]

const antDesignIcons = AllIcons as {
    [key: string]: IconDefinition;
  };
  const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
  

@NgModule({
    imports: [
        CommonModule, 
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        //nz modules
        NzTreeModule,
        //NzTreeSelectModule,
        NzModalModule,
        NzIconModule,
        NgSelectModule,
        NzUploadModule,
        NzCollapseModule,
        //ngrx modules
        StoreModule.forFeature('cmproducts', reducer),
        EffectsModule.forFeature([ProductsCmEffects])
        
    ],
    declarations: [ProductsCmComponent, CurrentCmProductComponent],
    providers: [ProductsCmService, { provide: NZ_I18N, useValue: en_US },  { provide: NZ_ICONS, useValue: icons } ]
})
export class ProductsCmModule {

}