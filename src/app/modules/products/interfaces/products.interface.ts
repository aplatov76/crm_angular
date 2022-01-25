import { ProductInterface } from 'src/app/interfaces/product.interface';

export interface ProductsInterface extends ProductInterface {
  children?: ProductsInterface[];
}
