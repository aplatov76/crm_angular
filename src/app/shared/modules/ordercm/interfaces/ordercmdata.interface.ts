import { OrderCmInterface } from "./ordercm.interface";

export interface OrderCmDataInterface{
    id: number,
    articul: number,
    title: string,
    quantity: number,
    unit: any,
    description?: string,
    cmorderid: OrderCmInterface
}