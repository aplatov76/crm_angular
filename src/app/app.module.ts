import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment'; // Angular CLI environment

import { AppComponent } from './app.component';
import { LeftNav } from './shared/components/LeftNav/leftNav.component';
import {AppIndicatorComponent} from './shared/components/app-indicator/app-indicator.component'


import { SalesModule } from './shared/modules/sales/sales.module';
import { OrdersModule } from './shared/modules/orders/orders.module';
import {WebOrdersModule} from './shared/modules/webOrders/webOrders.module';
import { InvoiceModule } from './shared/modules/invoice/invoice.module';
import { HistorySalesModule } from './shared/modules/historySales/historySales.module';
import { ReturnSalesModule } from './shared/modules/returnSales/returnSales.module';
import { OrderCmModule } from './shared/modules/ordercm/ordercm.module';
import { DebtorsModule } from './shared/modules/debtors/debtors.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import {AuthInterceptor} from './shared/services/auth.interceptor';
import { ProductsModule } from './shared/modules/products/products.module';
import {ProductsCmModule} from './shared/modules/productscm/productscm.module';
import {ClientsModule} from './shared/modules/clients/clients.module';
import {DeliveryModule} from './shared/modules/delivery/delivery.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule } from '@angular/forms';

registerLocaleData(ru);
//import {WebProductsModule} from './shared/modules/webProducts/webProducts.module';

@NgModule({
  declarations: [
    AppComponent,
    LeftNav,
    AppIndicatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
      router: routerReducer,
      
    }, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
    }),
    ToastrModule.forRoot(),

    SalesModule,
    OrdersModule,
    //WebOrdersModule,
    InvoiceModule,
    HistorySalesModule,
    ReturnSalesModule,
    OrderCmModule,
    DebtorsModule,
    AuthModule,
    SalesModule,
    ProductsModule,
    ProductsCmModule,
    ClientsModule,
    DeliveryModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    StoreModule.forRoot({}, {})
    //WebProductsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: NZ_I18N, useValue: ru_RU }
  ],
  bootstrap: [AppComponent],
  //exports: [CollapseModule]
})
export class AppModule { }
