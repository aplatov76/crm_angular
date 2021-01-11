import {SalesInterface} from '../../../../interfaces/sales.interface';

export interface SalesStateInterface {
    err?: any,
    res?: any,
    data: SalesInterface[] | null,
    isLoading: boolean,
    isSubmiting: boolean
}