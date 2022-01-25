import { ProductCmInterface } from './productcm.interface';

export interface ProductsCmInterface extends ProductCmInterface {
  key?: number;
  children: ProductsCmInterface[] | null;
}
