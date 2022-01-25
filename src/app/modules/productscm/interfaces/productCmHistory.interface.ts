import { ProductCmHistoryPrice } from './productcmHistoryPrice.interface';

export interface ProductCmHistory {
  id: number;
  articul: number;
  price: ProductCmHistoryPrice[];
}
