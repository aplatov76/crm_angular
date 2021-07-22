import { PraisInterface } from "./prais.interface";
import {AttributesInterface} from './attributes.interface';

export interface ProductInterface{
    id: number,
    articul: string,
    title: string,
    visible?: boolean,
    stock: number,
    description?: string,
    createAt?: Date,
    updateAt?: Date,
    price: number,
    trade_price?: number,
    parentId: number,

    /**К удалению */
    info?: string,
    attribute_id: number | null
    color?: number,
    img_url? : string
}
