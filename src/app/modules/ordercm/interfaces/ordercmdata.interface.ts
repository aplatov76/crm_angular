import { ProductInterface } from 'src/app/interfaces/product.interface';

export interface OrderCmDataInterface {
  id: number;
  articul: number;
  title: string;
  quantity: number;
  unit: any;
  description?: string;
  product?: ProductInterface;
}
