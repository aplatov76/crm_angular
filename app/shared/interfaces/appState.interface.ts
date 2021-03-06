import {AuthStateInterface} from '../modules/auth/store/interfaces/authState.interface';
import { SalesStateInterface } from '../modules/sales/store/interfaces/salesState.interface';
import { PraisStateInterface } from '../utilmodules/prais/store/interfaces/prais.interface';
import { OrderStateInterface } from '../modules/orders/store/interfaces/orderState.interface';
import { ProductsList } from '../interfaces/productsList.interface';

export interface AppStateInterface{
    auth: AuthStateInterface,
    sales: SalesStateInterface,
    prais: PraisStateInterface,
    orders: OrderStateInterface,
    products: ProductsList
}