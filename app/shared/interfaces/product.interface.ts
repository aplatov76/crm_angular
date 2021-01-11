import { PraisInterface } from "./prais.interface";

export interface ProductInterface extends PraisInterface{
    stock: number,
    trade_price?: number,
    visible?: boolean,
    info?: string
}
