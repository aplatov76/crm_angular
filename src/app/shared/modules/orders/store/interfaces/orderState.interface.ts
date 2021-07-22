import {OrderInterface} from '../../interfaces/order.interface';
import {OrderProductsListInterface} from '../../interfaces/orderProducts.interface'

export interface OrderStateInterface {
    orders: OrderInterface[],
    currentOrder: OrderProductsListInterface,
    loading: boolean,
    error: string
}