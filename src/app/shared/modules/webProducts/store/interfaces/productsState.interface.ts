import {ProductsInterface} from '../../interfaces/products.interface';
import { GroupsInterface } from '../../interfaces/groups.interface';
import { AttributesInterface } from 'src/app/shared/interfaces/attributes.interface';

export interface WebProductsStateInterface {
    data: ProductsInterface[],
    attributes: AttributesInterface[] | null,
    currentAttribute: AttributesInterface | null,
    currentProduct: ProductsInterface,
    groups: GroupsInterface[],
    loading: boolean,
    error: boolean
}