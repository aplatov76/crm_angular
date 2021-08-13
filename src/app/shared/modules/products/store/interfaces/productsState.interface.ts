import {ProductsInterface} from '../../interfaces/products.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';

export interface ProductsStateInterface {
    data: ProductsInterface[],
    currentProduct: ProductsInterface,
    warning: ProductsInterface[],
    groups: GroupsInterface[],
    loading: boolean,
    error: boolean
}