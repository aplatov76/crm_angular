import {ReturnSalesInterface} from '../../interfaces/returnSales.interface';

export interface ReturnSalesStateInterface{
    err: string | null,
    loading: boolean,
    returnSales: ReturnSalesInterface[],
    createdReturnSale: ReturnSalesInterface
}
