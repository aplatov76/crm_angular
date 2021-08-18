import {OrderInterface} from '../../interfaces/order.interface';
import {OrderProductInterface} from '../../interfaces/orderProduct.interface'

export interface OrderStateInterface {
    orders: OrderInterface[],
    currentOrder: OrderInterface,
    loading: boolean,
    error: string
}