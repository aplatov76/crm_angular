import { PraisInterface } from '../../../../interfaces/prais.interface';
import { ProductInterface } from '../../../../interfaces/product.interface';

export interface PraisStateInterface {
  prais: PraisInterface[] | null;
  isLoading: boolean;
  currentProduct: ProductInterface | null;
  // currentProductList:
}
