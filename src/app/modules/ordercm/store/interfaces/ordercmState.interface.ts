import { ErrorMessageInterface } from '../../../../interfaces/errMessages.interface';
import { OrderCmInterface } from '../../interfaces/ordercm.interface';

export interface OrderCmStateInterface {
  orders: OrderCmInterface[];
  currentOrder: OrderCmInterface;
  loading: boolean;
  err: ErrorMessageInterface;
  sendComplited: any;
  sendError: ErrorMessageInterface;
}
