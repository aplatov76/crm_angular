import { OrderCmInterface } from "./ordercm.interface";

export interface OrderCmDataInterface{
    id: number,
    articul: number,
    title: string,
    quantity: number,
    trade_price: number,
    unit: any,
    cmorderid: OrderCmInterface
}