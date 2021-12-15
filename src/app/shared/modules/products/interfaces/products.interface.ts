import { ProductInterface } from 'src/app/shared/interfaces/product.interface';

export interface ProductsInterface extends ProductInterface {
  children?: ProductsInterface[];
}
