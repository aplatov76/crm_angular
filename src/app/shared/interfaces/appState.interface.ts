import {AuthStateInterface} from '../modules/auth/store/interfaces/authState.interface';
import { SalesStateInterface } from '../modules/sales/store/interfaces/salesState.interface';
import {ReturnSalesInterface} from '../modules/returnSales/interfaces/returnSales.interface';
import { PraisStateInterface } from '../utilmodules/prais/store/interfaces/prais.interface';
import { OrderStateInterface } from '../modules/orders/store/interfaces/orderState.interface';
import { ProductsList } from '../interfaces/productsList.interface';
import {ProductsCmStateInterface} from '../modules/productscm/store/interfaces/productsCmState.interface';
import {OrderCmStateInterface} from '../modules/ordercm/store/interfaces/ordercmState.interface';
import {WebProductsStateInterface} from '../modules/webProducts/store/interfaces/productsState.interface';
import {DebtorStateInterface} from '../modules/debtors/store/interfaces/debtorsState.interface';

export interface AppStateInterface{
    auth: AuthStateInterface,
    sales: SalesStateInterface,
    returnsales: ReturnSalesInterface
    prais: PraisStateInterface,
    orders: OrderStateInterface,
    products: ProductsList,
    cmproducts: ProductsCmStateInterface,
    cmorders: OrderCmStateInterface,
    debtors: DebtorStateInterface

    webproducts: WebProductsStateInterface
}