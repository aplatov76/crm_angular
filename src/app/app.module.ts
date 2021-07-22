import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftNav } from './shared/components/LeftNav/leftNav.component';
import { SalesModule } from './shared/modules/sales/sales.module';
import { OrdersModule } from './shared/modules/orders/orders.module';
import {WebOrdersModule} from './shared/modules/webOrders/webOrders.module'
import { InvoiceModule } from './shared/modules/invoice/invoice.module';
import { HistorySalesModule } from './shared/modules/historySales/historySales.module';
import { ReturnSalesModule } from './shared/modules/returnSales/returnSales.module';
import { RequestManagerModule } from './shared/modules/requestManager/requestManager.module';
import { DebtorsModule } from './shared/modules/debtors/debtors.module';
import { AuthModule } from './shared/modules/auth/auth.module';
import {AuthInterceptor} from './shared/services/auth.interceptor';
import { ProductsModule } from './shared/modules/products/products.module';
import {WebProductsModule} from './shared/modules/webProducts/webProducts.module';


@NgModule({
  declarations: [
    AppComponent,
    LeftNav
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production, 
    }),
    ToastrModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SalesModule,
    OrdersModule,
    WebOrdersModule,
    InvoiceModule,
    HistorySalesModule,
    ReturnSalesModule,
    RequestManagerModule,
    DebtorsModule,
    AuthModule,
    SalesModule,
    ProductsModule,
    WebProductsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  //exports: [CollapseModule]
})
export class AppModule { }
