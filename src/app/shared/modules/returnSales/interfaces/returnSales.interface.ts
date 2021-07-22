import { SalesInterface } from "../../sales/interfaces/sales.interface"

export interface ReturnSalesInterface{
    id: number,
    sale: SalesInterface,
    quantity: number,
    data: Date
}