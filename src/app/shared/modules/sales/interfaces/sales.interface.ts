import { ProductInterface } from "../../../interfaces/product.interface";
import {CheckInterface} from "../../../interfaces/check.interface";

export interface SalesInterface{
    id: number,
    price: number,
    quantity: number,
    sum: number
    product: ProductInterface
    check: CheckInterface
}