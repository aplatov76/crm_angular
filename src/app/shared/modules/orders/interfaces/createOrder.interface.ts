import {ClientInterface} from '../../../interfaces/client.interface';
import {OrderProductInterface} from './orderProduct.interface';

export interface CreateOrderInterface{

    client?: ClientInterface,
    orderData: OrderProductInterface[]
}